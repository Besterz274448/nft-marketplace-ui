import React from "react";
import ArtistContract from "./ArtistContract";
import "../asset/components.css";
import { NavLink } from "react-router-dom";

function ImageCard({ src = "", name = "", price = 0.0, contract = "" }) {
  return (
    <div className="image-card-container">
      <NavLink to="/artworks/test" className="remove-css-navlink">
        <img className="image-card-img" src={src} alt="imgCard" />
      </NavLink>
      <div className="image-card-detail">
        <NavLink to="/artworks/test" className="remove-css-navlink">
          <span className="image-card-detail-img-name">{name}</span>
        </NavLink>
        <div>
          <ArtistContract border="none" />
        </div>
      </div>
      <div></div>
      <hr />
      <div className="image-card-price">
        <NavLink to="/artworks/test" className="remove-css-navlink">
          <div>Reserve Price</div>
          <div>{price.toFixed(2)} ETH</div>
        </NavLink>
      </div>
    </div>
  );
}

export default ImageCard;
