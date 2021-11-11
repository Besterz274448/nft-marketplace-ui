import React from "react";
import "../asset/main.css";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton from "@mui/material/IconButton";
import MenuTabs from "../components/MenuTabs";
import Grid from "@mui/material/Grid";
import ImageCard from "../components/ImageCard";

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
  return (
    <div>
      <div>
        <img src={background} width="100%" height="350px" />
      </div>
      <div className="userprofile-contract-container flex">
        <img
          className="userprofile-contract-avatar"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQZBSvZWBFq9CwBaDVQr-pgZlnhsrDrzsqDQ&usqp=CAU"
          width="200px"
        />
        <button className="userprofile-contract-button">Collected By</button>
      </div>
      <div className="userprofile-description-container flex">
        <div className="userprofile-description-text-container">
          <div className="userprofile-wallet-container flex">
            <div className="userprofile-user-id">#{userId}</div>
            <div className="userprofile-user-wallet">
              <span>
                {wallet.substring(0, 6)} . . . {wallet.substring(wallet.length - 4, wallet.length)}
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
          <div className="userprofile-user-contractAddress">{contractAddress}</div>
          <div className="userprofile-follow">
            <div>1</div>
            <div>2</div>
            <div>3</div>
          </div>
        </div>
        <div className="userprofile-descrition-artworks">
          {/* รอแก้ โลจิค menutabs << ใช้แบบ เปลี่ยน component ไม่ได้ */}
          <MenuTabs
            menu={[
              { name: "Created", to: "/feed/profiles", count: 32 },
              { name: "Owned", to: "/feed/artworks", count: 5 },
            ]}
            sortComponent={<></>}
          />
          <div style={{ marginTop: "1%" }}></div>
          <Grid alignItems="center" rowGap={3} container spacing={2}>
            <Grid item lg={4} md={6} sm={6} xs={11}>
              <ImageCard
                src={"https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000)}
                name="BearCollection(1999-2004)-ULTRA-RARE-TyBB"
                contract="moisesdsanabria"
                price={1.0}
              />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={11}>
              <ImageCard
                src={"https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 1000)}
                name="BearCollection(1999-2004)-ULTRA-RARE-TyBB"
                contract="moisesdsanabria"
                price={1.0}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
