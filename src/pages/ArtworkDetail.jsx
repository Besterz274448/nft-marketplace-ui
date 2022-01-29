import React from "react";
import "../asset/main.css";
import ArtistContract from "../components/ArtistContract";
import { useParams, useNavigate, useLocation } from "react-router";
import Skeleton from "@mui/material/Skeleton";
import CircularProgress from "@mui/material/CircularProgress";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import { jwtDecode, sellNFT } from "../utils/utility.js";
import { Divider, Button, TextField } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import ipfsLogo from "../asset/svg/view.png";
import metadataLogo from "../asset/svg/boxes.png";
import etherscanLogo from "../asset/svg/etherscan.png";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
const ethers = require("ethers");

function ItemActivity({ activity, date, price, txHash, user }) {
  return (
    <div className="artworkdetail-list-activity flex">
      <div className="flex" style={{ alignItems: "center" }}>
        <div>
          <img className="itemActivity-avatar" src={user.avatar} />
        </div>
        <div style={{ marginLeft: "10px" }}>
          <p style={{ margin: 0, padding: 0, fontSize: "16px" }}>
            <b>{activity}</b> by <b>@{user.username}</b>
          </p>
          <p style={{ margin: 0, padding: 0, fontSize: "14px" }}>{date}</p>
        </div>
      </div>
      <div className="flex">
        <div style={{ marginRight: "20px" }}>
          <b>{price}</b>
        </div>
        <div>
          <a href={txHash}>
            <OpenInNewIcon />
          </a>
        </div>
      </div>
    </div>
  );
}

