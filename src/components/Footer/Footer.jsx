import React from "react";
import { Link } from "react-router-dom";
// import Logo from "./index";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="px-4 py-8  w-full ">
      <div className="container flex flex-wrap items-center justify-center mx-auto space-y-4 sm:justify-between sm:space-y-0">
        <div className="flex flex-row pr-3 space-x-4 sm:space-x-8">
          <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full bg-white/30 ">
            <Logo />
          </div>
          <ul className="flex flex-wrap items-center space-x-4 sm:space-x-8">
            <li>
              <Link to=" ">Terms of Use</Link>
            </li>
            <li>
              <Link to=" ">Privacy</Link>
            </li>
          </ul>
        </div>
        <ul className="flex flex-wrap pl-3 space-x-4 sm:space-x-8">
          <li>
            <Link to=" ">Instagram</Link>
          </li>
          <li>
            <Link to=" ">Facebook</Link>
          </li>
          <li>
            <Link to=" ">Twitter</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
