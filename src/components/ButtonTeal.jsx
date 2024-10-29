import React from "react";

function ButtonTeal({ children, type = "button", className = "", ...props }) {
  return (
    <button
      type={type}
      className={`transition-all duration-200 h-10 px-3 rounded-md text-md font-medium bg-teal-600 text-gray-100 hover:bg-teal-700 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default ButtonTeal;
