import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to top on every route change.
 * Also handles hash-based scrolling: if the URL contains a hash,
 * it waits briefly for the DOM to settle then scrolls to that element.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Allow the page to render, then scroll to the target element
      const timer = setTimeout(() => {
        const el = document.querySelector(hash);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return () => clearTimeout(timer);
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
