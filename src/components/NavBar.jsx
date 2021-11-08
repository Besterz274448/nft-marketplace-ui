import React from "react";
import "../asset/navbar.css";
import Button from "./Button";
import Box from "@mui/material/Box";

function NavBar() {
  const [selectInput, setSelect] = React.useState(false);

  return (
    <div className="navbar-root">
      <div className="navbar-logo">
        <img
          height="55px"
          src="data:image/png;base64,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"
          alt="logo"
        />
      </div>
      <div className="navbar-searchfield-container">
        <div className="navbar-searchfield">
          <i className="fa fa-search searchInputIcon"></i>
          <input
            placeholder="Search Artwork"
            className="navbar-input"
            onClick={() => {
              setSelect(true);
            }}
            onKeyDown={(e) => {
              if (e.code === "Escape") {
                setSelect(false);
              }
            }}
          />
        </div>
      </div>
      <div className="navbar-button">
        <Button width="80%" name="Connect Wallet" />
      </div>
      <div
        className="Backdrop"
        onClick={() => {
          setSelect(false);
        }}
        style={selectInput ? { opacity: 1, visibility: "visible" } : {}}></div>
      <div className="inputTag" style={selectInput ? { opacity: 1, visibility: "visible" } : {}}>
        <div className="keywordSearch">
          <span className="keywordSearch-header">tags</span>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
