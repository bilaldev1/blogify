import React from "react";

function Container({ children, className = "" }) {
  return <div className={`w-[1140px] mx-auto px-2 ${className}`}>{children}</div>;
}

export default Container;
