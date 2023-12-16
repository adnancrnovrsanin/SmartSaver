import React from "react";
import Logo from "../../assets/SmartSaverLogo.png"

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img src={Logo} alt="App Logo" className="h-8 w-8 mr-2" />
          <span className="font-bold">Smart Saver</span>
        </div>
        <div>
          <ul className="flex space-x-4">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
