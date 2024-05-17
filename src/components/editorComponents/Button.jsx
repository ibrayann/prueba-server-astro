import React from "react";

const Button = ({ children, type = "button", ...props }) => {
  return (
    <button
      className="py-1 px-2 lg:border-l border-gray-500 hover:bg-gray-500 hover:text-white transition duration-300 ease-in-out"
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
