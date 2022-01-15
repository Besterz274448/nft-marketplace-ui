import React from "react";
import Grid from "@mui/material/Grid";
import ImageCard from "./ImageCard";

function UserItem({ nfts }) {
  return (
    <div>
      <Grid rowGap={3} container spacing={2}>
        {nfts.map((data, index) => (
          <Grid key={data.id} item lg={4} md={6} sm={6} xs={11}>
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
    </div>
  );
}

export default UserItem;
