import React, { useState } from "react";

const Navbar = ({ children }) => {
  const [toggle, setToggle] = useState(false);

  const handleClose = () => setToggle(false)

  return (
    <nav className="bg-green-500 text-white px-8 md:px-25 py-4 flex justify-between items-center relative border-4 border-green-500 z-1">
      
      {/* Logo */}
      <div className="text-xl font-bold">
        Ecommerce-Project
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-6 items-center">
        {children}
      </div>

      {/* Mobile Toggle */}
      <button onClick={() => setToggle(!toggle)} className="md:hidden">
        {toggle ? "X" : "☰"}
      </button>

      {/* Mobile Menu */}
      {toggle && (
        <div className="absolute top-15 left-0 w-full bg-green-500 flex flex-col items-center gap-4 py-4 md:hidden">
          {Array.isArray(children)
    ? children.map((child, index) =>
        React.cloneElement(child, {
          key: index,
          onClick: handleClose,
        })
      )
    : React.cloneElement(children, {
        onClick: handleClose,
      })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;