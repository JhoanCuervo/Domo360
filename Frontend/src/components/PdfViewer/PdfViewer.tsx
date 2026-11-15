import { useCallback, useEffect, useRef, useState } from "react";
import {
  LuDownload,
  LuExternalLink,
  LuMaximize2,
  LuMinimize2,
  LuRotateCw,
  LuZoomIn,
  LuZoomOut,
} from "react-icons/lu";
import * as pdfjsLib from "pdfjs-dist";
import * as pdfjsWorker from "pdfjs-dist/build/pdf.worker.mjs";

import api from "../../service/api";

import "./PdfViewer.css";

/**
 * Fake worker en el hilo principal: la CSP de Apps Script
 * (`script-src 'self' ...`) bloquea scripts externos y workers por blob,
 * así que pdf.js no puede cargar el worker desde un CDN. Al exponer el
 * módulo del worker en `globalThis.pdfjsWorker`, pdf.js detecta el
 * `WorkerMessageHandler` y ejecuta el renderizado en el hilo principal
 * sin crear ningún Worker. (El propio módulo también se auto-registra;
 * la asignación explícita documenta la intención y cubre el caso en que
 * el bundler reordene los efectos secundarios.)
 */
(globalThis as { pdfjsWorker?: unknown }).pdfjsWorker = pdfjsWorker;

const MIN_SCALE = 0.5;
const MAX_SCALE = 4;
/** Factor aplicado por los botones de acercar/alejar. */
const ZOOM_STEP = 1.2;
/** Espacio libre a los lados del lienzo al ajustar la página al ancho. */
const CANVAS_GUTTER = 96;

/** URLs de descarga públicas del archivo en Drive, de directa a rebote. */
const getDriveUrls = (fileId: string): string[] => [
  `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`,
  `https://drive.google.com/uc?export=download&id=${fileId}`,
];

type Status = "loading" | "ready" | "error";

type PdfViewerProps = {
  /** ID del archivo en Google Drive. */
  fileId: string;
  /** Nombre sugerido al descargar el documento. */
  fileName?: string;
};

/** Convierte el base64 del backend a bytes listos para pdf.js. */
const decodeBase64 = (base64: string): Uint8Array => {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index++) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
};

/**
 * Visor de PDFs alojados en Google Drive, renderizado con pdf.js.
 *
 * Obtiene los bytes primero por el backend de Apps Script (acción
 * `fileBase64`, funciona con archivos no públicos) y, si no está
 * disponible, descarga directa desde las URLs públicas de Drive.
 *
 * Todas las páginas se muestran apiladas en un listado vertical.
 *
 * Botones flotantes:
 *  - Arriba: indicador de la página visible ("2 página de 5") y zoom (+/-).
 *  - Derecha: pantalla completa y descarga.
 */
