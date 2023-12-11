import React from "react";

const Template = ({ children, className }) => {
  return (
    <div
      className={
        ` w-[70vh] mx-auto h-[100vh] bg-img  ${className}`
        // px-4 py-3
      }
    >
      {children}
    </div>
  );
};

export default Template;
