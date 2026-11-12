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
      <div className="home-feedback is-error" role="alert">
        <span className="home-feedback-icon" aria-hidden>
          <LuCircleX size={28} strokeWidth={1.75} />
        </span>
        <h2 className="home-feedback-title">
          No pudimos cargar tus inmuebles
        </h2>
        <p className="home-feedback-text">{message}</p>
        <Button variant="secondary" onClick={onRetry}>
          <LuRefreshCw size={16} strokeWidth={2} aria-hidden />
          Reintentar
        </Button>
      </div>
    );
  }

  return (
    <div className="home-feedback">
      <span className="home-feedback-icon" aria-hidden>
        <LuHouse size={28} strokeWidth={1.75} />
      </span>
      <h2 className="home-feedback-title">Aún no hay inmuebles</h2>
      <p className="home-feedback-text">
        Cuando registres tu primera propiedad aparecerá aquí con su estado de
        arriendo.
      </p>
    </div>
  );
};

export default HomeFeedback;
