import React from "react";

function ButtonGray({ children, type = "button", className = "", ...props }) {
  return (
    <button
      type={type}
      className={`transition-all duration-200 h-10 px-3 rounded-md text-md font-medium bg-gray-700 text-gray-100 hover:bg-gray-600 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default ButtonGray;
