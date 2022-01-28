import React from "react";
import ImageCard from "../components/ImageCard";
import LastedCreated from "../components/LastestSold";
import SectionBar from "../components/SectionBar";
import Grid from "@mui/material/Grid";

function Home({nfts = []}) {
  return (
    <div className="main-content">
      {nfts.length > 0 && <LastedCreated data={nfts[0]} />}
      <SectionBar title="All NFTS" link="/feed/artworks" name="artworks">
        <Grid
          alignItems="center"
          rowGap={3}
          container
          spacing={3}
        >
          {nfts.slice(1,13).map((data, index) => (  
            <Grid key={data.id} item lg={3} md={4} sm={6} xs={10}>
              <ImageCard
                id={data.id}
                contractID={data.owner}
                src={"https://ipfs.io/ipfs/" + data.cid}
                name={data.name}
                price={data.currentPrice}
                sellStatus={data.sellStatus}
                username={data.username}
                avatar={data.avatar}
              />
            </Grid>
          ))}
        </Grid>
      </SectionBar>
      {/* <SectionBar
        title="Collections"
        link="/feed/profiles"
        name="collections"
      ></SectionBar>
      <SectionBar
        title="Featured artworks"
        link="/feed/artworks"
        name="artworks"
      ></SectionBar> */}
    </div>
  );
}

export default Home;
