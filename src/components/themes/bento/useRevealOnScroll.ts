import { RefObject, useEffect } from "react";

// Fades/slides `[data-reveal]` elements in as they enter the viewport.
// The hidden start state only applies once `.reveal-ready` is added to the
// root, so content stays visible without JS or with reduced motion.
const useRevealOnScroll = (rootRef: RefObject<HTMLElement | null>) => {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) return;

    const elements = root.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );

    // Anything already on screen is shown right away (no flash on load);
    // the rest animates in when scrolled into view.
    elements.forEach((element) => {
      if (element.getBoundingClientRect().top < window.innerHeight) {
        element.classList.add("is-visible");
      } else {
        observer.observe(element);
      }
    });
    root.classList.add("reveal-ready");

    return () => {
      observer.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, [rootRef]);
};

export default useRevealOnScroll;
