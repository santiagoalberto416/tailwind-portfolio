import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Icon from "@/components/themes/bento/Icon";
import { SectionsIds } from "@/components/themes/bento/sections";
import { profile } from "@/data/profile";

const Footer = () => (
  <footer className="mt-28 border-t border-white/[0.06] md:mt-36">
    <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between md:px-6">
      <p>
        © {new Date().getFullYear()} {profile.name}
      </p>
      <p className="font-geist-mono text-xs">Built with Next.js, TypeScript &amp; Tailwind CSS</p>
      <a
        href={`#${SectionsIds.Home}`}
        className="inline-flex items-center gap-2 text-zinc-400 transition-colors hover:text-white"
      >
        Back to top
        <Icon icon={faArrowUp} className="h-3 w-3" />
      </a>
    </div>
  </footer>
);

export default Footer;
