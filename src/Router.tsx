import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { NotFound, Main, Repository } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/:id",
    element: <Repository />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
