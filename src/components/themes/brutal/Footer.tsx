import { FC } from "react";
import { profile } from "@/data/profile";
import { SectionsIds } from "@/components/themes/brutal/sectionIds";

const Footer: FC = () => (
  <footer className="nb-dark border-t-3 border-ink bg-ink text-paper">
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center gap-4">
        <span className="border-3 border-paper bg-sun px-3 py-1.5 text-lg font-extrabold leading-none text-ink rounded-nb">
          {profile.handle}
        </span>
        <p className="font-mono text-sm">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
      <a
        href={`#${SectionsIds.Home}`}
        className="font-mono text-sm font-bold uppercase underline decoration-sun decoration-[3px] underline-offset-4 hover:text-sun"
      >
        Back to top <span aria-hidden="true">↑</span>
      </a>
    </div>
  </footer>
);

export default Footer;
