import React from "react";
import "../asset/main.css";
import Grid from "@mui/material/Grid";
import ImageCard from "../components/ImageCard";
import Accord from "../components/Accord";
import RadioGroupButton from "../components/RadioGroupButton";
import PriceRange from "../components/PriceRange";

function ArtWork({ nfts = [] }) {
  var option = ["All", "Available for Sale"];
  const [rangeOfprice, setRange] = React.useState([0.0, 0.0]);
  const [availability, setAvailability] = React.useState("All");

  const handleRadioChange = (event) => {
    setAvailability(event.target.value);
  };

  const handlePrice = (e) => {
    e.preventDefault();
    const min = e.target[0].value;
    const max = e.target[1].value;
    setRange([min, max]);
    
  };

  const getData = (items) => {
    const min = rangeOfprice[0];
    const max = rangeOfprice[1];
    let filterItem = [];
    if ((min === 0 && max === 0) || min > max) {
      filterItem = items;
    } else {
      filterItem = items.filter(
        (data) => data.currentPrice >= min && data.currentPrice <= max
      );
    }

    if (availability === "Available for Sale") {
      return filterItem.filter((data) => data.sellStatus === true);
    } else {
      return filterItem;
    }
  };

  return (
    <div className="feed-items-container">
      <div className="feed-search">
        <Accord title="Price range">
          <PriceRange handlePrice={handlePrice} />
        </Accord>
        <Accord title="Availability">
          <RadioGroupButton
            title="Availability"
            option={option}
            onChange={handleRadioChange}
          />
        </Accord>
      </div>
      <div className="feed-items">
        <Grid alignItems="center" rowGap={3} container spacing={2}>
          {getData(nfts).map((data, index) => {
            return (
              <Grid key={data.id} item lg={4} md={4} sm={6} xs={10}>
                <ImageCard
                  id={data.id}
                  contractID={data.owner}
                  src={"https://ipfs.io/ipfs/" + data.cid}
                  name={data.name}
                  price={data.currentPrice}
                  sellStatus={data.sellStatus}
                  username={data.username}
                  avatar={data.avatar}
                  description={data.description}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
}

export default ArtWork;
