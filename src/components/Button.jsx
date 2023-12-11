import React from "react";

const Button = ({ children, onClick }) => {
  return (
    <li className="hover:text-orange-500 cursor-pointer" onClick={onClick}>
      {children}
    </li>
  );
};

export default Button;
