import { useEffect, useState } from "react";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import Icon from "@/components/home/Icon";
import { SectionsIds, navItems } from "@/components/home/sections";
import useActiveSection from "@/utils/hooks/useActiveSection";
import { profile } from "@/data/profile";

const sectionIds = navItems.map((item) => item.id);

// Floating pill navigation with active-section highlight and a compact
// dropdown menu on small screens.
const NavBar = () => {
  const activeId = useActiveSection(sectionIds);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const linkClass = (id: string) =>
    `rounded-[999px] px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
      activeId === id
        ? "bg-white/10 text-white"
        : "text-zinc-400 hover:text-white"
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-[1152px] items-center justify-between gap-4"
      >
        <a
          href={`#${SectionsIds.Home}`}
          className="flex items-center gap-2.5 rounded-[999px] border border-white/[0.08] bg-ink-950/70 py-1.5 pl-1.5 pr-4 backdrop-blur-xl"
        >
          <span className="grid h-7 w-7 place-items-center rounded-[999px] bg-accent font-geist-mono text-[11px] font-semibold text-ink-950">
            SK
          </span>
          <span className="text-sm font-medium tracking-tight text-white">
            {profile.handle}
          </span>
        </a>

        <ul className="hidden items-center gap-1 rounded-[999px] border border-white/[0.08] bg-ink-950/70 p-1 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={linkClass(item.id)}
                aria-current={activeId === item.id ? "true" : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={`#${SectionsIds.Contact}`}
          className="hidden items-center gap-2 rounded-[999px] border border-white/[0.08] bg-ink-950/70 px-4 py-2 text-[13px] font-medium text-white backdrop-blur-xl transition-colors hover:border-white/20 lg:flex"
        >
          <span className="status-dot" aria-hidden="true" />
          {profile.availability}
        </a>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-[999px] border border-white/[0.08] bg-ink-950/70 text-white backdrop-blur-xl md:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Icon icon={menuOpen ? faXmark : faBars} className="h-4 w-4" />
        </button>
      </nav>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="mx-auto mt-2 max-w-[1152px] rounded-3xl border border-white/[0.08] bg-ink-900/95 p-2 shadow-2xl backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  aria-current={activeId === item.id ? "true" : undefined}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 text-[15px] ${
                    activeId === item.id
                      ? "bg-white/[0.06] text-white"
                      : "text-zinc-300"
                  }`}
                >
                  {item.label}
                  <span className="font-geist-mono text-[11px] text-zinc-500">
                    #{item.label.toLowerCase()}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default NavBar;
