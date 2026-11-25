import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import type { QuickAction } from "./Home.data";

type Props = {
  actions: QuickAction[];
  ariaLabel?: string;
  panelKey: string;
  onSelect?: (id: string) => void;
};

/** Botonera inferior con los accesos rápidos del arrendatario. */
const QuickActions = ({ actions, panelKey, onSelect }: Props) => {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="container-lg px-0 px-md-4 pb-md-3"
      aria-label="Accesos rápidos"
    >
      <div className="user-home-sheet bg-white shadow-sm px-3 py-4 p-md-4">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={panelKey}
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.28, ease: "easeInOut" }
            }
          >
            <div className="row row-cols-3 row-cols-md-6 g-2 g-md-3">
              {actions.map(({ id, label, icon: Icon }) => (
                <div key={id} className="col">
                  <button
                    type="button"
                    className="user-home-action btn border-0 w-100 d-flex flex-column align-items-center gap-2 py-2 px-1 text-center"
                    onClick={() => onSelect?.(id)}
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
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default QuickActions;
