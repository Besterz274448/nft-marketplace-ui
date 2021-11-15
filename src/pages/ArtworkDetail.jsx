import React from "react";
import "../asset/main.css";
import ArtistContract from "../components/ArtistContract";
import ShareIcon from "@mui/icons-material/Share";

function ArtworkDetail({
  background = "https://thaipublica.org/wp-content/uploads/2013/06/edward-snowden.jpg",
}) {
  return (
    <div className="artworkdetail-root ">
      <div className="artworkdetail-img">
        <img src={background} />
      </div>
      <div className="artworkdetail-button-container flex">
        <ArtistContract />
        <button className="artworkdetail-share-button b">
          <ShareIcon />
          <span>Shared</span>
        </button>
      </div>
      <div className="artworkdetail-container">
        <div className="artworkdetai-left-container">
          
        </div>
        <div className="artworkdetai-right-container"></div>
      </div>
    </div>
  );
}

export default ArtworkDetail;
