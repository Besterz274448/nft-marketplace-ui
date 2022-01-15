import React from "react";
import ArtistContract from "./ArtistContract";
import "../asset/components.css";
import { NavLink } from "react-router-dom";

function ImageCard({
  id = "",
  src = "",
  name = "",
  price = 0.0,
  contractID = "",
  sellStatus = false,
  username="",
  avatar
}) {
  return (
    <div className="image-card-container">
      <NavLink to={`/artworks/${id}`} className="remove-css-navlink">
        <img className="image-card-img" src={src} alt="imgCard" />
      </NavLink>
      <div className="image-card-detail">
        <NavLink to={`/artworks/${id}`} className="remove-css-navlink">
          <span className="image-card-detail-img-name">{name}</span>
        </NavLink>
        <div>
          <ArtistContract avatar={avatar} contractID={contractID} username={username} border="none" />
        </div>
      </div>
      <div></div>
      <hr />
      <div className="image-card-price">
        <NavLink to={`/artworks/${id}`} className="remove-css-navlink">
          {sellStatus ? (
            <>
              <div>Reserve Price</div>
              <div>{price.toFixed(2)} ETH</div>
            </>
          ) : (
            <>
              <div>Not Available For Sale</div>
              <div>{price.toFixed(2)} ETH</div>
            </>
          )}
        </NavLink>
      </div>
    </div>
  );
}

export default ImageCard;
