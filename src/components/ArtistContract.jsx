import React from "react";
import "../asset/components.css";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

function ArtistContract({ width, sx = {}, contract, border = "1px solid rgba(0,0,0,0.05)",classes="" }) {
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
    <div className={classes}>
      <button className={border === "none" ? "" : "button"} style={ButtonStyle} onClick={handleClick}>
        <span style={{ display: "inline-block" }}>
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 24, height: 24 }}
          />
        </span>
        <span>@userContract</span>
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}>
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
    </div>
  );
}

export default ArtistContract;
