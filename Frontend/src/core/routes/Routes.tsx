import type { RouteObject } from "react-router";

import Admin from "../../layouts/Admin/Admin";
import AdminPage from "../../pages/Admin/Index";
import Login from "../../pages/Login/Index";
import User from "../../pages/User/Index";

const Routes: RouteObject[] = [
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  {
    path: "/admin",
    element: (
      <Admin>
        <AdminPage />
      </Admin>
    ),
  },
  { path: "/user", element: <User /> },
];

export default Routes;
