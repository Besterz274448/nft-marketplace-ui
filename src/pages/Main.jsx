import React from "react";
import NavBar from "../components/NavBar";
import Home from "../pages/Home";
import Feed from "../pages/Feed";
import UserProfile from "../pages/UserProfile";
import ArtworkDetail from "../pages/ArtworkDetail";
import CreateAsset from "../pages/CreateAsset";
import Page404 from "../pages/Page404";
import Alert from "@material-ui/lab/Alert";
import "../asset/main.css";
import Fade from "@material-ui/core/Fade";
import { Routes, Route, useLocation } from "react-router-dom";

const LS_KEY = "login-with-metamask:auth";

function Main() {
  const [auth, setAuth] = React.useState(undefined);
  const [status, setStatus] = React.useState({
    severity: "",
    message: "This is a warning alert",
  });
  const [open, setOpen] = React.useState(true);
  const [nfts, setNFT] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const location = useLocation();

  React.useEffect(() => {
    const fetchAllData = async () => {
      let token = getToken();
      const validateToken = await isTokenValid(token);
      if (!validateToken) {
        localStorage.removeItem(LS_KEY);
        token = undefined;
      }
      // /nfts/getNFTAll
      let [nftsResponse, usersResponse] = await Promise.all([
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/nfts/getNFTAll`).then(
          (res) => res.json()
        ),
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/all`).then(
          (res) => res.json()
        ),
      ]);

      let nftsData = nftsResponse.data === undefined ? [] : nftsResponse.data;
      let usersData =
        usersResponse.data === undefined ? [] : usersResponse.data;

      let usersMapping = {};
      for (let i = 0; i < usersData.length; i++) {
        usersMapping[usersData[i].id] = {
          avatar: usersData[i].avatar,
          username: usersData[i].username,
        };
      }

      nftsData = nftsData.map((data) => {
        let { avatar, username } = usersMapping[data.owner];
        return { ...data, avatar, username };
      });

      setUsers(usersData);
      setNFT(nftsData);
      setAuth(token);
    };

    fetchAllData();
  }, []);

  React.useEffect(() => {
    const fetchData = async () => {
      let [nftsResponse, usersResponse] = await Promise.all([
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/nfts/getNFTAll`).then(
          (res) => res.json()
        ),
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/all`).then(
          (res) => res.json()
        ),
      ]);

      let nftsData = nftsResponse.data === undefined ? [] : nftsResponse.data;
      let usersData =
        usersResponse.data === undefined ? [] : usersResponse.data;

      let usersMapping = {};
      for (let i = 0; i < usersData.length; i++) {
        usersMapping[usersData[i].id] = {
          avatar: usersData[i].avatar,
          username: usersData[i].username,
        };
      }

      nftsData = nftsData === undefined ? [] : nftsData;
      nftsData = nftsData.map((data) => {
        let { avatar, username } = usersMapping[data.owner];
        return { ...data, avatar, username };
      });

      setUsers(usersData);
      setNFT(nftsData);
    };
    if (location.pathname === "/") {
      fetchData();
    }
  }, [location]);

  const getUserData = (id) => {
    return users.filter((data) => data.id === id)[0];
  };

  const getToken = () => {
    const ls = window.localStorage.getItem(LS_KEY);
    let token = ls && JSON.parse(ls);
    return token;
  };

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
    setTimeout(() => {
      setStatus({ severity: "", message: "" });
    }, 5000);
  };

  return (
    <div className="main-root">
      <NavBar
        onLoggedIn={handleLoggedIn}
        handleLoggedOut={handleLoggedOut}
        auth={auth}
        handleStatus={handleStatus}
        nfts={nfts}
        getUserDetail={getUserData}
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
            }}
          >
            {status.message}
          </Alert>
        </Fade>
      )}
      <section>
        <Routes>
          <Route path="*" element={<Page404 />} />
          <Route path="/error" element={<Page404 />} />
          <Route path="/" element={<Home nfts={nfts} />} />
          <Route path="feed/*" element={<Feed nfts={nfts} users={users} />} />
          <Route
            path="/user/:id"
            element={<UserProfile auth={auth} users={users} />}
          />
          <Route
            path="/artworks/:id"
            element={<ArtworkDetail validateToken={isTokenValid} auth={auth} />}
          />
          <Route
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
