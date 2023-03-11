import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";

const Main = lazy(() => import("./pages/Main"));
const Repository = lazy(() => import("./pages/Repository"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default Router;