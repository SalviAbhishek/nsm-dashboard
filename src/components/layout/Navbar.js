// plugin
import React, { useState } from "react";

// assets
import Amblem from "../../assets/icons/amblem.svg";
import Avatar from "../../assets/icons/avatar.svg";
import nav_items from "../../assets/constants/NavItems";

// components
import NavbarItem from "./NavbarItem";

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(2);
  return (
    <nav className="nav">
      <div>
        <div className="nav-item">
          <img src={Amblem} alt="Amblem" />
          <p className="nav-label">Transaction</p>
        </div>
        {nav_items?.map((item, index) => (
          <NavbarItem
            key={index}
            activeIndex={activeIndex}
            index={index}
            name={item?.name}
            icon={item?.icon}
            onClick={(propIndex) => {
              setActiveIndex(propIndex);
            }}
          />
        ))}
        <div className="nav-item avatar">
          <img src={Avatar} alt="Avatar" />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
