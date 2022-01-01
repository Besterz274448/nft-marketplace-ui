import React from "react";
import NavBar from "../components/NavBar";
import Home from "../pages/Home";
import Feed from "../pages/Feed";
import UserProfile from "../pages/UserProfile";
import ArtworkDetail from "../pages/ArtworkDetail";
import CreateAsset from "../pages/CreateAsset";
import Alert from "@material-ui/lab/Alert";
import "../asset/main.css";
import Fade from "@material-ui/core/Fade";
import { Routes, Route } from "react-router-dom";

const LS_KEY = "login-with-metamask:auth";

function Main() {
  const [auth, setAuth] = React.useState(undefined);
  const [status, setStatus] = React.useState({
    severity: "",
    message: "This is a warning alert",
  });

  React.useEffect(async () => {
    // Access token is stored in localstorage
    const ls = window.localStorage.getItem(LS_KEY);
    let token = ls && JSON.parse(ls);
    const validateToken = await isTokenValid(token);
    if (!validateToken) {
      localStorage.removeItem(LS_KEY);
      token = undefined;
    }
    setAuth(token);
  }, []);

  const isTokenValid = async (token) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.status === 200;
  };

  const handleLoggedIn = (token) => {
    localStorage.setItem(LS_KEY, JSON.stringify(token));
    setAuth(token);
  };

  const handleLoggedOut = () => {
    localStorage.removeItem(LS_KEY);
    setAuth(undefined);
  };

  const handleStatus = (severity, message) => {
    setStatus({ severity, message });
  };

  return (
    <div className="main-root">
      <NavBar
        onLoggedIn={handleLoggedIn}
        handleLoggedOut={handleLoggedOut}
        auth={auth}
        handleStatus={handleStatus}
      />
      {status.severity !== "" && (
        <Fade in={status.severity !== ""}>
          <Alert
            severity={status.severity}
            onClose={() => {
              setStatus({
                severity: "",
                message: "",
              });
            }}>
            {status.message}
          </Alert>
        </Fade>
      )}
      <section>
        <Routes>
          <Route exact="true" path="/" element={<Home />} />
          <Route path="feed/*" element={<Feed />} />
          <Route path="user/*" element={<UserProfile />} />
          <Route path="/artworks/:id" element={<ArtworkDetail />} />
          <Route
            exact
            path="/asset/create"
            element={
              <CreateAsset
                handleStatus={handleStatus}
                validateToken={isTokenValid}
                handleLoggedOut={handleLoggedOut}
                authToken={auth}
              />
            }
          />
        </Routes>
      </section>
    </div>
  );
}

export default Main;
