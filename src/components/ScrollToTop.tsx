import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * react-router-dom (unlike a classic multi-page site) doesn't reset scroll
 * position on navigation — without this, the new page renders wherever the
 * previous page's scroll happened to be (e.g. near the footer). Rendered
 * once inside Layout (the router's root element) so it runs for every
 * route change.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
