import React from "react";
import "../asset/main.css";
import Grid from "@mui/material/Grid";
import ImageCard from "../components/ImageCard";
import Accord from "../components/Accord";
import RadioGroupButton from "../components/RadioGroupButton";
import PriceRange from "../components/PriceRange";

function ArtWork({ nfts = [] }) {
  var option = ["All", "Available for Sale"];
  const [rangeOfprice,setRange] = React.useState([0,0]);
  const [availability,setAvailability] = React.useState("All");
  return (
    <div className="feed-items-container">
      <div className="feed-search">
        <Accord title="Price range">
          <PriceRange />
        </Accord>
        <Accord title="Availability">
          <RadioGroupButton title="Availability" option={option} />
        </Accord>
      </div>
      <div className="feed-items">
        <Grid
          alignItems="center"
          rowGap={3}
          container
          spacing={2}
        >
          {nfts.map((data, index) => (
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
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default ArtWork;
