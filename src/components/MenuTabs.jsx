import React from "react";
import Divider from "@mui/material/Divider";
import "../asset/components.css";
import { NavLink } from "react-router-dom";

function MenuTabs({
  menu = [
    { name: "Profiles", to: "/feed/profiles", count: 50000 },
    { name: "Artworks", to: "/feed/artworks", count: 500 },
  ],
  sortComponent = <></>,
}) {

  return (
    <>
      <div className="menuTabs-root flex">
        <div className="menuTabs-tabs-container flex">
          {menu.map((data, index) => {
            let key = "menu" + data.name + index;
            return (
              <NavLink
                exact
                to={data.to}
                key={key}
                className={(isActive) => {
                  return "navlink " + (isActive.isActive ? "active-link" : "");
                }}>
                <div className="menuTabs-tab flex">
                  <div className="menuTabs-tab-name">{data.name}</div>
                  <div className="menuTabs-tab-count">
                    {data.count.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                  </div>
                </div>
              </NavLink>
            );
          })}
        </div>
        <div>{sortComponent}</div>
      </div>
      <Divider />
    </>
  );
}

export default MenuTabs;
