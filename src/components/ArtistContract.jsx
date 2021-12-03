import React from "react";
import "../asset/components.css";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

function ArtistContract({
  width,
  sx = {},
  contract,
  border = "1px solid rgba(0,0,0,0.05)",
  classes = "",
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
      <button
        className={border === "none" ? "contract-button" : "button contract-button"}
        style={ButtonStyle}>
        <span style={{ display: "inline-block" }}>
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 24, height: 24 }}
          />
        </span>
        <span>@userContract</span>
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
    </div>
  );
}

export default ArtistContract;
