import React from "react";
import "../asset/main.css";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton from "@mui/material/IconButton";
import Tabs from "../components/Tabs";
import Button from "../components/Button";
import MuiButton from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import UserItem from "../components/UserItem";
import { jwtDecode } from "../utils/utility";
import CircularProgress from "@mui/material/CircularProgress";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import UploadImage from "../components/UploadImage";

const FollowDetail = ({ amount, text }) => {
  return (
    <div>
      <p className="p0 b userprofile-follow-text">{amount}</p>
      <p className="p0 userprofile-follow-text">{text}</p>
    </div>
  );
};

function UserProfile({ auth, users }) {
  const [userProfile, setUserProfile] = React.useState(null);
  const [isAuth, setAuth] = React.useState(false);
  const [owned, setOwned] = React.useState([]);
  const [created, setCreated] = React.useState([]);
  const [selectedTabs, setTabs] = React.useState(0);
  const [modal, setModal] = React.useState(false);
  const [img, setImg] = React.useState({
    src: "",
    name: "",
    type: "",
    file: "",
    updateAvatar: false,
  });
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchUserData = async () => {
      let [nftsResponse, usersResponse] = await Promise.all([
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/nfts/getNFTAll`).then(
          (res) => res.json()
        ),
        await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/users/detail?id=${params.id}`
        ).then((res) => res.json()),
      ]);

      if (usersResponse.statusCode !== 200) {
        navigate("/error");
        return;
      }

      if (nftsResponse.statusCode !== 200) {
        nftsResponse.data = [];
      }

      if (auth) {
        const payload = jwtDecode(auth).payload;
        const ownerId = params.id;
        if (payload.id === ownerId) {
          setAuth(true);
        } else {
          setAuth(false);
        }
      }

      let usersMapping = {};
      for (let i = 0; i < users.length; i++) {
        usersMapping[users[i].id] = {
          avatar: users[i].avatar,
          username: users[i].username,
        };
      }

      let nftsOwned = JSON.parse(JSON.stringify(nftsResponse))
        .data.filter((data) => data.owner === params.id)
        .map((data) => {
          let { avatar, username } = usersResponse.data;
          return { ...data, avatar, username };
        });

      let nftsCreated = JSON.parse(JSON.stringify(nftsResponse))
        .data.filter((data) => data.createdBy === params.id)
        .map((data) => {
          let avatar = usersMapping[data.owner]?.avatar;
          let username = usersMapping[data.owner]?.username;
          return { ...data, avatar, username };
        });

      setImg({
        src: usersResponse.data.avatar,
        name: "",
        type: "",
        file: "",
        updateAvatar: false,
      });
      setUserProfile(usersResponse.data);
      setOwned(nftsOwned);
      setCreated(nftsCreated);
    };

    fetchUserData();
  }, [auth, location]);

  const copyToClipboard = () => {
    let copyText = document.getElementById("userprofile-user-wallet");
    navigator.clipboard.writeText(copyText.innerHTML);
    alert("Copied the text: " + copyText.innerHTML);
  };

  const handleTabs = (index) => {
    setTabs(index);
  };

  const handleModal = (flag) => {
    setModal(flag);
  };

  const handleImg = async (files) => {
    let newSrc = {};
    console.log(files);
    newSrc.file = files[0];
    newSrc.name = files[0].name;
    newSrc.type = files[0].type;
    newSrc.src = await getDataImage(files[0]);
    newSrc.updateAvatar = true;
    setImg(newSrc);
  };

  const resetImg = () => {
    setImg({
      src: "",
      name: "",
      type: "",
      file: "",
      updateAvatar: false,
    });
  };

  function _arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  async function getDataImage(file) {
    let result_base64 = await new Promise((resolve) => {
      let fileReader = new FileReader();
      fileReader.onload = (e) => resolve(fileReader.result);
      fileReader.readAsArrayBuffer(file);
    });
    return result_base64;
  }

  const handleEditProfile = async (e) => {
    e.preventDefault();

    let username = e.target["user_username"].value;
    let description = e.target["user_description"].value;
    let updateAvatar = img.updateAvatar;
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${auth}`);

    let formdata = new FormData();
    formdata.append("avatar", img.file);
    formdata.append("username", username);
    formdata.append("description", description);
    formdata.append("updateAvatar", img.updateAvatar);

    console.log(img);

    console.log(formdata);
    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        handleModal(false);
        window.location.reload();
      })
      .catch((error) => console.log("error", error));
  };

  let userId = "PUBLIC@";
  return (
    <>
      {userProfile ? (
        <div className="userprofile-root" style={{ height: "fit-content" }}>
          <div>
            <img
              src={
                userProfile.background
                  ? userProfile.background
                  : "https://documents.dickson-constant.com/medias/images/catalogue/api/m654-grey-680.jpg"
              }
              width="100%"
              height="350px"
              alt="profile-background"
            />
          </div>
          <div className="userprofile-contract-container flex">
            <img
              className="userprofile-contract-avatar"
              src={
                userProfile.avatar
                  ? userProfile.avatar
                  : "https://documents.dickson-constant.com/medias/images/catalogue/api/m654-grey-680.jpg"
              }
              width="200px"
              height="200px"
              alt="userprofile-avatar"
            />
            <div className="flex">
              {/* <button className="userprofile-contract-button b">
                Collected By
              </button> */}
              {isAuth && (
                <button
                  className="userprofile-contract-button b flex"
                  style={{ alignItems: "center" }}
                  onClick={() => {
                    handleModal(true);
                  }}
                >
                  Edit Profile
                  <EditIcon />
                </button>
              )}
            </div>
          </div>
          <div className="userprofile-description-container">
            <div className="userprofile-description-text-container">
              <div className="userprofile-wallet-container flex">
                <div className="userprofile-user-id">#{userId}</div>
                <div className="userprofile-user-wallet">
                  <span>
                    {userProfile.publicAddress.substring(0, 6)} . . .{" "}
                    {userProfile.publicAddress.substring(
                      userProfile.publicAddress.length - 4,
                      userProfile.publicAddress.length
                    )}
                  </span>
                  <IconButton onClick={copyToClipboard} aria-label="delete">
                    <ContentCopyIcon />
                  </IconButton>
                </div>
                <div id="userprofile-user-wallet" style={{ display: "none" }}>
                  {userProfile.publicAddress}
                </div>
              </div>
              <div className="userprofile-user-contractAddress">
                <span className="userprofile-user-contractAddress">
                  @{userProfile.username}
                </span>
              </div>
              {/* <div className="userprofile-follow">
                <FollowDetail amount={171} text="Following" />
                <FollowDetail amount={759} text="Followers" />
                <div>
                  <Button
                    width="fit-content"
                    sx={{
                      padding: "14px 30px",
                      background: "white",
                      color: "black",
                      border: "1px solid rgba(0,0,0,0.2)",
                    }}
                    name="Follow"
                  />
                </div>
              </div> */}
              {/* <div className="userprofile-followedBy">
                <div className="b">Folllowed By</div>
                <div className="userprofile-avatar-followed flex">
                  <div className="avatar-followed">
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                      sx={{ width: 24, height: 24 }}
                    />
                  </div>
                  <div className="avatar-followed">
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                      sx={{ width: 24, height: 24 }}
                    />
                  </div>
                  <div className="avatar-followed">
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                      sx={{ width: 24, height: 24 }}
                    />
                  </div>
                  <div className="avatar-followed">
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                      sx={{ width: 24, height: 24 }}
                    />
                  </div>
                  <div className="avatar-followed">
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                      sx={{ width: 24, height: 24 }}
                    />
                  </div>
                </div>
                <div>
                  <span className="openModal-followed-button b">View all</span>
                </div>
              </div> */}
              <p className="b userprofile-header">Bio</p>
              <Divider />
              <p className="userprofile-bio-detail">
                {userProfile.description}
              </p>
              {/* <p className="b userprofile-header">Links</p>
              <Divider />
              <p className="b userprofile-header">Joined</p>
              <Divider /> */}
            </div>
            <div
              className="userprofile-descrition-artworks"
              style={{ overflow: "hidden" }}
            >
              <Tabs
                menu={[
                  { name: "Created", count: created.length },
                  { name: "Owned", count: owned.length },
                ]}
                selectedTabs={selectedTabs}
                handleTabs={handleTabs}
                sortComponent={<></>}
              />
              <div style={{ marginTop: "1%" }}>
                {selectedTabs === 0 && (
                  <UserItem nfts={JSON.parse(JSON.stringify(created))} />
                )}
                {selectedTabs === 1 && (
                  <UserItem nfts={JSON.parse(JSON.stringify(owned))} />
                )}
              </div>
            </div>
          </div>
          <Dialog
            open={modal}
            onClose={() => {
              handleModal(false);
              setTimeout(() => {
                setImg({
                  src: userProfile.avatar,
                  name: "",
                  type: "",
                  file: "",
                  updateAvatar: false,
                });
              }, 500);
            }}
            maxWidth={"xs"}
            fullWidth
          >
            <form onSubmit={handleEditProfile}>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogContent>
                <DialogContentText></DialogContentText>
                <div>
                  <label>Avatar</label>
                  <div>
                    <UploadImage
                      id=""
                      maxSize={true}
                      img={img}
                      handleImg={handleImg}
                      resetImg={resetImg}
                    />
                  </div>
                </div>
                <div>
                  <label>username </label>
                  <TextField
                    margin="dense"
                    id="user_username"
                    minLength={20}
                    placeholder="input your username"
                    type="text"
                    required
                    fullWidth
                    variant="outlined"
                    defaultValue={userProfile.username}
                  />
                </div>
                <div>
                  <label>description </label>
                  <TextField
                    margin="dense"
                    id="user_description"
                    type="email"
                    placeholder="user description"
                    multiline
                    minRows={4}
                    fullWidth
                    variant="outlined"
                    defaultValue={userProfile.description}
                  />
                </div>
              </DialogContent>
              <DialogActions>
                <MuiButton
                  onClick={() => {
                    handleModal(false);
                    setTimeout(() => {
                      setImg({
                        src: userProfile.avatar,
                        name: "",
                        type: "",
                        file: "",
                        updateAvatar: false,
                      });
                    }, 500);
                  }}
                >
                  Cancel
                </MuiButton>
                <MuiButton type="submit">Submit</MuiButton>
              </DialogActions>
            </form>
          </Dialog>
        </div>
      ) : (
        <div className="artworkdetail-progress">
          <CircularProgress />
        </div>
      )}
    </>
  );
}

export default UserProfile;
