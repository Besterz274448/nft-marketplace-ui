import React from "react";
import { NavLink } from "react-router-dom";
import "../asset/components.css";

function SectionBar(props) {
  return (
    <>
      <div className="section-bar">
        <div className="section-name">{props.title}</div>
        <div>
          <NavLink to={props.link} className="section-link">
            View all {props.name}
          </NavLink>
        </div>
      </div>
      <hr className="section-line" />
      <div className="section-content">{props.children}</div>
    </>
  );
}

export default SectionBar;
