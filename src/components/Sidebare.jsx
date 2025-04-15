import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo1 from "../assets/proxym_logo.png";
import logo from "../assets/proxym_log.png";
import profile_img from '../assets/Male Avatar 03.png';
import { useLocation } from "react-router-dom";


function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  // Load activeIndex from localStorage or default to "menu1-0"
  const [activeIndex, setActiveIndex] = useState(() => {
    return localStorage.getItem("activeMenuIndex") || "menu1-0";
  });
  localStorage.removeItem("activeMenuIndex");

  useEffect(() => {
    localStorage.setItem("activeMenuIndex", activeIndex);
  }, [activeIndex]);

  const menuItems1 = [
    { icon: <i className="icon-dashboard"></i>, label: "Dashboard", path: "/" },
    { icon: <i className="icon-account_icon"></i>, label: "Account", path: "/Accounts" },
    { icon: <i className="icon-card_icon"></i>, label: "Card", path: "/Cards" },
    { icon: <i className="icon-transaction_icon"></i>, label: "Transactions", path: "/Transactions" },
    { icon: <i className="icon-statement_icon"></i>, label: "Statement", path: "/Statements" },
  ];

  const menuItems2 = [
    { icon: <i className="icon-settings_icon"></i>, label: "Settings", path: "/Settings" },
    { icon: <i className="icon-info_icon"></i>, label: "About", path: "/About" },
  ];

  const user = { image: profile_img, name: "Moktar BOUATAY" };
  const location = useLocation(); 


  return (
    <div
      className={`h-screen bg-white border-r shadow-lg flex flex-col justify-between 
        transition-all duration-300 ease-in-out ${isExpanded ? "w-56" : "w-20"}`}
    >
      {/* Logo */}
      <div
        className="flex items-center justify-center py-2 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <img
          src={isExpanded ? logo1 : logo}
          alt="Logo"
          className={`transition-all duration-300 ease-in-out ${isExpanded ? "w-44 h-11 ml-3" : "h-14"}`}
        />
      </div>
      <hr className="w-full border-gray-300" />

      {/* Menu Items */}
      <div className="flex flex-col flex-grow">
        <div className={`flex flex-col items-center space-y-1 mt-2 ${isExpanded ? "mx-3" : "mr-3 ml-3"}`}>
          {menuItems1.map((item, index) => (
            <Link
              to={item.path}
              key={`menu1-${index}`}
              onClick={() => setActiveIndex(`menu1-${index}`)}
              className={`flex items-center w-full px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 
                ${location.pathname === item.path
                  ? "bg-indigo-500 text-white" : "text-gray-700 hover:bg-gray-100"}`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span
                className={`ml-4 transition-all duration-300 ease-in-out ${
                  isExpanded ? "opacity-100" : "opacity-0"
                }`}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </div>
        <hr className="w-full my-2 border-gray-300" />
        <div className={`flex flex-col items-center space-y-1 ${isExpanded ? "mx-3 mt-2" : "mr-3 ml-3 "}`}>
          {menuItems2.map((item, index) => (
            <Link
              to={item.path}
              key={`menu2-${index}`}
              onClick={() => setActiveIndex(`menu2-${index}`)}
              className={`flex items-center w-full px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 
                ${activeIndex === `menu2-${index}` ? "bg-indigo-500 text-white" : "text-gray-700 hover:bg-gray-100"}`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span
                className={`ml-4 transition-all duration-300 ease-in-out ${
                  isExpanded ? "opacity-100" : "opacity-0"
                }`}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Profil en bas */}
      <div className="flex items-center p-3 pl-5 space-x-2 border-t border-gray-300">
        <img src={user.image} alt="Profile" className="w-10 h-10 rounded-full" />
        <span
          className={`text-gray-700 transition-all duration-300 ease-in-out ${
            isExpanded ? "opacity-100" : "opacity-0"
          }`}
        >
          {user.name}
        </span>
      </div>
    </div>
  );
}

export default Sidebar;
