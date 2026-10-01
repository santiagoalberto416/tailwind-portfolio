import { RefObject, useEffect } from "react";

// Fades `[data-reveal]` elements in the first time they enter the viewport.
// Content is visible by default: the hidden state only applies once the root
// gets the `reveal-ready` class, so it never hides anything without JS.
const useRevealOnScroll = (rootRef: RefObject<HTMLElement | null>) => {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion || !("IntersectionObserver" in window)) return;

    const elements = Array.from(
      root.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    // Anything already on screen stays visible, so there is no flash on load.
    elements.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add("is-visible");
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0.05 }
    );

    elements
      .filter((el) => !el.classList.contains("is-visible"))
      .forEach((el) => observer.observe(el));
    root.classList.add("reveal-ready");

    return () => {
      observer.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, [rootRef]);
};

export default useRevealOnScroll;
