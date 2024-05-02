import Close from "@/icons/close";
import Hamburger from "@/icons/hamburger";
import { FC, useState } from "react";

export const SectionsIds = {
  Home: "home-section",
  About: "about-section",
  Experience: "experience-section",
  Projects: "projects-section",
  Contact: "contact-section",
};

const Header: FC<{}> = () => {
  const [show, setShow] = useState<undefined | boolean>(undefined);
  const className = show === undefined ? "" : show ? "slide-in" : "slide-out";

  const scrollTo = (id: string) => () => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="w-100 main-nav">
      <div className="flex w-100 p-4 shadow-lg text-center">
        <div className="flex-1 text-left">SK.dev</div>
        <ul className="lg:flex hidden space-x-4">
          <li>
            <a href={`#${SectionsIds.Home}`}>Home</a>
          </li>
          <li>
            <a href={`#${SectionsIds.About}`}>About</a>
          </li>
          <li>
            <a href={`#${SectionsIds.Experience}`}>Experience</a>
          </li>
          <li>
            <a href={`#${SectionsIds.Projects}`}>Projects</a>
          </li>
          <li>
            <a href={`#${SectionsIds.Contact}`}>Contact</a>
          </li>
        </ul>

        <div className="cursor-pointer lg:hidden" onClick={() => setShow(true)}>
          <Hamburger />
        </div>
      </div>

      <div
        className={`w-full main-nav mobile-menu ${className} h-screen bg-white z-10 lg:hidden flex flex-col center shadow-lg absolute top-0`}
      >
        <div className="w-100 flex justify-end p-4">
          <Close onClick={() => setShow(false)} />
        </div>
        s
        <div className="flex justify-center content-center items-center h-96">
          <ul className="flex flex-col text-center space-y-4">
            <a href={`#${SectionsIds.Home}`}>Home</a>
            <a href={`#${SectionsIds.About}`}>About</a>
            <a href={`#${SectionsIds.Experience}`}>Experience</a>
            <a href={`#${SectionsIds.Projects}`}>Projects</a>
            <a href={`#${SectionsIds.Contact}`}>Contact</a>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
