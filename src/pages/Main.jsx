import React from "react";
import NavBar from "../components/NavBar";
import Home from "../pages/Home";
import Feed from "../pages/Feed";
import ArtWork from "../pages/ArtWork";
import Profiles from "../pages/Profiles";
import "../asset/main.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Main() {
  return (
    <Router>
      <div>
        <NavBar />
        <section className="main-content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="feed/*" element={<Feed />} />
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default Main;
