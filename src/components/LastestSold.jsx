import { Grid } from "@mui/material";
import React from "react";
import "../asset/components.css";
import Button from "./Button";
import ArtistContract from "./ArtistContract";
import {useNavigate} from 'react-router-dom';

function LastestSold({ data }) {
  const navigate = useNavigate();
  const handlePageArtWork = ()=>{
    navigate('/feed/artworks');
  }
  return (
    <div className="lastestsold-container">
      <Grid container alignItems="center" justifyContent="center" spacing={6}>
        <Grid item xs={12} lg={6}>
          <img
            className="lastestsold-img"
            alt="lastestSold"
            src={`https://ipfs.io/ipfs/${data.cid}`}
          ></img>
        </Grid>
        <Grid item xs={12} lg={6}>
          <div className="lastestsold-detail">
            <div>
              <p className="lastestsold-img-name" style={{color:"rgba(180,180,180,1)"}}>NEWEST NFT</p>
            </div>
            <div>
              <h1>{data.name}</h1>
            </div>
            <div style={{marginBottom:"20px"}}>
              <ArtistContract avatar={data.avatar} username={data.username} contractID={data.owner}/>
            </div>
            <Button onClick={handlePageArtWork}name="View artwork" />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default LastestSold;
