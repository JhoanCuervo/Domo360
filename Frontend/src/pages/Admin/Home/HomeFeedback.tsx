import { LuCircleX, LuHouse, LuRefreshCw } from "react-icons/lu";

import Button from "../../../components/Button/Button";

type HomeFeedbackProps =
  | { variant: "error"; message: string; onRetry: () => void }
  | { variant: "empty" };

/** Estado vacío o de error para la lista de inmuebles. */
const HomeFeedback = (props: HomeFeedbackProps) => {
  if (props.variant === "error") {
    const { message, onRetry } = props;

    return (
      <div className="feedback-box d-grid text-center is-error" role="alert">
        <span className="feedback-icon d-grid rounded-4" aria-hidden>
          <LuCircleX size={28} strokeWidth={1.75} />
        </span>
        <h2 className="feedback-title m-0">
          No pudimos cargar tus inmuebles
        </h2>
        <p className="feedback-text m-0">{message}</p>
        <Button variant="secondary" onClick={onRetry}>
          <LuRefreshCw size={16} strokeWidth={2} aria-hidden />
          Reintentar
        </Button>
      </div>
    );
  }

  return (
    <div className="feedback-box d-grid text-center">
      <span className="feedback-icon d-grid rounded-4" aria-hidden>
        <LuHouse size={28} strokeWidth={1.75} />
      </span>
      <h2 className="feedback-title m-0">Aún no hay inmuebles</h2>
      <p className="feedback-text m-0">
        Cuando registres tu primera propiedad aparecerá aquí con su estado de
        arriendo.
      </p>
    </div>
  );
};

export default HomeFeedback;
