import React from "react";
import "../asset/components.css";
import { NavLink } from "react-router-dom";

function SearchItem({ id, image, name, owner,username,handleClose={}}) {
  return (
    <NavLink to={`/artworks/${id}`} className="remove-css-navlink" onClick={handleClose}>
      <div className="flex searchItem-box">
        <div>
          <img src={image} alt="searchImage" width="100px" height="100px" />
        </div>
        <div className="searchItem-detail">
          <p className="searchItem-name">{name}</p>
          <p className="searchItem-owner">@{username}</p>
        </div>
      </div>
    </NavLink>
  );
}

export default SearchItem;
