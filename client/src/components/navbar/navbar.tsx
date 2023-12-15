import React, { useState } from "react";
import Sidebar from "../sidebar/sidebar";
import { IoCloseOutline } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="navbar flex items-center justify-between bg-gray-800 text-white p-4">
      <div className="navbar__logo flex items-center">
        <img src="logo.png" alt="Logo" className="w-8 h-8 mr-2" />
        <h1 className="text-lg font-bold">Site Name</h1>
      </div>
      <div className="navbar__options">
        <button
          onClick={toggleSidebar}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
            {isSidebarOpen ? <IoCloseOutline /> : <GiHamburgerMenu />}
        </button>
      </div>
      {isSidebarOpen && (
        <Sidebar expanded={isSidebarOpen} setExpanded={setIsSidebarOpen} />
      )}
    </nav>
  );
};

export default Navbar;
