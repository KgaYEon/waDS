import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";

/**
 * Site-wide chrome shared by every screen. Rendered once at the router
 * level (see App.tsx) — individual screens (src/screens/*) render only
 * their own content and must not include their own Header/Footer.
 */
export default function Layout() {
  const navigate = useNavigate();

  return (
    <>
      <Header onSearch={(term) => navigate(`/search?q=${encodeURIComponent(term)}`)} />
      <Outlet />
      <Footer />
    </>
  );
}
