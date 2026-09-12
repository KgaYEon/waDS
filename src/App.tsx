import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./screens/Home/Home";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [{ path: "/", element: <Home /> }],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