const PdfViewer = ({ fileId, fileName }: PdfViewerProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pagesRef = useRef<HTMLDivElement>(null);
  const documentRef = useRef<pdfjsLib.PDFDocumentProxy | null>(null);
  const dataRef = useRef<Uint8Array | null>(null);
  const renderTasksRef = useRef<pdfjsLib.RenderTask[]>([]);
  const fitOnceRef = useRef(false);

  const [status, setStatus] = useState<Status>("loading");
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  /** Descarga el archivo de Drive y carga el documento con pdf.js. */
  useEffect(() => {
    let active = true;

    const load = async () => {
      setStatus("loading");
      setNumPages(0);
      setCurrentPage(1);
      fitOnceRef.current = false;

      void documentRef.current?.cleanup();
      documentRef.current = null;
      dataRef.current = null;

      // 1) Vía backend de Apps Script: funciona aunque el archivo no esté
      //    compartido como público, porque el script lee Drive con sus
      //    propias credenciales.
      let bytes: Uint8Array | null = null;
      try {
        const base64 = await api<string>("fileBase64", { id: fileId });
        if (base64) bytes = decodeBase64(base64);
      } catch {
        // Sin backend disponible (p. ej. en desarrollo): se usa Drive directo.
      }

      // 2) Respaldo: descarga pública directa desde Drive. Solo funciona si
      //    el archivo está compartido como "cualquier persona con el enlace".
      if (!bytes) {
        for (const url of getDriveUrls(fileId)) {
          try {
            const response = await fetch(url);
            if (!response.ok) continue;

            const candidate = new Uint8Array(await response.arrayBuffer());
            const isPdf =
              candidate.length >= 5 &&
              String.fromCharCode(...candidate.subarray(0, 5)) === "%PDF-";
            if (isPdf) {
              bytes = candidate;
              break;
            }
          } catch {
            // La URL falló: se intenta con la siguiente.
          }
        }
      }

      if (!active) return;

      if (!bytes) {
        setStatus("error");
        return;
      }

      try {
        // pdf.js transfiere el buffer al worker, así que se le pasa una copia
        // y la original se conserva para el botón de descarga.
        dataRef.current = bytes;
        const task = pdfjsLib.getDocument({ data: bytes.slice() });
        const document = await task.promise;
        if (!active) {
          void document.cleanup();
          return;
        }

        documentRef.current = document;
        setNumPages(document.numPages);
        setStatus("ready");
      } catch (error) {
        console.error("Error al abrir el PDF:", error);
        if (active) setStatus("error");
      }
    };

    load();

    return () => {
      active = false;
      void documentRef.current?.cleanup();
      documentRef.current = null;
    };
  }, [fileId, reloadKey]);

  /** Ajusta la página al ancho del visor la primera vez que carga. */
  useEffect(() => {
    if (status !== "ready" || fitOnceRef.current) return;
    fitOnceRef.current = true;

    let active = true;

    (async () => {
      const document = documentRef.current;
      const root = rootRef.current;
      if (!document || !root) return;

      const page = await document.getPage(1);
      if (!active) return;

      const base = page.getViewport({ scale: 1 });
      const width = root.clientWidth - CANVAS_GUTTER;
      const next = Math.min(
        MAX_SCALE,
        Math.max(MIN_SCALE, width / base.width),
      );
      setScale(Math.round(next * 100) / 100);
    })();

    return () => {
      active = false;
    };
  }, [status]);

  /**
   * Página visible según el scroll: la última cuyo borde superior quedó
   * por encima de la mitad del visor.
   */
  const updateCurrentPage = useCallback(() => {
    const scroll = scrollRef.current;
    const pages = pagesRef.current;
    if (!scroll || !pages) return;

    const containerTop = scroll.getBoundingClientRect().top;
    const middle = containerTop + scroll.clientHeight / 2;
    let current = 1;

    for (const element of Array.from(pages.children) as HTMLElement[]) {
      if (element.getBoundingClientRect().top <= middle) {
        current = Number(element.dataset.page ?? current);
      }
    }

    setCurrentPage(current);
  }, []);

  /** Renderiza todas las páginas apiladas con el zoom elegido. */
  useEffect(() => {
    if (status !== "ready") return;
    let active = true;

    (async () => {
      const document = documentRef.current;
      const pages = pagesRef.current;
      if (!document || !pages) return;

      renderTasksRef.current.forEach((task) => task.cancel());
      renderTasksRef.current = [];

      const canvases = Array.from(
        pages.querySelectorAll<HTMLCanvasElement>("canvas[data-page]"),
      );
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      for (const canvas of canvases) {
        if (!active) return;

        const page = await document.getPage(Number(canvas.dataset.page));
        if (!active) return;

        const viewport = page.getViewport({ scale });
        canvas.width = Math.floor(viewport.width * pixelRatio);
        canvas.height = Math.floor(viewport.height * pixelRatio);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        const task = page.render({
          canvas,
          viewport,
          transform:
            pixelRatio !== 1
              ? [pixelRatio, 0, 0, pixelRatio, 0, 0]
              : undefined,
        });
        renderTasksRef.current.push(task);

        try {
          await task.promise;
        } catch {
          // Ignorado: ocurre al cancelar la tarea al cambiar el zoom.
        }
      }

      updateCurrentPage();
    })();

    return () => {
      active = false;
      renderTasksRef.current.forEach((task) => task.cancel());
      renderTasksRef.current = [];
    };
  }, [status, numPages, scale, updateCurrentPage]);

  /** Sincroniza el icono de pantalla completa con el estado real del navegador. */
  useEffect(() => {
    const onChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
      // El alto del visor cambia: recalcular la página visible.
      requestAnimationFrame(() => updateCurrentPage());
    };
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, [updateCurrentPage]);

  const zoomBy = (factor: number) =>
    setScale((current) => {
      const next = Math.round(current * factor * 100) / 100;
      return Math.min(MAX_SCALE, Math.max(MIN_SCALE, next));
    });

  const toggleFullscreen = () => {
    const root = rootRef.current;
    if (!root) return;

    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void root.requestFullscreen();
    }
  };

  const download = () => {
    const data = dataRef.current;
    if (!data) return;

    const url = URL.createObjectURL(
      new Blob([new Uint8Array(data)], { type: "application/pdf" }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName ?? `contrato-${fileId}.pdf`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="pdf-viewer position-relative overflow-hidden border rounded-2 shadow-sm"
      ref={rootRef}
    >
      <div
        className="pdf-viewer-scroll h-100 overflow-auto"
        ref={scrollRef}
        onScroll={updateCurrentPage}
      >
        {status === "loading" && (
          <div
            className="pdf-viewer-state d-flex flex-column align-items-center justify-content-center text-center"
            role="status"
          >
            <span className="spinner-border text-primary" aria-hidden />
            <p className="m-0">Cargando contrato…</p>
          </div>
        )}

        {status === "error" && (
          <div
            className="pdf-viewer-state d-flex flex-column align-items-center justify-content-center text-center"
            role="alert"
          >
            <p className="pdf-viewer-state-title m-0">
              No pudimos abrir el PDF
            </p>
            <p className="pdf-viewer-state-text m-0">
              Verifica que el archivo exista en Google Drive y que la app
              tenga acceso a él; luego inténtalo de nuevo.
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-2">
              <a
                className="pdf-viewer-btn pdf-viewer-btn-text d-inline-flex align-items-center justify-content-center text-decoration-none rounded-2 fw-bold"
                href={`https://drive.google.com/file/d/${fileId}/preview`}
                target="_blank"
                rel="noreferrer"
              >
                <LuExternalLink size={15} aria-hidden />
                Abrir en Drive
              </a>
              <button
                className="pdf-viewer-btn pdf-viewer-btn-text d-inline-flex align-items-center justify-content-center text-decoration-none rounded-2 fw-bold"
                type="button"
                onClick={() => setReloadKey((key) => key + 1)}
              >
                <LuRotateCw size={15} aria-hidden />
                Reintentar
              </button>
            </div>
          </div>
        )}

        {status === "ready" && (
          <div
            className="pdf-viewer-pages d-flex flex-column align-items-center"
            ref={pagesRef}
          >
            {Array.from({ length: numPages }, (_, index) => {
              const page = index + 1;
              return (
                <div
                  className="pdf-viewer-page flex-grow-0 flex-shrink-0"
                  key={page}
                  data-page={page}
                >
                  <canvas data-page={page} />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {status === "ready" && (
        <>
          <div
            className="pdf-viewer-toolbar position-absolute start-50 translate-middle-x z-3 d-flex align-items-center border rounded-pill"
            role="toolbar"
            aria-label="Controles del visor"
          >
            <span className="pdf-viewer-counter text-center">
              {currentPage} página{currentPage === 1 ? "" : "s"} de {numPages}
            </span>

            <span className="pdf-viewer-divider" aria-hidden />

            <button
              className="pdf-viewer-btn pdf-viewer-btn-icon d-inline-flex align-items-center justify-content-center text-decoration-none rounded-pill p-0"
              type="button"
              disabled={scale <= MIN_SCALE}
              onClick={() => zoomBy(1 / ZOOM_STEP)}
              aria-label="Reducir zoom"
              title="Reducir zoom"
            >
              <LuZoomOut size={17} aria-hidden />
            </button>

            <span className="pdf-viewer-zoom text-center">
              {Math.round(scale * 100)}%
            </span>

            <button
              className="pdf-viewer-btn pdf-viewer-btn-icon d-inline-flex align-items-center justify-content-center text-decoration-none rounded-pill p-0"
              type="button"
              disabled={scale >= MAX_SCALE}
              onClick={() => zoomBy(ZOOM_STEP)}
              aria-label="Aumentar zoom"
              title="Aumentar zoom"
            >
              <LuZoomIn size={17} aria-hidden />
            </button>
          </div>

          <div
            className="pdf-viewer-sidebar position-absolute top-50 translate-middle-y z-3 d-flex flex-column gap-2"
            role="toolbar"
            aria-label="Acciones del visor"
          >
            <button
              className="pdf-viewer-btn pdf-viewer-btn-icon d-inline-flex align-items-center justify-content-center text-decoration-none rounded-pill p-0"
              type="button"
              onClick={toggleFullscreen}
              aria-label={
                isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"
              }
              title={
                isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"
              }
            >
              {isFullscreen ? (
                <LuMinimize2 size={17} aria-hidden />
              ) : (
                <LuMaximize2 size={17} aria-hidden />
              )}
            </button>

            <button
              className="pdf-viewer-btn pdf-viewer-btn-icon d-inline-flex align-items-center justify-content-center text-decoration-none rounded-pill p-0"
              type="button"
              onClick={download}
              aria-label="Descargar PDF"
              title="Descargar PDF"
            >
              <LuDownload size={17} aria-hidden />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PdfViewer;
