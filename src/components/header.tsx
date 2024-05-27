import Close from "@/icons/close";
import Hamburger from "@/icons/hamburger";
import { FC, useEffect, useState } from "react";

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
  const handleMobileClick = () => setShow(false);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [show]);

  const renderNavLinks = () => {
    const sections = [
      { name: "Home", id: SectionsIds.Home },
      { name: "About", id: SectionsIds.About },
      { name: "Experience", id: SectionsIds.Experience },
      { name: "Projects", id: SectionsIds.Projects },
      { name: "Contact", id: SectionsIds.Contact },
    ];

    return sections.map((section) => (
      <a onClick={handleMobileClick} href={`#${section.id}`} key={section.id}>
        {section.name}
      </a>
    ));
  };

  return (
    <nav className="w-100 main-nav">
      <div className="flex w-100 p-4 shadow-lg text-center">
        <div className="flex-1 text-left">DevKirk</div>
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
        <div className="flex justify-center content-center items-center h-96">
          <ul className="flex flex-col text-center space-y-4">
            {renderNavLinks()}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
