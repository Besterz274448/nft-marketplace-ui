import React from "react";
import "../asset/components.css";
import Avatar from "@mui/material/Avatar";

function ArtistContract({ width, sx = {}, contract, border = "1px solid rgba(0,0,0,0.05)" }) {
  const ButtonStyle = {
    color: "rgba(0,0,0,0.6)",
    fontWeight: "bold",
    fontSize: "14px",
    backgroundColor: "white",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    padding: border == "none" ? "5px 0px" : "10px 10px",
    ...sx,
  };
  return (
    <div>
      <button className={border == "none" ? "" : "button"} style={ButtonStyle}>
        <span style={{ display: "inline-block" }}>
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 24, height: 24 }}
          />
        </span>
        <span> @userContract</span>
      </button>
    </div>
  );
}

export default ArtistContract;
