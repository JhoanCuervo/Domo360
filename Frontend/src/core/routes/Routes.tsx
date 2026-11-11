import type { RouteObject } from "react-router";

import AdminLayout from "../../layouts/AdminLayout/AdminLayout";
import Admin from "../../pages/Admin/Index";
import Login from "../../pages/Login/Index";
import User from "../../pages/User/Index";

const Routes: RouteObject[] = [
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  {
    path: "/admin",
    element: (
      <AdminLayout>
        <Admin />
      </AdminLayout>
    ),
  },
  { path: "/user", element: <User /> },
];

export default Routes;
