import React, { useEffect, useRef } from "react";
import Logo from "../../assets/SmartSaverLogo.png";

interface SidebarProps {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ expanded, setExpanded }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        (event.target as HTMLElement) &&
        !(event.target as HTMLElement).classList.contains("navbar")
      ) {
        setExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setExpanded]);

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white duration-300 transition-all ${
        expanded ? "translate-x-0 scale-100" : "-translate-x-full scale-90"
      }`}
      style={{
        transform: expanded
          ? "translateX(0) scale(1)"
          : "translateX(-100%) scale(0.9)",
        transition: "transform 0.3s ease-in-out",
        backgroundColor: "#020817",
      }}
    >
      <div className="navbar__logo flex items-center p-10">
        <img src={Logo} alt="Logo" className="w-8 h-8 mr-2" />
        <h1 className="text-lg font-bold">Smart Saver</h1>
      </div>
      <div className="flex flex-col justify-center items-center">
      <a href="/dashboard" className="text-lg font-bold">Dashboard</a>
      <a href="/" className="text-lg font-bold">Landing</a>
      </div>
    </div>
  );
};
export default Sidebar;
