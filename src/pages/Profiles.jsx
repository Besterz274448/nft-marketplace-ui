import React from "react";
import "../asset/main.css";
import Grid from "@mui/material/Grid";
import Accord from "../components/Accord";
import ArtistCard from "../components/ArtistCard";
import SelectBox from "../components/SelectBox";
import { NavLink } from "react-router-dom";

function Profiles({ users }) {
  console.log(users);
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
      <div className="feed-items">
        <Grid
          alignItems="center"
          justifyContent="center"
          rowGap={3}
          container
          spacing={2}
        >
          {users.map((data, index) => {
            return (
              <Grid key={data.id} item lg={4} md={6} sm={6} xs={11}>
                <NavLink to={`/user/${data.id}`} className="remove-css-navlink">
                  <ArtistCard user={data}/>
                </NavLink>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
}

export default Profiles;
