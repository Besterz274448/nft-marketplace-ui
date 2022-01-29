import React from "react";
import "../asset/components.css";

function ArtistCard({user}) {

  return (
    <div className="image-card-container">
      <div className="artist-card-container">
        <img className="artist-card-img" src="https://image.freepik.com/free-vector/gradient-isometric-nft-concept_52683-62009.jpg" alt="artistCardImage"></img>
      </div>
      <div className="artist-detail-container">
        <div className="artist-detail-avatar-box">
          <div>
            <img src={user.avatar ? user.avatar : "https://documents.dickson-constant.com/medias/images/catalogue/api/m654-grey-680.jpg"} alt="artistCardAvatar" />
          </div>
        </div>
        <div>
          <span className="artist-detail-contract b">@{user.username}</span>
        </div>
        <div className="artist-detail-description">
          {user.description?.length > 120
            ? user.description.substring(0, 120) + "..."
            : user.description}
        </div>
      </div>
    </div>
  );
}

export default ArtistCard;
