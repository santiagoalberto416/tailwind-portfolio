import { RefObject, useEffect } from "react";

// Reveal-on-scroll for every `.reveal` element inside `rootRef`.
// Content is visible by default (no JS, reduced motion, server render); the
// hidden starting state only applies once this hook adds `nb-reveal-ready`.
const useReveal = (rootRef: RefObject<HTMLElement | null>) => {
  useEffect(() => {
    const root = rootRef.current;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!root || reduceMotion || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );

    root.querySelectorAll<HTMLElement>(".reveal").forEach((element) => {
      // Anything already on screen is shown immediately, so nothing flickers.
      if (element.getBoundingClientRect().top < window.innerHeight) {
        element.classList.add("is-visible");
      } else {
        observer.observe(element);
      }
    });
    root.classList.add("nb-reveal-ready");

    return () => observer.disconnect();
  }, [rootRef]);
};

export default useReveal;
