import React from "react";
import "../asset/main.css";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton from "@mui/material/IconButton";
import MenuTabs from "../components/MenuTabs";
import Button from "../components/Button";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import UserItem from "../components/UserItem";
import { Routes, Route } from "react-router-dom";

const FollowDetail = ({ amount, text }) => {
  return (
    <div>
      <p className="p0 b userprofile-follow-text">{amount}</p>
      <p className="p0 userprofile-follow-text">{text}</p>
    </div>
  );
};

function UserProfile({
  background = "https://thaipublica.org/wp-content/uploads/2013/06/edward-snowden.jpg",
  userId = "46953",
  wallet = "0xF74d1224931AFa9cf12D06092c1eb1818D1E255C",
  username = "Edward Snowden",
  contractAddress = "@snowden",
}) {
  const copyToClipboard = () => {
    let copyText = document.getElementById("userprofile-user-wallet");
    navigator.clipboard.writeText(copyText.innerHTML);
    alert("Copied the text: " + copyText.innerHTML);
  };

  const id = "test23"
  return (
    <>
      <div className="userprofile-root ">
        <div>
          <img src={background} width="100%" height="350px" alt="profile-background" />
        </div>
        <div className="userprofile-contract-container flex">
          <img
            className="userprofile-contract-avatar"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQZBSvZWBFq9CwBaDVQr-pgZlnhsrDrzsqDQ&usqp=CAU"
            width="200px"
            alt="userprofile-avatar"
          />
          <button className="userprofile-contract-button b">Collected By</button>
        </div>
        <div className="userprofile-description-container">
          <div className="userprofile-description-text-container">
            <div className="userprofile-wallet-container flex">
              <div className="userprofile-user-id">#{userId}</div>
              <div className="userprofile-user-wallet">
                <span>
                  {wallet.substring(0, 6)} . . .{" "}
                  {wallet.substring(wallet.length - 4, wallet.length)}
                </span>
                <IconButton onClick={copyToClipboard} aria-label="delete">
                  <ContentCopyIcon />
                </IconButton>
              </div>
              <div id="userprofile-user-wallet" style={{ display: "none" }}>
                {wallet}
              </div>
            </div>
            <div className="userprofile-user-contractName">{username}</div>
            <div className="userprofile-user-contractAddress">
              <span className="userprofile-user-contractAddress">{contractAddress}</span>
            </div>
            <div className="userprofile-follow">
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
            </div>
            <div className="userprofile-followedBy">
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
            </div>
            <p className="b userprofile-header">Bio</p>
            <Divider />
            <p className="userprofile-bio-detail">
              A. Bill Miller, also known as 'gridworks1', creates digital images that combine
              traditional drawing and 3D environments. He also creates animated videos that
              incorporate motion capture.
            </p>
            <p className="b userprofile-header">Links</p>
            <Divider />
            <p className="b userprofile-header">Joined</p>
            <Divider />
          </div>
          <div className="userprofile-descrition-artworks">
            {/* รอแก้ โลจิค menutabs << ใช้แบบ เปลี่ยน component ไม่ได้ */}
            <MenuTabs
              menu={[
                { name: "Created", to: `/user/${id}/created`, count: 32 },
                { name: "Owned", to: `/user/${id}/owned`, count: 5 },
              ]}
              sortComponent={<></>}
            />
            <div style={{ marginTop: "1%" }}></div>
            <Routes>
              <Route exact="true" path="/:id/created" element={<UserItem />} />
              <Route exact="true" path="/:id/owned" element={<UserItem />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
