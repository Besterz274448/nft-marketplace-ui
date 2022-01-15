import React from "react";
import Divider from "@mui/material/Divider";
import "../asset/components.css";

function MenuTabs({
  menu = [
    { name: "Profiles", to: "/feed/profiles", count: 0 },
    { name: "Artworks", to: "/feed/artworks", count: 0 },
  ],
  selectedTabs=0,
  handleTabs=()=>{},
  sortComponent = <></>,
}) {
  return (
    <>
      <div className="menuTabs-root flex">
        <div className="menuTabs-tabs-container flex">
          {menu.map((data, index) => {
            let key = "menu" + data.name + index;
            let selectedClass = selectedTabs === index ? "selectedTabs" : "";
            return (
              <div key={key} style={{marginRight:"10px"}} onClick={()=>{
                handleTabs(index);
              }} className={`menuTabs-tab flex ${selectedClass}`}>
                <div className="menuTabs-tab-name">{data.name}</div>
                <div className="menuTabs-tab-count">
                  {data.count
                    .toFixed(0)
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                </div>
              </div>
            );
          })}
        </div>
        <div>{sortComponent}sort unavailable</div>
      </div>
      <Divider />
    </>
  );
}

export default MenuTabs;
