import { FC, useEffect, useRef, useState } from "react";
import useActiveSection from "@/components/themes/glass/useActiveSection";
import Icon from "./Icon";
import { navItems, SectionsIds } from "./sections";

const sectionIds = navItems.map((item) => item.id);

type IndicatorBox = { x: number; width: number };

// Floating glass capsule: centered at the top on desktop, a bottom tab bar on
// mobile. A "liquid" pill slides under the link of the section in view.
const NavBar: FC = () => {
  const activeId = useActiveSection(sectionIds);
  const listRef = useRef<HTMLUListElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState<IndicatorBox | null>(null);

  useEffect(() => {
    const list = listRef.current;
    const measure = () => {
      const link = linkRefs.current[activeId];
      if (link) {
        setIndicator({ x: link.offsetLeft, width: link.offsetWidth });
      }
    };

    measure();
    // Re-measure when fonts load or the layout switches between breakpoints
    const observer = new ResizeObserver(measure);
    if (list) observer.observe(list);
    return () => observer.disconnect();
  }, [activeId]);

  return (
    <nav className="liquid-nav" aria-label="Primary">
      <div className="liquid-nav__capsule glass glass--blur">
        <a
          href={`#${SectionsIds.Home}`}
          className="liquid-nav__brand"
          aria-label="Santiago Kirk, back to top"
        >
          SK
        </a>
        <div className="liquid-nav__track">
          {indicator && (
            <span
              className="liquid-nav__indicator"
              aria-hidden="true"
              style={{
                width: indicator.width,
                transform: `translateX(${indicator.x}px)`,
              }}
            />
          )}
          <ul ref={listRef} className="liquid-nav__list">
            {navItems.map((item) => {
              const isActive = item.id === activeId;
              return (
                <li key={item.id}>
                  <a
                    ref={(el) => {
                      linkRefs.current[item.id] = el;
                    }}
                    href={`#${item.id}`}
                    className="liquid-nav__link"
                    // Both labels are rendered (one per breakpoint), so name the link once
                    aria-label={item.label}
                    aria-current={isActive ? "location" : undefined}
                  >
                    <Icon icon={item.icon} className="liquid-nav__icon" />
                    <span className="liquid-nav__label">{item.label}</span>
                    <span className="liquid-nav__label--short">
                      {item.shortLabel}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
