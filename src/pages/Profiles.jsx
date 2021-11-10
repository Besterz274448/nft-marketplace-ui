import React from "react";
import "../asset/main.css";
import Grid from "@mui/material/Grid";
import Accord from "../components/Accord";
import PriceRange from "../components/PriceRange";
import SelectBox from "../components/SelectBox";

function Profiles() {
  var sc_options = ["All", "Sold", "Available"];
  return (
    <div className="feed-items-container">
      <div className="feed-search">
        <Accord title="Type">
          <SelectBox option={sc_options} />
        </Accord>
        <Accord title="Social Verification">
          <SelectBox option={sc_options} />
        </Accord>
      </div>
      <div className="feed-items"></div>
    </div>
  );
}

export default Profiles;
