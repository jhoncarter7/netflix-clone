import React from "react";
import NavbarItem from "./NavbarItem";

const Navbar = () => {
  return (
    <nav>
      <div className="px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 bg-zinc-900 bg-opacity-90 ">
        <img className="h-4 lg:h-7" src="/images/logo.png" alt="Logo" />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
            <NavbarItem label="Home"/>
            <NavbarItem label="Series"/>
            <NavbarItem label="Film"/>
            <NavbarItem label="New & Popular"/>
            <NavbarItem label="My List"/>
            <NavbarItem label="Brows By Languages"/>
        </div>
        <div className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
            <p className="text-white text-sm">Browser</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
