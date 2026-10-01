import { FC } from "react";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { profile } from "@/data/profile";
import Icon from "./Icon";
import { SectionsIds } from "./sections";

const Footer: FC = () => (
  <footer className="site-footer">
    <div className="lg-container site-footer__inner">
      <p>
        © {new Date().getFullYear()} {profile.name}. Built with Next.js, React
        &amp; Tailwind CSS.
      </p>
      <a href={`#${SectionsIds.Home}`} className="text-link">
        Back to top
        <Icon icon={faArrowUp} />
      </a>
    </div>
  </footer>
);

export default Footer;
