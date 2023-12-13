// plugin
import React from "react";

const NavbarItem = ({ activeIndex, index, name, icon, onClick }) => {
  return (
    <div
      key={index}
      onClick={() => {
        onClick(index);
      }}
      className={`nav-item ${activeIndex === index ? "active" : ""}`}
    >
      <img className="nav-icon" alt="nav-icon" src={icon} />
      <p className="nav-label">{name}</p>
    </div>
  );
};

export default NavbarItem;
