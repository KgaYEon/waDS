import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./screens/Home/Home";
import SearchResultsScreen from "./screens/SearchResults/SearchResultsScreen";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/search", element: <SearchResultsScreen /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
