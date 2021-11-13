import * as React from "react";
import "../asset/components.css";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Button from "./Button";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});
export default function MiniMunu(props) {
  const [openMenu, setOpenMunu] = React.useState(false);

  const handleClickOpen = () => {
    setOpenMunu(true);
  };

  const handleClose = () => {
    setOpenMunu(false);
  };

  return (
    <>
      <Button //menu Phone
        onClick={handleClickOpen}
        width="fit-content"
        name="☰"
        sx={{
          padding: "16px 20px",
          marginRight: "10px",
          color: "black",
          background: "white",
        }}
      />
      <Dialog
        fullScreen
        open={openMenu}
        onClose={handleClose}
        TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              App
            </Typography>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Dialog>
    </>
  );
}
