import React from "react";
import "../asset/navbar.css";
import Logo from "../asset/svg/geometryshape.png";
import Button from "./Button";
import { NavLink, useNavigate } from "react-router-dom";
import PhoneMenu from "./PhoneMenu";
import Web3 from "web3";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchItem from "./SearchItem";
import { jwtDecode } from "../utils/utility";

let web3 = undefined; // Will hold the web3 instance

function NavBar({
  onLoggedIn,
  auth,
  handleStatus,
  handleLoggedOut,
  nfts = [],
  getUserDetail,
}) {
  const navigate = useNavigate();
  const [selectInput, setSelect] = React.useState(false);
  const [loading, setLoading] = React.useState(false); // Loading button state
  const [searchKey, setSearch] = React.useState("");
  const [userDetail, setUserDetail] = React.useState({});
  const handleInputOpen = () => setSelect(true);
  const handleInputClose = () => setSelect(false);

  React.useEffect(() => {
    if (auth) {
      let id = jwtDecode(auth).payload.id;
      let data = { ...getUserDetail(id) };
      setUserDetail(data);
    }
  }, [auth]);

  const handleAuthenticate = ({ publicAddress, signature }) => {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/auth`, {
      body: JSON.stringify({ publicAddress, signature, forceTest: false }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then((response) => response.json());
  };

  const handleSignMessage = async ({ publicAddress, nonce }) => {
    try {
      const signature = await web3?.eth.personal.sign(
        `I am signing my one-time nonce: ${nonce}`,
        publicAddress,
        "" // MetaMask will ignore the password argument here
      );
      console.log(`signature : ${signature}`);
      return { publicAddress, signature };
    } catch (err) {
      throw new Error("You need to sign the message to be able to log in.");
    }
  };

  const handleSignup = (publicAddress) => {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
      body: JSON.stringify({ publicAddress, username: "" }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then((response) => response.json());
  };

  function getProfilePage() {
    let id = jwtDecode(auth).payload.id;
    navigate(`/user/${id}`);
  }

  const handleClick = async () => {
    if (!window.ethereum) {
      handleStatus("error", "Please install MetaMask first.");
      return;
    }

    if (!web3) {
      try {
        // Request account access if needed
        await window.ethereum.enable();
        // We don't know window.web3 version, so we use our own instance of Web3
        // with the injected provider given by MetaMask
        web3 = new Web3(window.ethereum);
      } catch (error) {
        window.alert("You need to allow MetaMask.");
        return;
      }
    }
    const coinbase = await web3.eth.getCoinbase();
    if (!coinbase) {
      window.alert("Please activate MetaMask first.");
      return;
    }

    const publicAddress = coinbase.toLowerCase();
    setLoading(true);

    try {
      let response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users?publicAddress=${publicAddress}`
      );
      let user = await response.json();
      let userData =
        user.statusCode === 404 ? await handleSignup(publicAddress) : user;
      let signMessage = await handleSignMessage(userData.data);
      let token = await handleAuthenticate(signMessage);
      onLoggedIn(token.data);
    } catch (err) {
      handleStatus("error", err.message);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="navbar-root">
        <div
          className="navbar-logo"
          style={{
            display: selectInput && window.innerWidth < 800 ? "none" : "flex",
          }}
        >
          <NavLink to="/">
            <img height="55px" src={Logo} alt="logo" />
          </NavLink>
        </div>
        <div className={"navbar-searchfield-container"}>
          <div className="navbar-searchfield">
            <p style={{ color: "#707070" }}>🔎︎</p>
            <input
              placeholder="Search Artwork"
              className="navbar-input"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onClick={handleInputOpen}
              onKeyDown={(e) => {
                if (e.code === "Escape") {
                  handleInputClose();
                }
              }}
            />
          </div>
          <div
            className="inputTag"
            style={selectInput ? { opacity: 1, visibility: "visible" } : {}}
          >
            <div className="keywordSearch">
              <span className="keywordSearch-header">tags</span>
              {searchKey.trim().length > 0 &&
                nfts
                  .filter((data) =>
                    data.name.toLowerCase().includes(searchKey.toLowerCase())
                  )
                  .map((data) => {
                    const key = "searchData" + data.id;
                    return (
                      <SearchItem
                        key={key}
                        id={data.id}
                        image={`https://ipfs.io/ipfs/${data.cid}`}
                        name={data.name}
                        owner={data.owner}
                        username={data.username}
                        handleClose={handleInputClose}
                      />
                    );
                  })}
            </div>
          </div>
        </div>
        <div className="navbar-button">
          <NavLink
            to="/feed/artworks"
            className="remove-css-navlink"
            style={{ marginRight: "20px" }}
          >
            <span className="button-explore">Explore</span>
          </NavLink>
          {!auth ? (
            <Button //wallet button
              onClick={handleClick}
              width="150%"
              sx={{
                // backgroundColor:buttonColor,
                // color:buttonColor === 'black' ? "white" : "black",
                padding: "17.5px 14px",
              }}
              name={
                loading ? (
                  <CircularProgress size={20} />
                ) : (
                  <span>Connect Wallet</span>
                )
              }
            />
          ) : (
            <div className="flex" style={{ alignItems: "center" }}>
              <NavLink to="/asset/create">
                <Button //createAsset
                  width="100%"
                  sx={{
                    backgroundColor: "rgba(100,100,255,1)",
                    // color:buttonColor === 'black' ? "white" : "black",
                    padding: "17.5px 14px",
                  }}
                  name={"Create Asset"}
                />
              </NavLink>
              <IconButton onClick={getProfilePage}>
                <Avatar
                  size="medium"
                  alt={
                    userDetail.username !== undefined
                      ? userDetail.username.toUpperCase()
                      : ""
                  }
                  src={
                    userDetail.avatar !== undefined
                      ? userDetail.avatar
                      : "/static/images/avatar/1.jpg"
                  }
                  sx={{ width: 56, height: 56 }}
                />
              </IconButton>
              <IconButton onClick={handleLoggedOut}>
                <Avatar size="medium" sx={{ width: 56, height: 56 }}>
                  <LogoutIcon />
                </Avatar>
              </IconButton>
            </div>
          )}
        </div>
        <div className="navbar-phone">
          <PhoneMenu name="Foundaton" color="#f0f">
            <p>Phone Menu</p>
          </PhoneMenu>
        </div>
        <div //backdrop
          className="Backdrop"
          onClick={handleInputClose}
          style={selectInput ? { opacity: 1, visibility: "visible" } : {}}
        ></div>
      </div>
    </>
  );
}

export default NavBar;
