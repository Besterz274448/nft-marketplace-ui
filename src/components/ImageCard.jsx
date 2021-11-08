import React from "react";
import "../asset/components.css";

function ImageCard({ src = "", name = "", price = 0.00, contract = "" }) {
  return (
    <div className="image-card-container">
      <img className="image-card-img" src={src} alt="imgCard"></img>
      <div className="image-card-detail">
          <span>{name}</span>
          <div>@{contract}</div>
      </div>
      <div>
      </div>
      <hr/>
      <div className="image-card-price">
          <div>Reserve Price</div>
          <div>{price.toFixed(2)} ETH</div>
      </div>
    </div>
  );
}

export default ImageCard;
