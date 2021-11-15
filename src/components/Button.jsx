import React from "react";
import "../asset/components.css";

function Button({ name, width = "70%", sx = {}, onClick = () => {} }) {
  const ButtonStyle = {
    color: "white",
    fontWeight: "bold",
    fontSize: "17px",
    backgroundColor: "black",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    padding: "14px 0px",
    width: width,
    ...sx,
  };
  return (
    <button className="button" onClick={onClick} style={ButtonStyle}>
      {name}
    </button>
  );
}

export default Button;
