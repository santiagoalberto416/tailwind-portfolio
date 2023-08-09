import Close from "@/icons/close";
import Hamburger from "@/icons/hamburger";
import { FC, useState } from "react";

const Header: FC<{}> = () => {
  const [show, setShow] = useState<undefined | boolean>(undefined);
  const className = show === undefined ? "" : show ? "slide-in" : "slide-out";
  return (
    <nav className="w-100">
      <div className="flex w-100 p-4 shadow-lg text-center">
        <div className="flex-1 text-left">SK.dev</div>
        <ul className="space-x-4 mr-4 lg:block hidden">
          <a href="/home">Home</a>
          <a href="/about">About</a>
          <a href="/projects">Projects</a>
          <a href="/contact">Contact</a>
        </ul>

        <div className="cursor-pointer lg:hidden" onClick={() => setShow(true)}>
          <Hamburger />
        </div>
      </div>

      <div
        className={`w-full mobile-menu ${className} h-screen bg-white z-10 lg:hidden flex flex-col center shadow-lg absolute top-0`}
      >
        <div className="w-100 flex justify-end p-4">
          <Close onClick={() => setShow(false)} />
        </div>
        <div className="flex justify-center content-center items-center h-96">
          <ul className="flex flex-col text-center space-y-4">
            <a href="/home">Home</a>
            <a href="/about">About</a>
            <a href="/projects">Projects</a>
            <a href="/contact">Contact</a>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
