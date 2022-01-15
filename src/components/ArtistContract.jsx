import React from "react";
import "../asset/components.css";
import Avatar from "@mui/material/Avatar";

import { NavLink } from "react-router-dom";

function ArtistContract({
  width,
  sx = {},
  border = "1px solid rgba(0,0,0,0.05)",
  classes = "",
  contractID = "",
  username = "",
  avatar,
}) {
 

  const ButtonStyle = {
    color: "rgba(0,0,0,0.6)",
    fontWeight: "bold",
    fontSize: "14px",
    backgroundColor: "white",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    padding: border === "none" ? "5px 0px" : "10px 10px",
    ...sx,
  };
  return (
    <div className="contract-container">
      <NavLink to={`/user/${contractID}`} className="remove-css-navlink">
        <button
          className={
            border === "none" ? "contract-button" : "button contract-button"
          }
          style={ButtonStyle}
        >
          <div style={{ display: "flex",alignItems:"center", paddingRight: "6px" }}>
            <Avatar
              alt={username.toUpperCase()}
              src={
                avatar !== undefined ? avatar : "/static/images/avatar/1.jpg"
              }
              sx={{ width: 24, height: 24 }}
            />
            <span>@{username}</span>
          </div>
        </button>
        {/* <div className="contract-detail">
        <div className="flex">
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 24, height: 24 }}
          />
        </div>
        <h1></h1>
      </div> */}
      </NavLink>
    </div>
  );
}

export default ArtistContract;
