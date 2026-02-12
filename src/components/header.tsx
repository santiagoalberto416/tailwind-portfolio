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

const Icons = {
  [SectionsIds.Home]: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="currentColor"
    >
      <path d="M6.906.664a1.749 1.749 0 0 1 2.187 0l5.25 4.2c.415.332.657.835.657 1.367v7.019A1.75 1.75 0 0 1 13.25 15h-3.5a.75.75 0 0 1-.75-.75V9H7v5.25a.75.75 0 0 1-.75.75h-3.5A1.75 1.75 0 0 1 1 13.25V6.23c0-.531.242-1.034.657-1.366l5.25-4.2Zm1.25 1.171a.25.25 0 0 0-.312 0l-5.25 4.2a.25.25 0 0 0-.094.196v7.019c0 .138.112.25.25.25H5.5V8.25a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 .75.75v5.25h2.75a.25.25 0 0 0 .25-.25V6.23a.25.25 0 0 0-.094-.195Z"></path>
    </svg>
  ),
  [SectionsIds.About]: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="currentColor"
    >
      <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path>
    </svg>
  ),
  [SectionsIds.Experience]: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      width="16"
      height="16"
    >
      <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm7-3.25v2.992l2.028.812a.75.75 0 0 1-.557 1.392l-2.5-1A.751.751 0 0 1 7 8.25v-3.5a.75.75 0 0 1 1.5 0Z"></path>
    </svg>
  ),
  [SectionsIds.Projects]: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      width="16"
      height="16"
    >
      <path d="M4.75 7a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-4.5ZM5 4.75A.75.75 0 0 1 5.75 4h5.5a.75.75 0 0 1 0 1.5h-5.5A.75.75 0 0 1 5 4.75ZM6.75 10a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-4.5Z"></path>
      <path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25Z"></path>
    </svg>
  ),
  [SectionsIds.Contact]: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="currentColor"
    >
      <path d="M1.75 1h8.5c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 10.25 10H7.061l-2.574 2.573A1.458 1.458 0 0 1 2 11.543V10h-.25A1.75 1.75 0 0 1 0 8.25v-5.5C0 1.784.784 1 1.75 1ZM1.5 2.75v5.5c0 .138.112.25.25.25h1a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h3.5a.25.25 0 0 0 .25-.25v-5.5a.25.25 0 0 0-.25-.25h-8.5a.25.25 0 0 0-.25.25Zm13 2a.25.25 0 0 0-.25-.25h-.5a.75.75 0 0 1 0-1.5h.5c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 14.25 12H14v1.543a1.458 1.458 0 0 1-2.487 1.03L9.22 12.28a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215l2.22 2.22v-2.19a.75.75 0 0 1 .75-.75h1a.25.25 0 0 0 .25-.25Z"></path>
    </svg>
  ),
};

const Header: FC<{}> = () => {
  const [show, setShow] = useState<undefined | boolean>(undefined);
  const [closing, setClosing] = useState(false);
  let className = show === undefined ? "" : show ? "grow-up" : "shrink";
  if (closing) {
    className = "shrink";
  }

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [show]);

  const renderNavLinks = () => {
    const sections = [
      {
        name: "Home",
        id: SectionsIds.Home,
        icon: Icons[SectionsIds.Home],
      },
      {
        name: "About",
        id: SectionsIds.About,
        icon: Icons[SectionsIds.About],
      },
      {
        name: "Experience",
        id: SectionsIds.Experience,
        icon: Icons[SectionsIds.Experience],
      },
      {
        name: "Projects",
        id: SectionsIds.Projects,
        icon: Icons[SectionsIds.Projects],
      },
      {
        name: "Contact",
        id: SectionsIds.Contact,
        icon: Icons[SectionsIds.Contact],
      },
    ];

    return sections.map((section) => (
      <a
        className="p-4 !mt-0 gap-4 flex items-center"
        onClick={closeNav}
        href={`#${section.id}`}
        key={section.id}
      >
        <span>{section.icon}</span>
        <span>{section.name}</span>
      </a>
    ));
  };

  const closeNav = () => {
    setClosing(true);
    setTimeout(() => {
      setShow(false);
      setClosing(false);
    }, 300);
  };

  const handleClose = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    closeNav();
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

        <button
          className="cursor-pointer lg:hidden bg-transparent border-0 p-2"
          onClick={() => setShow(true)}
          aria-label="Open navigation menu"
          aria-expanded={show}
        >
          <Hamburger />
        </button>
      </div>
      <div
        className={`h-screen z-20 absolute w-full bg-black opacity-50 ${
          !show && "hidden"
        }`}
      />
      <div
        className={`w-full h-screen z-30 ${
          show ? "flex" : "hidden"
        }  lg:hidden flex flex-col center absolute top-0`}
      >
        <div className="main-nav">
          {/* Header */}
          <div className="w-100 border-b py-4 flex justify-end items-center">
            <div className="grow w-full text-left pl-4 top-6 pointer-events-none">
              DevKirk
            </div>
            <button
              className="p-2 rounded bg-white text-black h-fit mr-4 border-0"
              onClick={handleClose}
              aria-label="Close navigation menu"
            >
              <Hamburger />
            </button>
          </div>
          {/* Options */}
          <div className={`flex ${className} h-fit`}>
            <ul
              style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
              className="w-full text-center space-y-4 columns-2 grid p-4"
            >
              {renderNavLinks()}
            </ul>
          </div>
        </div>
        {/*  Backdrop */}
        <div className={`grow w-full`} onClick={handleClose} />
      </div>
    </nav>
  );
};

export default Header;
