import React from "react";
import "../asset/main.css";
import Grid from "@mui/material/Grid";
import ImageCard from "../components/ImageCard";
import Accord from "../components/Accord";

function ArtWork() {
  var option = ["All", "Sold", "Available"];
  return (
    <div className="feed-items-container">
      <div className="feed-search">
        <Accord title="title" option={option} select={false}></Accord>
      </div>
      <div className="feed-items">
        <Grid alignItems="center" justifyContent="center" rowGap={3} container spacing={2}>
          <Grid item lg={4} md={6} sm={6} xs={11}>
            <ImageCard
              src={"https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000)}
              name="BearCollection(1999-2004)-ULTRA-RARE-TyBB"
              contract="moisesdsanabria"
              price={1.0}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={11}>
            <ImageCard
              src={"https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000)}
              name="BearCollection(1999-2004)-ULTRA-RARE-TyBB"
              contract="moisesdsanabria"
              price={1.0}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={11}>
            <ImageCard
              src={"https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000)}
              name="BearCollection(1999-2004)-ULTRA-RARE-TyBB"
              contract="moisesdsanabria"
              price={1.0}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={11}>
            <ImageCard
              src={"https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000)}
              name="BearCollection(1999-2004)-ULTRA-RARE-TyBB"
              contract="moisesdsanabria"
              price={1.0}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={11}>
            <ImageCard
              src={"https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000)}
              name="BearCollection(1999-2004)-ULTRA-RARE-TyBB"
              contract="moisesdsanabria"
              price={1.0}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={11}>
            <ImageCard
              src={"https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000)}
              name="BearCollection(1999-2004)-ULTRA-RARE-TyBB"
              contract="moisesdsanabria"
              price={1.0}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={11}>
            <ImageCard
              src={"https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000)}
              name="BearCollection(1999-2004)-ULTRA-RARE-TyBB"
              contract="moisesdsanabria"
              price={1.0}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={11}>
            <ImageCard
              src={"https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000)}
              name="BearCollection(1999-2004)-ULTRA-RARE-TyBB"
              contract="moisesdsanabria"
              price={1.0}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={11}>
            <ImageCard
              src={"https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000)}
              name="BearCollection(1999-2004)-ULTRA-RARE-TyBB"
              contract="moisesdsanabria"
              price={1.0}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={11}>
            <ImageCard
              src={"https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000)}
              name="BearCollection(1999-2004)-ULTRA-RARE-TyBB"
              contract="moisesdsanabria"
              price={1.0}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={11}>
            <ImageCard
              src={"https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000)}
              name="BearCollection(1999-2004)-ULTRA-RARE-TyBB"
              contract="moisesdsanabria"
              price={1.0}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={11}>
            <ImageCard
              src={"https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000)}
              name="BearCollection(1999-2004)-ULTRA-RARE-TyBB"
              contract="moisesdsanabria"
              price={1.0}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default ArtWork;