function ArtworkDetail({ auth }) {
  const params = useParams();
  const navigate = useNavigate();
  const [nft, setNFT] = React.useState(null);
  const [owner, setUserData] = React.useState({ username: "undefined" });
  const [isOwner, setOwner] = React.useState(false);
  const [isUser, setUser] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  const [backdropStatus, setBackdrop] = React.useState(false);

  const handleModal = (flag) => {
    setModal(flag);
  };

  const handleConfirm = (cf) => {
    setConfirm(cf);
  };

  React.useEffect(() => {
    const fetchUserData = async () => {
      const id = params.id;

      let response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/nfts?id=${id}`
      );

      let result = await response.json();
      if (result.statusCode !== 200) {
        navigate("/error");
        return;
      }

      let user_response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/detail?id=${result.data.owner}`
      );
      let user = await user_response.json();
      if (auth) {
        const payload = jwtDecode(auth).payload;
        const ownerId = result.data.owner;
        if (payload.id === ownerId) {
          setOwner(true);
          setUser(false);
        } else {
          setUser(true);
          setOwner(false);
        }
      } else {
        setOwner(false);
        setUser(false);
      }

      setNFT(result.data);
      setUserData(user.data);
    };

    fetchUserData();
  }, [auth, params.id]);

  const callSellNFTContract = async (e) => {
    e.preventDefault();
    //gwei
    setBackdrop(true);
    handleModal(false);
    let price = e.target["nft_price"].value;
    console.log(nft.tokenId);
    let isSuccess = await sellNFT(nft.tokenId, price);
    if (isSuccess) {
      const token = `Bearer ${auth}`;
      try {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/nfts/sellNFT`, {
          body: JSON.stringify({ id: nft.id, price: parseFloat(price) }),
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          method: "PUT",
        }).then((response) => {
          window.location.reload();
        });
      } catch (err) {
        console.log("err");
      }
    }
    setBackdrop(false);
  };

  const handleBuyNFT = async () => {
    const payload = jwtDecode(auth).payload;
    const publicAddress = payload.publicAddress;
    const token = `Bearer ${auth}`;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/billings/createBuyBilling?id=${nft.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
          method: "GET",
        }
      ).then((response) => response.json());

      const txFee = response.data;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const tx = await signer.sendTransaction({
        to: process.env.REACT_APP_BACKEND_WALLET,
        value: ethers.utils.parseEther(txFee),
      });

      const txValue = {
        tokenId: nft.tokenId,
        buyyer: publicAddress,
        txHash: tx.hash,
      };

      await fetch(`${process.env.REACT_APP_BACKEND_URL}/nfts/buyNFT`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token,
        },
        body: JSON.stringify(txValue),
      })
        .then((res) => res.json())
        .then((data) => window.location.reload())
        .catch((err) => {
          throw new Error("Buy failed");
        });
    } catch (err) {
      console.log("err");
    }
  };
  const dateFormat = (str = "1/4/2022, 6:27:39 AM") => {
    const month = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    let format = str.split(",")[0].split("/");
    return `${format[1]} ${month[format[0] - 1]} ${format[2]} `;
  };

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 20 }}
        open={backdropStatus}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {nft !== null ? (
        <div className="artworkdetail-root ">
          <div className="artworkdetail-img">
            {nft.cid ? (
              <img
                src={"https://ipfs.io/ipfs/" + nft.cid}
                width={500}
                height={370}
                alt="artworkdetail-logo"
              />
            ) : (
              <Skeleton variant="rectangular" width={500} height={370} />
            )}
          </div>
          <div className="artworkdetail-button-container flex">
            <div></div>
            {/* <ArtistContract /> */}
            <div className="flex">
              <button className="artworkdetail-share-button b">
                <ShareIcon />
                <span>Shared</span>
              </button>
            </div>
          </div>
          <div className="artworkdetail-container flex">
            <div className="artworkdetail-half-container">
              <div>
                <h1>{nft.name}</h1>
              </div>
              <div>
                <a
                  className="remove-css-navlink"
                  href={`https://ropsten.etherscan.io/tx/${nft.nftTxHash}`}
                >
                  <div className="flex">
                    Minted on {dateFormat(nft.createdDate)}
                    <OpenInNewIcon />
                  </div>
                </a>
              </div>
              <div>
                <h4>Owned By</h4>
                <ArtistContract
                  username={owner.username}
                  contractID={nft.owner}
                  avatar={owner.avatar}
                />
              </div>
              <div style={{ padding: "20px 0px" }}>
                <h2>Description</h2>
                <p>{nft.description}</p>
              </div>
              <Divider style={{ marginRight: "10px" }} />
              <div className="artworkdetail-link">
                <h2>Detail</h2>
                <ul>
                  <li className="artworkdetail-link-detail">
                    <img
                      src={etherscanLogo}
                      width={15}
                      height={15}
                      alt="etherscan"
                    />
                    <a
                      className="remove-css-navlink"
                      href={`https://ropsten.etherscan.io/token/${process.env.REACT_APP_CONTRACT_ADDRESS}?a=${nft.tokenId}`}
                    >
                      View on Etherscan
                    </a>
                  </li>
                  <li className="artworkdetail-link-detail">
                    <img
                      src={metadataLogo}
                      width={15}
                      height={15}
                      alt="metadata"
                    />
                    <a
                      className="remove-css-navlink"
                      href={`https://ipfs.io/ipfs/${nft.metadata}/metadata.json`}
                    >
                      View on Metadata
                    </a>
                  </li>
                  <li className="artworkdetail-link-detail">
                    <img src={ipfsLogo} width={15} height={15} alt="ipfs" />
                    <a
                      className="remove-css-navlink"
                      href={`https://ipfs.io/ipfs/${nft.cid}`}
                    >
                      View on IPFS
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="artworkdetail-half-container">
              <div style={{ minHeight: "210px" }}>
                <div>
                  <h3>CURRENT PRICE</h3>
                  <h1>{nft.currentPrice.toFixed(3)} ETH </h1>
                </div>
                <div>
                  {isOwner && (
                    <button
                      onClick={() => {
                        handleModal(true);
                      }}
                      className={
                        nft.sellStatus
                          ? "artworkdetail-action-button b button-disabled"
                          : "artworkdetail-action-button b button-available"
                      }
                      disabled={nft.sellStatus}
                    >
                      <span>SET FOR SALE</span>
                      <EditIcon />
                    </button>
                  )}
                  {isUser && (
                    <>
                      <button
                        className={
                          nft.sellStatus
                            ? "artworkdetail-action-button b button-available"
                            : "artworkdetail-action-button b button-disabled"
                        }
                        disabled={!nft.sellStatus}
                        onClick={() => {
                          handleConfirm(true);
                        }}
                      >
                        <span>BUY NFT</span>
                      </button>
                      {!nft.sellStatus && (
                        <p style={{ textAlign: "center", color: "grey" }}>
                          NOT AVAILABLE FOR SALE
                        </p>
                      )}
                    </>
                  )}
                </div>
                <div>
                  <h2>Item Activity</h2>
                  <ItemActivity
                    user={owner}
                    date={"Jan 16, 2022 at 1:32am"}
                    activity={"Bought"}
                    price="5 ETH"
                  />
                  <ItemActivity
                    user={owner}
                    date={"Jan 16, 2022 at 1:32am"}
                    activity={"Listed"}
                    price="5 ETH"
                  />
                  <ItemActivity
                    user={owner}
                    date={"Jan 16, 2022 at 1:32am"}
                    activity={"Minted"}
                  />
                </div>
              </div>
            </div>
          </div>
          <Dialog
            open={modal}
            onClose={() => {
              handleModal();
            }}
          >
            <form onSubmit={callSellNFTContract}>
              <DialogTitle>SET NFT PRICE</DialogTitle>
              <DialogContent>
                <DialogContentText></DialogContentText>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="nft_price"
                  label="nft_price"
                  type="number"
                  inputProps={{
                    maxLength: 13,
                    step: "0.001",
                  }}
                  fullWidth
                  variant="outlined"
                />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    handleModal(false);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </DialogActions>
            </form>
          </Dialog>
          <div>
            <Dialog
              open={confirm}
              onClose={() => {
                handleConfirm(false);
              }}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">CONFIRMATION</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Do you really want to buy this NFT ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  sx={{ backgroundColor: "red" }}
                  variant="contained"
                  onClick={() => {
                    handleConfirm(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleBuyNFT();
                    handleConfirm(false);
                  }}
                  autoFocus
                >
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      ) : (
        <div className="artworkdetail-progress">
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default ArtworkDetail;
