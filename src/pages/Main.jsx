import React from "react";
import NavBar from "../components/NavBar";
import Home from "../pages/Home";
import Feed from "../pages/Feed";
import UserProfile from "../pages/UserProfile";
import ArtworkDetail from "../pages/ArtworkDetail";
import CreateAsset from "../pages/CreateAsset";
import "../asset/main.css";
import { Routes, Route } from "react-router-dom";

const LS_KEY = "login-with-metamask:auth";

function Main() {
  const [state, setState] = React.useState(undefined);

  React.useEffect(() => {
    // Access token is stored in localstorage
    const ls = window.localStorage.getItem(LS_KEY);
    const token = ls && JSON.parse(ls);
    console.log(token);
    setState(token);
  }, []);

  const handleLoggedIn = (token) => {
    localStorage.setItem(LS_KEY, JSON.stringify(token));
    setState(token);
  };

  const handleLoggedOut = () => {
    localStorage.removeItem(LS_KEY);
    setState(undefined);
  };

  return (
    <div className="main-root">
      <NavBar onLoggedIn={handleLoggedIn} auth={state}/>
      <section>
        {state && 'Hello World' + state}
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
