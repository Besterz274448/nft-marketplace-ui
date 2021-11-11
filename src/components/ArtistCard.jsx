import React from "react";
import "../asset/components.css";

function ArtistCard({
  src = "",
  name = "Edward Snowden",
  contract = "Snowden",
  artistDescription = "I used to work for the government. Now I work for the public. President, Freedom of the Press Foundation",
}) {
  return (
    <div className="image-card-container">
      <div className="artist-card-container">
        <img className="artist-card-img" src={src} alt="imgCard"></img>
      </div>
      <div className="artist-detail-container">
        <div className="artist-detail-avatar-box">
            <div><img src={src}/></div>
        </div>
        <div className="artist-detail-name b">{name}</div>
        <div className="artist-detail-contract b">
          <span>@</span>
          <span>{contract}</span>
        </div>
        <div className="artist-detail-description">{artistDescription.length > 120 ? artistDescription.substring(0,120) + "..." : artistDescription }</div>
      </div>
    </div>
  );
}

export default ArtistCard;
