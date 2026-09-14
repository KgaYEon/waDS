import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./screens/Home/Home";
import SearchResultsScreen from "./screens/SearchResults/SearchResultsScreen";
import AnnouncementsScreen from "./screens/Announcements/AnnouncementsScreen";
import NoticeDetailScreen from "./screens/Notice/NoticeDetailScreen";
import FaqScreen from "./screens/Faq/FaqScreen";
import SuggestionsScreen from "./screens/Suggestions/SuggestionsScreen";
import FilterScreen from "./screens/Filter/FilterScreen";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/search", element: <SearchResultsScreen /> },
      { path: "/notices", element: <AnnouncementsScreen /> },
      { path: "/notice/:id", element: <NoticeDetailScreen /> },
      { path: "/faq", element: <FaqScreen /> },
      { path: "/suggestions", element: <SuggestionsScreen /> },
      { path: "/filters", element: <FilterScreen /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
