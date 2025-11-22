import React from "react";
import logo from "../assets/logo.png";

export default function TopBar() {
  return (
    <div className="w-full h-20 bg-black flex items-center px-6 border-b border-gray-800">
      <img src={logo} alt="Kaviar Logo" className="h-16" />
    </div>
  );
}
