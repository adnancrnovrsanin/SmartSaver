import React, { useState } from "react";
import Sidebar from "../sidebar/sidebar";
import { IoCloseOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "../../assets/SmartSaverLogo.png";
import { ModeToggle } from "../mode-toogle";

const Navbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    console.log(isSidebarOpen);
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav
      className="navbar flex items-center justify-between border-b-2 text-white p-4"
      style={{ backgroundColor: "#020817" }}
    >
      <div className="navbar__logo flex items-center">
        <img src={Logo} alt="Logo" className="w-8 h-8 mr-2" />
        <h1 className="text-lg font-bold">Smart Saver</h1>
      </div>
      <div className="flex gap-2">
        <div
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded navbar"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <IoCloseOutline /> : <GiHamburgerMenu />}
        </div>
        <ModeToggle />
      </div>
      {isSidebarOpen && (
        <Sidebar expanded={isSidebarOpen} setExpanded={setIsSidebarOpen} />
      )}
    </nav>
  );
};

export default Navbar;
