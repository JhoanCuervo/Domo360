import type { RouteObject } from "react-router";

import Admin from "../../layouts/Admin/Admin";
import ApartmentPage from "../../pages/Admin/Apartment/Index";
import AdminPage from "../../pages/Admin/Home/Index";
import Login from "../../pages/Login/Index";
import User from "../../pages/User/Home/Index";
import UploadReceipt from "../../pages/User/Receipts/UploadReceipt/Index";
import ViewReceipts from "../../pages/User/Receipts/ViewReceipts/Index";

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
    path: "/admin/apartment/:id",
    element: (
      <Admin>
        <ApartmentPage />
      </Admin>
    ),
  },
  { path: "/user", element: <User /> },
  { path: "/user/receipts/upload", element: <UploadReceipt /> },
  { path: "/user/receipts/view", element: <ViewReceipts /> },
];

export default Routes;
