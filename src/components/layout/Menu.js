// plugin
import React from "react";

// component
import MenuItem from "./MenuItem";

// assets
import main_menu_array from "../../assets/constants/MainMenu";

const Menu = () => {
  return (
    <div id="vnav" className="main-menu">
      <ul>
        {main_menu_array?.map((item, index) => (
          <MenuItem
            name={item?.name}
            icon={item?.icon}
            key={index}
            index={index}
          />
        ))}
      </ul>
    </div>
  );
};

export default Menu;
