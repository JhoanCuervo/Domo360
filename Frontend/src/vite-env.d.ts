/// <reference types="vite/client" />

declare module "*.css";

// El worker de pdf.js se importa para el "fake worker" en el hilo
// principal (ver PdfViewer.tsx). pdfjs-dist no publica tipos para este
// archivo, solo se usa su export `WorkerMessageHandler`.
declare module "pdfjs-dist/build/pdf.worker.mjs" {
  export const WorkerMessageHandler: unknown;
}
