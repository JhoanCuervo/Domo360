import { useState } from "react";
import { useNavigate } from "react-router";

import "./Home.css";
import { PANELS, type PanelId } from "./Home.data";
import QuickActions from "./QuickActions";
import UserHero from "./UserHero";

/** Pantalla de inicio para el usuario arrendatario (móvil y web responsivo). */
function Index() {
  const [panelId, setPanelId] = useState<PanelId>("main");
  const navigate = useNavigate();

  const panel = PANELS[panelId];

  /** Navega a la ruta o al panel destino de la acción elegida, si los tiene. */
  const handleSelect = (actionId: string) => {
    const action = panel.actions.find(({ id }) => id === actionId);
    if (!action) return;
    if (action.route) {
      navigate(action.route);
      return;
    }
    if (action.to) {
      setPanelId(action.to);
    }
  };

  return (
    <main className="user-home-page d-flex flex-column min-vh-100">
      <UserHero />
      <QuickActions
        panelKey={panelId}
        actions={panel.actions}
        ariaLabel={panel.label}
        onSelect={handleSelect}
      />
    </main>
  );
}

export default Index;
