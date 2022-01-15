import React from "react";
import ArtWork from "../pages/ArtWork";
import Profiles from "../pages/Profiles";
import MenuTabs from "../components/MenuTabs";
import "../asset/main.css";
import { Routes, Route } from "react-router-dom";

function Feed({ nfts, users }) {
  return (
    //get amount of data
    <div className="feed-content main-content">
      <MenuTabs
        menu={[
          { name: "Profiles", to: "/feed/profiles", count:users.length },
          { name: "Artworks", to: "/feed/artworks", count: nfts.length },
        ]}
        sortComponent={<>TEST</>}
      />
      <Routes>
        <Route
          exact="true"
          path="/artworks"
          element={<ArtWork nfts={nfts} />}
        />
        <Route
          exact="true"
          path="/profiles"
          element={<Profiles users={users} />}
        />
      </Routes>
    </div>
  );
}

export default Feed;
