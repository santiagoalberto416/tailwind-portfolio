import { FC, KeyboardEvent, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { profile } from "@/data/profile";
import { SectionsIds, navSections } from "@/components/themes/brutal/sectionIds";
import { isExternal, socialLinks } from "@/components/themes/brutal/socialLinks";

const Logo: FC<{ onClick?: () => void }> = ({ onClick }) => (
  <a
    href={`#${SectionsIds.Home}`}
    onClick={onClick}
    className="inline-flex items-center border-3 border-ink bg-sun px-3 py-1.5 text-lg font-extrabold leading-none tracking-tight shadow-nb-sm rounded-nb"
  >
    {profile.handle}
    <span className="sr-only">, back to top</span>
  </a>
);

const NavBar: FC = () => {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Lock page scroll while the full-screen menu is open and move focus into it.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = (restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  };

  // Escape closes the menu; Tab cycles inside it (simple focus trap).
  const onMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      closeMenu();
      return;
    }
    if (event.key !== "Tab" || !menuRef.current) return;

    const focusable = menuRef.current.querySelectorAll<HTMLElement>("a, button");
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b-3 border-ink bg-paper">
      <nav
        aria-label="Main"
        className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {navSections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className="nb-navlink">
                {section.name}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={`#${SectionsIds.Contact}`}
          className="nb-btn nb-btn--sm hidden bg-bubblegum px-4 py-2.5 lg:inline-flex"
        >
          Let&apos;s talk <span aria-hidden="true">→</span>
        </a>

        <button
          ref={toggleRef}
          type="button"
          className="nb-btn nb-btn--sm bg-white px-3 py-2 font-mono text-sm uppercase lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          <FontAwesomeIcon icon={faBars} className="h-4 w-4" aria-hidden="true" />
          Menu
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          onKeyDown={onMenuKeyDown}
          className="nb-dots fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-sun lg:hidden"
        >
          <div className="flex h-[4.5rem] shrink-0 items-center justify-between border-b-3 border-ink px-4 sm:px-6">
            <Logo onClick={() => closeMenu(false)} />
            <button
              type="button"
              className="nb-btn nb-btn--sm bg-white px-3 py-2 font-mono text-sm uppercase"
              onClick={() => closeMenu()}
            >
              <FontAwesomeIcon
                icon={faXmark}
                className="h-4 w-4"
                aria-hidden="true"
              />
              Close
            </button>
          </div>

          <ul className="flex flex-col px-4 py-6 sm:px-6">
            {navSections.map((section, index) => (
              <li key={section.id} className="border-b-3 border-ink">
                <a
                  href={`#${section.id}`}
                  onClick={() => closeMenu(false)}
                  className="flex items-baseline gap-4 py-4 text-[clamp(2.5rem,12vw,4.5rem)] font-extrabold leading-none tracking-tight hover:bg-paper"
                >
                  <span className="nb-label" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex gap-3 px-4 pb-8 sm:px-6">
            {[socialLinks.linkedin, socialLinks.github, socialLinks.email].map(
              (link) => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.ariaLabel}
                  className="nb-btn nb-icon-btn"
                  {...(isExternal(link.href) && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                >
                  <FontAwesomeIcon
                    icon={link.icon}
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </a>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
