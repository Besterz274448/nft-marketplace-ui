import React from "react";
import "../asset/main.css";
import ArtistContract from "../components/ArtistContract";
import { useParams, useNavigate } from "react-router";
import Skeleton from "@mui/material/Skeleton";
import CircularProgress from "@mui/material/CircularProgress";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import { jwtDecode } from "../utils/utility.js";
import { Divider, Button, TextField } from "@mui/material";
import ipfsLogo from "../asset/svg/view.png";
import metadataLogo from "../asset/svg/boxes.png";
import etherscanLogo from "../asset/svg/etherscan.png";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function ArtworkDetail({ auth }) {
  const params = useParams();
  const navigate = useNavigate();
  const [nft, setNFT] = React.useState(null);
  const [owner, setUserData] = React.useState({ username: "undefined" });
  const [isOwner, setOwner] = React.useState(false);
  const [isUser, setUser] = React.useState(false);
  const [modal, setModal] = React.useState(false);

  const handleModal = (flag) => {
    setModal(flag);
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
        } else {
          setUser(true);
        }
      }

      setNFT(result.data);
      setUserData(user.data);
    };

    fetchUserData();
  }, [auth, params.id]);

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
              <div>
                <h2>Description</h2>
                <p>{nft.description}</p>
              </div>
              <Divider />
              <div className="artworkdetail-link">
                <h2>Detail</h2>
                <ul>
                  <li className="artworkdetail-link-detail">
                    <img src={etherscanLogo} width={15} height={15} alt="etherscan"/>
                    <a
                      className="remove-css-navlink"
                      href={`https://ropsten.etherscan.io/token/0x11e710Ba467d289eCEe9bAD9Ec051FfFD20c56c9?a=${nft.tokenId}`}
                    >
                      View on Etherscan
                    </a>
                  </li>
                  <li className="artworkdetail-link-detail">
                    <img src={metadataLogo} width={15} height={15} alt="metadata"/>
                    <a
                      className="remove-css-navlink"
                      href={`https://ipfs.io/ipfs/${nft.metadata}/metadata.json`}
                    >
                      View on Metadata
                    </a>
                  </li>
                  <li className="artworkdetail-link-detail">
                    <img src={ipfsLogo} width={15} height={15} alt="ipfs"/>
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
              <div className="flex"></div>
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
                      disabled={nft.sellStatus}
                    >
                      <span>BUY NFT</span>
                    </button>
                    <p style={{ textAlign: "center", color: "grey" }}>
                      NOT AVAILABLE FOR SALE
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
          <Dialog
            open={modal}
            onClose={() => {
              handleModal();
            }}
          >
            <DialogTitle>SET NFT PRICE</DialogTitle>
            <DialogContent>
              <DialogContentText></DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="nft_price"
                label="nft_price"
                type="number"
                step="0.1"
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
              <Button onClick={() => {}}>Submit</Button>
            </DialogActions>
          </Dialog>
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
