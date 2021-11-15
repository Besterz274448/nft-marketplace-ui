import React from "react";
import ImageCard from "../components/ImageCard";
import LastestBuy from "../components/LastestSold";
import SectionBar from "../components/SectionBar";
import Grid from "@mui/material/Grid";

function Home() {
  return (
    <div className="main-content">
      <LastestBuy src={"https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000)}/>
      <SectionBar title="Trending auctions" link="/feed/artworks" name="artworks" >
        <Grid alignItems="center" justifyContent="center" rowGap={3} container spacing={3}>
          <Grid item lg={3} md={4} sm={6} xs={10}>
            <ImageCard
              src={"https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000)}
              name="BearCollection(1999-2004)-ULTRA-RARE-TyBB"
              contract="moisesdsanabria"
              price={1.0}
            />
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={10}>
            <ImageCard
              src={"https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000)}
              name="BearCollection(1999-2004)-ULTRA-RARE-TyBB"
              contract="moisesdsanabria"
              price={1.0}
            />
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={10}>
            <ImageCard
              src={"https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000)}
              name="BearCollection(1999-2004)-ULTRA-RARE-TyBB"
              contract="moisesdsanabria"
              price={1.0}
            />
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={10}>
            <ImageCard
              src={"https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000)}
              name="BearCollection(1999-2004)-ULTRA-RARE-TyBB"
              contract="moisesdsanabria"
              price={1.0}
            />
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={10}>
            <ImageCard
              src={"https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000)}
              name="BearCollection(1999-2004)-ULTRA-RARE-TyBB"
              contract="moisesdsanabria"
              price={1.0}
            />
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={10}>
            <ImageCard
              src={"https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000)}
              name="BearCollection(1999-2004)-ULTRA-RARE-TyBB"
              contract="moisesdsanabria"
              price={1.0}
            />
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={10}>
            <ImageCard
              src={"https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000)}
              name="BearCollection(1999-2004)-ULTRA-RARE-TyBB"
              contract="moisesdsanabria"
              price={1.0}
            />
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={10}>
            <ImageCard
              src={"https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000)}
              name="BearCollection(1999-2004)-ULTRA-RARE-TyBB"
              contract="moisesdsanabria"
              price={1.0}
            />
          </Grid>
        </Grid>
      </SectionBar>
      <SectionBar title="Collections" link="/feed/profiles" name="collections">
        <Grid alignItems="center" justifyContent="center" container spacing={3}>
          <Grid item lg={3} md={4} sm={6} xs={10}>
            <ImageCard
              src={"https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000)}
              name="BearCollection(1999-2004)-ULTRA-RARE-TyBB"
              contract="moisesdsanabria"
              price={1.0}
            />
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={10}>
            <ImageCard
              src={"https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000)}
              name="BearCollection(1999-2004)-ULTRA-RARE-TyBB"
              contract="moisesdsanabria"
              price={1.0}
            />
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={10}>
            <ImageCard
              src={"https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000)}
              name="BearCollection(1999-2004)-ULTRA-RARE-TyBB"
              contract="moisesdsanabria"
              price={1.0}
            />
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={10}>
            <ImageCard
              src={"https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000)}
              name="BearCollection(1999-2004)-ULTRA-RARE-TyBB"
              contract="moisesdsanabria"
              price={1.0}
            />
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={10}>
            <ImageCard
              src={"https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000)}
              name="BearCollection(1999-2004)-ULTRA-RARE-TyBB"
              contract="moisesdsanabria"
              price={1.0}
            />
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={10}>
            <ImageCard
              src={"https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000)}
              name="BearCollection(1999-2004)-ULTRA-RARE-TyBB"
              contract="moisesdsanabria"
              price={1.0}
            />
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={10}>
            <ImageCard
              src={"https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000)}
              name="BearCollection(1999-2004)-ULTRA-RARE-TyBB"
              contract="moisesdsanabria"
              price={1.0}
            />
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={10}>
            <ImageCard
              src={"https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000)}
              name="BearCollection(1999-2004)-ULTRA-RARE-TyBB"
              contract="moisesdsanabria"
              price={1.0}
            />
          </Grid>
        </Grid>
      </SectionBar>
      <SectionBar title="Featured artworks" link="/feed/artworks" name="artworks">
        <Grid alignItems="center" justifyContent="center" container spacing={3}>
          <Grid item lg={3} md={4} sm={6} xs={10}>
            <ImageCard
              src={"https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000)}
              name="BearCollection(1999-2004)-ULTRA-RARE-TyBB"
              contract="moisesdsanabria"
              price={1.0}
            />
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={10}>
            <ImageCard
              src={"https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000)}
              name="BearCollection(1999-2004)-ULTRA-RARE-TyBB"
              contract="moisesdsanabria"
              price={1.0}
            />
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={10}>
            <ImageCard
              src={"https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000)}
              name="BearCollection(1999-2004)-ULTRA-RARE-TyBB"
              contract="moisesdsanabria"
              price={1.0}
            />
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={10}>
            <ImageCard
              src={"https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000)}
              name="BearCollection(1999-2004)-ULTRA-RARE-TyBB"
              contract="moisesdsanabria"
              price={1.0}
            />
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={10}>
            <ImageCard
              src={"https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000)}
              name="BearCollection(1999-2004)-ULTRA-RARE-TyBB"
              contract="moisesdsanabria"
              price={1.0}
            />
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={10}>
            <ImageCard
              src={"https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000)}
              name="BearCollection(1999-2004)-ULTRA-RARE-TyBB"
              contract="moisesdsanabria"
              price={1.0}
            />
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={10}>
            <ImageCard
              src={"https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000)}
              name="BearCollection(1999-2004)-ULTRA-RARE-TyBB"
              contract="moisesdsanabria"
              price={1.0}
            />
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={10}>
            <ImageCard
              src={"https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000)}
              name="BearCollection(1999-2004)-ULTRA-RARE-TyBB"
              contract="moisesdsanabria"
              price={1.0}
            />
          </Grid>
        </Grid>
      </SectionBar>
    </div>
  );
}

export default Home;
