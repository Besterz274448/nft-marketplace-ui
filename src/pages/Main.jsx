import React from "react";
import NavBar from "../components/NavBar";
import Home from "../pages/Home";
import Feed from "../pages/Feed";
import UserProfile from "../pages/UserProfile";
import ArtworkDetail from "../pages/ArtworkDetail";
import CreateAsset from "../pages/CreateAsset";
import "../asset/main.css";
import { Routes, Route } from "react-router-dom";

function Main() {
  return (
    <div className="main-root">
      <NavBar />
      <section>
        <Routes>
          <Route exact="true" path="/" element={<Home />} />
          <Route path="feed/*" element={<Feed />} />
          <Route path="user/*" element={<UserProfile />} />
          <Route path="/artworks/:id" element={<ArtworkDetail />} />
          <Route exact path="/asset/create" element={<CreateAsset />} />
        </Routes>
      </section>
    </div>
  );
}

export default Main;
