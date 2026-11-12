import type { RouteObject } from "react-router";

import Admin from "../../layouts/Admin/Admin";
import ContractsPage from "../../pages/Admin/Contracts/Index";
import AdminPage from "../../pages/Admin/Home/Index";
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
  {
    path: "/admin/contracts",
    element: (
      <Admin>
        <ContractsPage />
      </Admin>
    ),
  },
  { path: "/user", element: <User /> },
];

export default Routes;
