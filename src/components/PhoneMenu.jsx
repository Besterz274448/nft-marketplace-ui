import * as React from "react";
import "../asset/components.css";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
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
          zIndex:150,
          position:"relative",
        }}
      />
      <Dialog fullScreen open={openMenu} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative", background: props.color }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {props.name}
            </Typography>
            <Button //menu Phone
              onClick={handleClose}
              width="fit-content"
              name="✖"
              sx={{
                padding: "16px 20px",
                color: "black",
                background: "white",
              }}
            />
          </Toolbar>
        </AppBar>
        {props.children}
      </Dialog>
    </>
  );
}
