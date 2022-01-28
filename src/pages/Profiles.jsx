import React from "react";
import "../asset/main.css";
import Grid from "@mui/material/Grid";
import Accord from "../components/Accord";
import ArtistCard from "../components/ArtistCard";
import SelectBox from "../components/SelectBox";
import { NavLink } from "react-router-dom";

function Profiles({ users }) {
  return (
    <div className="feed-items" style={{marginTop:24}}>
      <Grid rowGap={3} container spacing={2}>
        {users.map((data, index) => {
          return (
            <Grid key={data.id} item lg={3} md={6} sm={6} xs={11}>
              <NavLink to={`/user/${data.id}`} className="remove-css-navlink">
                <ArtistCard user={data} />
              </NavLink>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default Profiles;
