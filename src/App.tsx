import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./screens/Home/Home";
import SearchResultsScreen from "./screens/SearchResults/SearchResultsScreen";
import AnnouncementsScreen from "./screens/Announcements/AnnouncementsScreen";
import NoticeDetailScreen from "./screens/Notice/NoticeDetailScreen";
import FaqScreen from "./screens/Faq/FaqScreen";
import SuggestionsScreen from "./screens/Suggestions/SuggestionsScreen";
import FilterScreen from "./screens/Filter/FilterScreen";
import NewReleasesScreen from "./screens/NewReleases/NewReleasesScreen";
import GameDetailScreen from "./screens/GameDetail/GameDetailScreen";
import DonationScreen from "./screens/Donation/DonationScreen";
import PaymentLogicDocScreen from "./screens/PaymentLogicDoc/PaymentLogicDocScreen";
import LoginScreen from "./screens/Login/LoginScreen";

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
      { path: "/new-releases", element: <NewReleasesScreen /> },
      { path: "/game/:id", element: <GameDetailScreen /> },
      { path: "/donation", element: <DonationScreen /> },
      { path: "/login", element: <LoginScreen /> },
    ],
  },
  // Outside Layout on purpose — this is a standalone archived doc (opened
  // in a new tab from the Donation CTA modal), not a normal site screen,
  // so it doesn't get the shared Header/Footer.
  { path: "/docs/payment-logic", element: <PaymentLogicDocScreen /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
