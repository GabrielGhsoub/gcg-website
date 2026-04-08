import { useState, useEffect, useRef } from "react";

interface ScrollDirectionState {
  hidden: boolean;
  scrolled: boolean;
}

export function useScrollDirection(): ScrollDirectionState {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);

      if (y > 150) {
        setHidden(y > lastY.current && y - lastY.current > 5);
      } else {
        setHidden(false);
      }
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { hidden, scrolled };
}
