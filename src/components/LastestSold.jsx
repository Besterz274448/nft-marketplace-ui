import { Grid } from "@mui/material";
import React from "react";
import "../asset/components.css";
import { Divider } from "@mui/material";
import Button from "./Button";
import ArtistContract from "./ArtistContract";

function LastestSold({ src = "", imageDetail }) {
  return (
    <div className="lastestsold-container">
      <Grid container alignItems="center" justifyContent="center" spacing={6}>
        <Grid item xs={12} lg={6}>
          <img className="lastestsold-img" src={src}></img>
        </Grid>
        <Grid item xs={12} lg={6}>
          <div className="lastestsold-detail">
            <div><ArtistContract/></div>
            <div>
              <p className="lastestsold-img-name">Giacomo in Venise</p>
            </div>
            <div className="lastestsold-detail-price">
              <div className="lastestsold-price">
                <h4>Price</h4>
                <h1>0.25 ETH</h1>
                <h4>$1,184.25</h4>
              </div>
              <div>
                <Divider orientation="vertical" />
              </div>
              <div className="lastestsold-new-owner">
                <h4>New Owner</h4>
                <h1>@newuser</h1>
                <h4>{Date.now()}</h4>
              </div>
            </div>
            <Button name="View artwork"/>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default LastestSold;
