import React from "react";
import ArtWork from "../pages/ArtWork";
import Profiles from "../pages/Profiles";
import MenuTabs from "../components/MenuTabs";
import "../asset/main.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Feed({}) {
  return (
      //get amount of data
    <div className="feed-content main-content">
      <MenuTabs sortComponent={<>TEST</>} />
      <Routes>
        <Route exact path="/artworks" element={<ArtWork/>} />
        <Route exact path="/profiles" element={<Profiles />} />
      </Routes>
    </div>
  );
}

export default Feed;
