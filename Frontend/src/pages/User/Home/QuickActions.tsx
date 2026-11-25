import type { QuickAction } from "./Home.data";

type Props = {
  actions: QuickAction[];
};

/** Botonera inferior con los accesos rápidos del arrendatario. */
const QuickActions = ({ actions }: Props) => (
  <section
    className="container-lg px-0 px-md-4 pb-md-3"
    aria-label="Accesos rápidos"
  >
    <div className="user-home-sheet bg-white shadow-sm px-3 py-4 p-md-4">
      <div className="row row-cols-3 row-cols-md-6 g-2 g-md-3">
        {actions.map(({ id, label, icon: Icon }) => (
          <div key={id} className="col">
            <button
              type="button"
              className="user-home-action btn border-0 w-100 d-flex flex-column align-items-center gap-2 py-2 px-1 text-center"
            >
              <span className="user-home-action-icon rounded-circle d-inline-flex align-items-center justify-content-center">
                <Icon size={24} strokeWidth={1.9} aria-hidden />
              </span>
              <span className="user-home-action-label fw-semibold lh-sm">
                {label}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default QuickActions;
