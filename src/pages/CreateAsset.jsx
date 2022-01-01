import React from "react";
import "../asset/main.css";
import TextField from "@mui/material/TextField";
import Button from "../components/Button";
import UploadImage from "../components/UploadImage";
import { NavLink, useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@material-ui/lab/Alert";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { addIpfs } from "../utils/ipfsService.js";

const ethers = require("ethers");

function CreateAsset({ authToken, handleStatus, validateToken, handleLoggedOut }) {
  const navigate = useNavigate();
  const collectionRef = React.useRef();
  const [auth, setAuth] = React.useState(undefined);
  const [backdropStatus, setBackdrop] = React.useState(false);
  const [collectionList, setList] = React.useState([]);
  const [collection, setSelectedColletction] = React.useState("");
  const [disableSubmit, setDisable] = React.useState(true);
  const [errorMsg, setMsg] = React.useState({
    severity: "",
    message: "This is a warning alert",
  });
  const [img, setImg] = React.useState({
    src: "",
    name: "",
    type: "",
  });
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setMsg({
      severity: "",
      message: "",
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(async () => {
    const storage = await window.localStorage.getItem("login-with-metamask:auth");
    let token = storage && JSON.parse(storage);
    if (!token || !validateToken(token)) {
      navigate("/");
      return;
    }

    setAuth(token);
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/collections/getAllByUser`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    if (response.statusCode === 401) {
      handleStatus("warning", "เซสชันหมดอายุ กรุณาล็อคอินใหม่อีกครั้ง");
      handleLoggedOut();
      navigate("/");
    }

    let collections = [];
    if (response.data !== undefined) {
      collections = response.data.map((data) => {
        return { id: data.id, name: data.name };
      });
    }

    setList(collections);
  }, [authToken]);

  function _arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  const handleChange = (event) => {
    setSelectedColletction(event.target.value);
  };

  const handleImg = async (files) => {
    let newSrc = {};
    newSrc.name = files[0].name;
    newSrc.type = files[0].type;
    newSrc.src = await getDataImage(files[0]);
    setImg(newSrc);
    setDisable(false);
  };

  const resetImg = () => {
    setImg({
      src: "",
      name: "",
      type: "",
    });
    setDisable(true);
  };

  const createCollection = async (e) => {
    setBackdrop(true);
    let name = collectionRef.current.value;
    if (name.trim().length === 0 || name.trim().length < 6) {
      setMsg({ severity: "warning", message: "กรุณากรอกข้อมูลให้ถูกต้อง" });
      setBackdrop(false);
      return false;
    }

    const validToken = await validateToken(auth);
    if (!validToken) {
      handleStatus("warning", "เซสชันหมดอายุ กรุณาล็อคอินใหม่อีกครั้ง");
      handleLoggedOut();
      navigate("/");
      return;
    }

    handleClose();
    const token = `Bearer ${auth}`;
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/collections`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ name }),
    })
      .then((res) => res.json())
      .catch((err) => {
        window.alert(err);
      });

    console.log(response);
    let { id } = response.data;
    let newCollections = [...collectionList];
    newCollections.push({ id, name });
    setList(newCollections);
    setSelectedColletction(id);
    setBackdrop(false);
  };

  async function getDataImage(file) {
    let result_base64 = await new Promise((resolve) => {
      let fileReader = new FileReader();
      fileReader.onload = (e) => resolve(fileReader.result);
      fileReader.readAsArrayBuffer(file);
    });
    return result_base64;
  }

  const createAsset = async (e) => {
    e.preventDefault();
    setBackdrop(true);
    setDisable(true);

    const validToken = await validateToken(auth);
    if (!validToken) {
      handleStatus("warning", "เซสชันหมดอายุ กรุณาล็อคอินใหม่อีกครั้ง");
      handleLoggedOut();
      navigate("/");
      return;
    }
    await window.ethereum.enable();

    try {
      let { cid, source } = await addIpfs(
        img,
        e.target["asset-name"].value,
        e.target["asset-description"].value
      );

      /*get txFee*/
      const token = `Bearer ${auth}`;
      const response = await fetch(
        `${
          process.env.REACT_APP_BACKEND_URL
        }/billings/createMintBilling?cid=${source.cid.toString()}/metadata.json`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      )
        .then((res) => res.json())
        .catch((err) => {
          throw new Error("Failed to Fetch TxFee Of MintBilling");
        });

      if (response.statusCode !== 200) {
        throw new Error("Failed to Fetch TxFee Of MintBilling");
      }

      const txFee = response.data;

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log(txFee);

      const tx = await signer.sendTransaction({
        to: process.env.REACT_APP_BACKEND_WALLET,
        value: ethers.utils.parseEther(txFee),
      });

      let collectionName = collectionList.filter((data) => {
        return data.id === collection;
      })[0].name;

      let newAsset = {
        name: e.target["asset-name"].value,
        description: e.target["asset-description"].value,
        fileName: img.name,
        fileType: img.type,
        collectionId: collection,
        collectionName: collectionName,
        cid: cid.path,
        metadata: `${source.cid.toString()}`,
        txHash: tx.hash,
        forceTest:false,
      };

      console.log(newAsset);
      const preSignedUrl = await fetch(`${process.env.REACT_APP_BACKEND_URL}/nfts`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token,
        },
        body: JSON.stringify(newAsset),
      })
        .then((res) => res.json())
        .catch((err) => {
          throw new Error("create failed");
        });

      console.log(preSignedUrl);

      if (preSignedUrl.statusCode === 201) {
        fetch(preSignedUrl.data.s3Url, {
          method: "PUT",
          headers: {
            Accept: "*/*",
            "Content-Type": img.type,
          },
          body: _arrayBufferToBase64(img.src),
        })
          .then((res) => res.status)
          .then((res) => {
            console.log("put image to s3 : " + res);
            handleStatus("success", "MINT NFT SUCCESS");
          })
          .catch((err) => {
            console.log(err);

            console.log("upload s3 error");
          });
      }
    } catch (err) {
      handleStatus("warning", "เกิดข้อผิดพลาด กรุณาทำรายการใหม่อีกครั้ง");
      console.log(err);
    } finally {
      setDisable(false);
      setBackdrop(false);
    }
  };

  return (
    <div className="createasset-root">
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backdropStatus}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
      <form onSubmit={createAsset}>
        <h1>Create New Item</h1>
        <h4>
          Image<span className="createasset-required">*</span>
        </h4>
        <UploadImage id="asset-image" img={img} handleImg={handleImg} resetImg={resetImg} />
        <h4>
          Name<span className="createasset-required">*</span>
        </h4>
        <TextField
          id="asset-name"
          type="text"
          placeholder="Item Name"
          fullWidth
          variant="outlined"
          size="small"
          required
        />

        <h4>Description</h4>
        <TextField
          id="asset-description"
          type="text"
          fullWidth
          multiline
          maxRows={4}
          minRows={4}
          placeholder="Provide a detailed description of your item"
          size="small"
          variant="outlined"
        />
        <h4>Collection</h4>
        <div className="flex ai-center">
          <div style={{ width: "85%" }}>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={""}
                value={collection}
                required
                onChange={handleChange}>
                <MenuItem value={""}>None Selected</MenuItem>
                {collectionList.map((value, index) => {
                  return (
                    <MenuItem key={value.id} value={value.id}>
                      {value.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div style={{ marginLeft: "24px" }} onClick={handleClickOpen}>
            <span className="createasset-modal-button">+</span>
            <span className="createasset-modal-button">Create Asset</span>
          </div>
        </div>
        <Button
          name="Submit"
          sx={{
            width: "fit-content",
            padding: "10px 20px",
            marginTop: "10px",
            backgroundColor: disableSubmit ? "rgba(0,0,0,0.1)" : "rgb(100,100,200)",
          }}
          type="submit"
          disable={disableSubmit}
        />
      </form>
      <Dialog open={open} fullWidth maxWidth="xs" onClose={handleClose}>
        <DialogTitle>Create New Collection</DialogTitle>
        <DialogContent>
          {errorMsg.severity !== "" && (
            <Fade in={errorMsg.severity !== ""}>
              <Alert
                severity={errorMsg.severity}
                onClose={() => {
                  setMsg({
                    severity: "",
                    message: "",
                  });
                }}>
                {errorMsg.message}
              </Alert>
            </Fade>
          )}
          <TextField
            autoFocus
            inputRef={collectionRef}
            helperText={"ชื่อของ Collection ต้องมีความยาวมากกว่าหรือเท่ากับ 6 ตัวอักษร"}
            margin="dense"
            id="name"
            label="Collection Name"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button
            name="Submit"
            onClick={createCollection}
            sx={{
              width: "fit-content",
              padding: "10px 20px",
              backgroundColor: "rgb(100,100,200)",
            }}
            type="submit"
          />
          <Button
            name="Cancel"
            onClick={handleClose}
            sx={{
              width: "fit-content",
              padding: "10px 20px",
              backgroundColor: "rgb(200,50,50)",
            }}
            type="submit"
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateAsset;
