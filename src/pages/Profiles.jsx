import React from "react";
import "../asset/main.css";
import Grid from "@mui/material/Grid";
import Accord from "../components/Accord";
import PriceRange from "../components/PriceRange";

function Profiles() {
  var option = ["All", "Sold", "Available"];
  return (
    <div className="feed-items-container">
      <div className="feed-search">
        <Accord title="Price range">
          <PriceRange/>
        </Accord>
        <Accord title="Social Verification">
        </Accord>
      </div>
      <div className="feed-items">
      
      </div>
    </div>
  );
}

export default Profiles;
