import React from "react";
import "../asset/navbar.css";
import MetaMaskLogo from "../asset/svg/metamasklogo.png";
import AdorableLogo from "../asset/svg/Adorable-Panda.svg";
import Button from "./Button";
import { NavLink } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PhoneMenu from "./PhoneMenu";
import Web3 from "web3";
import CircularProgress from "@mui/material/CircularProgress";
import { useLocation } from "react-router-dom";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 270,
  bgcolor: "background.paper",
  border: "1px solid rgba(0,0,0,0.1)",
  borderRadius: "10%",
  boxShadow: 24,
  textAlign: "center",
  p: 5,
};

const searchPhoneStyle = {
  position: "absolute",
  top: "10%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 250,
  height: 40,
  bgcolor: "background.paper",
  border: "1px solid rgba(0,0,0,0.4)",
  borderRadius: "24px",
  boxShadow: 24,
  textAlign: "center",
  p: 5,
};

let web3 = undefined; // Will hold the web3 instance

function NavBar({ onLoggedIn, auth , handleStatus , handleLoggedOut }) {
  const [selectInput, setSelect] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false); // Loading button state

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleInputOpen = () => setSelect(true);
  const handleInputClose = () => setSelect(false);

  // const location = useLocation()
  // const [buttonColor,setButtonColor] = React.useState('black');

  // React.useEffect(() => {
  //   let path = location.pathname.split('/')[1];
  //   setButtonColor(path === 'user' ? 'white' : 'black');
  // }, [location])

  const handleAuthenticate = ({ publicAddress, signature }) => {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/auth`, {
      body: JSON.stringify({ publicAddress, signature }),
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

  const handleClick = async () => {
    if (!window.ethereum) {
      handleStatus("error","Please install MetaMask first.");
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
      let userData = user.data !== null ? user : await handleSignup(publicAddress);
      let signMessage = await handleSignMessage(userData.data);
      let token = await handleAuthenticate(signMessage);
      onLoggedIn(token.data);
      setOpen(false);
    } catch (err) {
      window.alert(err);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="navbar-root">
        <div
          className="navbar-logo"
          style={{ display: selectInput && window.innerWidth < 800 ? "none" : "flex" }}>
          <NavLink to="/">
            <img height="55px" src={AdorableLogo} alt="logo" />
          </NavLink>
        </div>
        <div className={"navbar-searchfield-container"}>
          <div className="navbar-searchfield">
            <p style={{ color: "#707070" }}>🔎︎</p>
            <input
              placeholder="Search Artwork"
              className="navbar-input"
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
            style={selectInput ? { opacity: 1, visibility: "visible" } : {}}>
            <div className="keywordSearch">
              <span className="keywordSearch-header">tags</span>
            </div>
          </div>
        </div>
        <div className="navbar-button">
          {!auth && (
            <Button //wallet button
              onClick={handleClick}
              width="150%"
              sx={{
                // backgroundColor:buttonColor,
                // color:buttonColor === 'black' ? "white" : "black",
                padding: "17.5px 14px",
              }}
              name={loading ? <CircularProgress size={20} /> : "Connect Wallet"}
            />
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
          style={selectInput ? { opacity: 1, visibility: "visible" } : {}}></div>
      </div>
      {/* <>
        <Modal //modal connect wallet
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Connect your wallet.
            </Typography>
            <Typography id="modal-modal-description1" sx={{ m: 2, fontSize: "12px" }}>
              By connecting your wallet, you agree to our Terms of Service and our Privacy Policy.
            </Typography>
            <Typography id="modal-modal-description2" sx={{ m: 2, fontSize: "12px" }}>
              <Button
                width="100%"
                sx={{
                  padding: "14px 14px",
                  borderRadius: "6px",
                  background:
                    "linear-gradient(90deg, rgba(244,93,47,1) 0%, rgba(254,209,119,1) 100%)",
                }}
                name={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: loading ? "center" : "space-between",
                    }}>
                    {loading ? (
                      <CircularProgress size={20} />
                    ) : (
                      <>
                        <span>Metamask</span>
                        <img src={MetaMaskLogo} width="20px" alt="metamask-logo"></img>
                      </>
                    )}
                  </div>
                }
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2, fontSize: "12px" }}>
              New to Ethereum?
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 0, fontSize: "12px" }}>
              Learn more about wallets
            </Typography>
          </Box>
        </Modal>
      </> */}
    </>
  );
}

export default NavBar;
