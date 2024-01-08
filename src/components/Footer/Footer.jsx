import React from "react";
import { Link } from "react-router-dom";
// import Logo from "./index";
import Logo from "../Logo";

function Footer() {
  return (
    <footer class="bg-slate-900 ">
      <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center sm:justify-between lg:justify-center">
          <div class="flex justify-center text-teal-600 sm:justify-start"></div>

          <p class=" font-semibold mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
            Crafted with patience by{" "}
            <span className=" text-teal-600">
              <b>Vineet Jadhav 🔥</b>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
