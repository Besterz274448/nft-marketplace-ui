import React from "react";
import "../asset/main.css";
import ArtistContract from "../components/ArtistContract";
import ShareIcon from "@mui/icons-material/Share";

function ArtworkDetail({
  image_src = "https://thaipublica.org/wp-content/uploads/2013/06/edward-snowden.jpg",
  image_name = "Ring Lake Rose",
  image_description = "Digital 3D C4D Still Render By David Stenbeck @dovneon",
}) {
  return (
    <div className="artworkdetail-root ">
      <div className="artworkdetail-img">
        <img src={image_src} alt="artworks_image" />
      </div>
      <div className="artworkdetail-button-container flex">
        <ArtistContract />
        <button className="artworkdetail-share-button b">
          <ShareIcon />
          <span>Shared</span>
        </button>
      </div>
      <div className="artworkdetail-container flex">
        <div className="artworkdetail-half-container">
          <h1 className="artworkdetail-image-name">{image_name}</h1>
          <h6>Description</h6>
          <p>{image_description}</p>
        </div>
        <div className="artworkdetail-half-container">test</div>
      </div>
    </div>
  );
}

export default ArtworkDetail;
