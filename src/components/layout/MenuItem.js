// plugin
import React from "react";

const MenuItem = ({ name, icon, index }) => {
  return (
    <div key={index} className="menu-item">
      <img src={icon} alt={name} />
      <p>{name}</p>
    </div>
  );
};

export default MenuItem;
