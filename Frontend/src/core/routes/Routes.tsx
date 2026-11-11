import type { RouteObject } from "react-router";

import Login from "../../pages/Login/Index";

const Routes: RouteObject[] = [
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
];

export default Routes;
