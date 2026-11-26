import { useEffect, useId, useState, type ChangeEvent } from "react";
import { LuCamera, LuImagePlus, LuX } from "react-icons/lu";

import type { PhotoSourceCardsProps } from "./PhotoSourceCards.types";

import "./PhotoSourceCards.css";

const DEFAULT_MAX_SIZE = 5 * 1024 * 1024;

/** Convierte bytes a un texto corto ("4,2 MB"). */
const formatSize = (bytes: number): string => {
  if (bytes >= 1024 * 1024) {
    const megabytes = bytes / (1024 * 1024);
    const text = Number.isInteger(megabytes)
      ? String(megabytes)
      : megabytes.toFixed(1);
    return `${text.replace(".", ",")} MB`;
  }

  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
};

/**
 * Selector de imagen con dos tarjetas contiguas: subir desde la galería o
 * tomar una foto con la cámara. Al elegir un archivo muestra la vista previa
 * y permite quitarlo.
 */
const PhotoSourceCards = ({
  value,
  onChange,
  label = "Foto",
  hint,
  error,
  accept = "image/*",
  maxSize = DEFAULT_MAX_SIZE,
  cameraFacing = "environment",
  disabled = false,
}: PhotoSourceCardsProps) => {
  const autoId = useId();
  const labelId = `photo-source-label-${autoId}`;
  const hintId = `photo-source-hint-${autoId}`;
  const errorId = `photo-source-error-${autoId}`;

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  const shownError = error ?? localError;

  useEffect(() => {
    if (!value) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(value);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [value]);

  useEffect(() => {
    setLocalError(null);
  }, [value]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const file = input.files?.[0];

    // Permite volver a elegir el mismo archivo después de quitarlo.
    input.value = "";

    if (!file) return;

    if (file.type && !file.type.startsWith("image/")) {
      setLocalError("Selecciona una imagen en formato JPG o PNG.");
      return;
    }

    if (file.size > maxSize) {
      setLocalError(`La imagen supera el máximo de ${formatSize(maxSize)}.`);
      return;
    }

    setLocalError(null);
    onChange(file);
  };

  const describedBy = shownError ? `${hintId} ${errorId}` : hintId;

  return (
    <div>
      <div className="field-head d-flex align-items-baseline justify-content-between gap-3">
        <span id={labelId} className="form-label field-label fw-semibold mb-0">
          {label}
        </span>
      </div>

      {value && previewUrl && (
        <div className="photo-source-preview overflow-hidden border rounded-3 bg-white mb-2">
          <img
            src={previewUrl}
            alt="Vista previa de la foto seleccionada"
            className="photo-source-preview-img d-block w-100 object-fit-contain"
          />
          <div className="d-flex align-items-center gap-2 border-top px-3 py-2">
            <span className="small text-secondary text-truncate flex-grow-1">
              {value.name}
            </span>
            <span className="small text-secondary text-nowrap">
              {formatSize(value.size)}
            </span>
            <button
              type="button"
              className="btn btn-sm btn-light border rounded-pill d-inline-flex align-items-center gap-1"
              onClick={() => onChange(null)}
              disabled={disabled}
            >
              <LuX size={14} aria-hidden />
              Quitar
            </button>
          </div>
        </div>
      )}

      <div
        className="photo-source-cards"
        role="group"
        aria-labelledby={labelId}
      >
        <label
          className={`photo-source-card position-relative${
            disabled ? " is-disabled" : ""
          }`}
        >
          <input
            type="file"
            accept={accept}
            className="visually-hidden"
            disabled={disabled}
            aria-invalid={Boolean(shownError)}
            aria-describedby={describedBy}
            onChange={handleChange}
          />
          <span className="photo-source-card-icon" aria-hidden>
            <LuImagePlus size={24} strokeWidth={1.9} />
          </span>
          <span className="photo-source-card-title">Subir foto</span>
          <span className="photo-source-card-hint">Desde tu galería</span>
        </label>

        <label
          className={`photo-source-card position-relative${
            disabled ? " is-disabled" : ""
          }`}
        >
          <input
            type="file"
            accept={accept}
            capture={cameraFacing}
            className="visually-hidden"
            disabled={disabled}
            aria-invalid={Boolean(shownError)}
            aria-describedby={describedBy}
            onChange={handleChange}
          />
          <span className="photo-source-card-icon" aria-hidden>
            <LuCamera size={24} strokeWidth={1.9} />
          </span>
          <span className="photo-source-card-title">Tomar foto</span>
          <span className="photo-source-card-hint">Usa la cámara</span>
        </label>
      </div>

      <small id={hintId} className="form-text d-block mt-2">
        {hint ?? `Imagen · máx. ${formatSize(maxSize)}`}
      </small>

      {shownError && (
        <p
          id={errorId}
          role="alert"
          className="field-error text-danger fw-medium mt-2 mb-0"
        >
          {shownError}
        </p>
      )}
    </div>
  );
};

export default PhotoSourceCards;
