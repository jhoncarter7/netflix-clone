import React, { useCallback, useState } from "react";
import NavbarItem from "./NavbarItem";
import {BsBell, BsChevronCompactDown, BsSearch} from 'react-icons/bs'
import MobileMenu from "./MobileMenu";
import AccountMenu from "./AccountMenu";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showAccountMenu, setShowAccountMenu] = useState(false)

const togglemobileMenu = useCallback(() => {
  setShowMobileMenu((current) => !current)
},[setShowMobileMenu])

const toggelAccountMenu = useCallback(() => {
  setShowAccountMenu((current) => !current)
}, [setShowAccountMenu])
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
        <div onClick={togglemobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
            <p className="text-white text-sm">Browser</p>
            <BsChevronCompactDown  className= {`text-white transition ${showMobileMenu ? 'rotate-180': 'rotate-0'}`}/>
            <MobileMenu visible={showMobileMenu}/>
        </div>
        
        <div className=" flex flex-row ml-auto gap-7 items-center">
        <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
          <BsSearch/>
        </div>
        <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
          <BsBell/>
        </div>

        <div onClick={toggelAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
          <div className="w-10 h-10 lg:w-10 rounded-md overflow-hidden ">
            <img src="/images/default-blue.png" alt="" />
          </div>
          <BsChevronCompactDown  className= {`text-white transition ${showAccountMenu ? 'rotate-180': 'rotate-0'}`}/>
          <AccountMenu visible={showAccountMenu}/>
        </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
