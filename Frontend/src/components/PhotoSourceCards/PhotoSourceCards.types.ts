export type PhotoSourceCardsProps = {
  /** Imagen seleccionada; `null` cuando todavía no hay ninguna. */
  value: File | null;
  /** Se invoca con la imagen elegida o con `null` al quitarla. */
  onChange: (file: File | null) => void;
  /** Etiqueta visible del bloque. */
  label?: string;
  /** Texto auxiliar bajo las tarjetas (por defecto, formato y peso máximo). */
  hint?: string;
  /** Mensaje de error; si existe, el bloque se marca como inválido. */
  error?: string;
  /** Tipos aceptados por el selector de archivos. */
  accept?: string;
  /** Peso máximo permitido en bytes. */
  maxSize?: number;
  /** Cámara preferida en móviles. */
  cameraFacing?: "user" | "environment";
  /** Deshabilita ambas tarjetas. */
  disabled?: boolean;
};
