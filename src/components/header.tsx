import Close from "@/icons/close";
import Hamburger from "@/icons/hamburger";
import { FC, useEffect, useState } from "react";
import { set } from "immutable";

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
      {
        name: "Home",
        id: SectionsIds.Home,
        icon: (
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
      },
      {
        name: "About",
        id: SectionsIds.About,
        icon: (
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
      },
      {
        name: "Experience",
        id: SectionsIds.Experience,
        icon: (
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
      },
      {
        name: "Projects",
        id: SectionsIds.Projects,
        icon: (
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
      },
      {
        name: "Contact",
        id: SectionsIds.Contact,
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path d="M1.75 1h12.5c.966 0 1.75.784 1.75 1.75v9.5A1.75 1.75 0 0 1 14.25 14H8.061l-2.574 2.573A1.458 1.458 0 0 1 3 15.543V14H1.75A1.75 1.75 0 0 1 0 12.25v-9.5C0 1.784.784 1 1.75 1ZM1.5 2.75v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25Z"></path>
            <path d="M22.5 8.75a.25.25 0 0 0-.25-.25h-3.5a.75.75 0 0 1 0-1.5h3.5c.966 0 1.75.784 1.75 1.75v9.5A1.75 1.75 0 0 1 22.25 20H21v1.543a1.457 1.457 0 0 1-2.487 1.03L15.939 20H10.75A1.75 1.75 0 0 1 9 18.25v-1.465a.75.75 0 0 1 1.5 0v1.465c0 .138.112.25.25.25h5.5a.75.75 0 0 1 .53.22l2.72 2.72v-2.19a.75.75 0 0 1 .75-.75h2a.25.25 0 0 0 .25-.25v-9.5Z"></path>
          </svg>
        ),
      },
    ];

    return sections.map((section) => (
      <a
        className="p-4 !mt-0 gap-4 flex items-center"
        onClick={handleMobileClick}
        href={`#${section.id}`}
        key={section.id}
      >
        <span>{section.icon}</span>
        <span>{section.name}</span>
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
        className={`h-screen z-20 absolute w-full bg-black opacity-50 ${
          !show && "hidden"
        }`}
        onClick={() => setShow(false)}
      />
      <div
        className={`w-full h-screen mobile-menu ${className}  z-30  lg:hidden flex flex-col center absolute top-0`}
      >
        <div className="main-nav">
          <div className="w-100 border-b py-4 flex justify-end items-center">
            <h2 className="text-xl grow w-full text-left pl-6 top-6 pointer-events-none">
              DevKirk
            </h2>
            <div
              className="p-2 rounded bg-white text-black h-fit mr-4"
              onClick={() => setShow(false)}
            >
              <Close size="24px" onClick={() => {}} />
            </div>
          </div>
          <div className="flex h-fit p-4">
            <ul
              style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
              className="w-full text-center space-y-4 columns-2 grid"
            >
              {renderNavLinks()}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
