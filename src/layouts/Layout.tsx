import { useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import ScrollToTop from "../components/ScrollToTop";

/**
 * Site-wide chrome shared by every screen. Rendered once at the router
 * level (see App.tsx) — individual screens (src/screens/*) render only
 * their own content and must not include their own Header/Footer.
 */
export default function Layout() {
  const navigate = useNavigate();
  const headerRef = useRef<HTMLElement>(null);

  // Some screens (Filter, NewReleases) stack their own sticky title
  // block directly under this sticky Header, which means its `top`
  // offset has to equal Header's real rendered height exactly — a
  // hand-measured pixel guess drifted twice already (Header's height
  // depends on its tallest child, easy to miscount by hand). Measuring
  // it live and exposing it as --nav-header-height removes that
  // guesswork entirely, and stays correct if Header's own height ever
  // changes again.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const setHeight = () => {
      document.documentElement.style.setProperty("--nav-header-height", `${el.offsetHeight}px`);
    };

    setHeight();
    const observer = new ResizeObserver(setHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ScrollToTop />
      <Header ref={headerRef} onSearch={(term) => navigate(`/search?q=${encodeURIComponent(term)}`)} />
      <Outlet />
      <Footer />
    </>
  );
}
