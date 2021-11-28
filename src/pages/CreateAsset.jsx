import React from "react";
import "../asset/main.css";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "../components/Button";
import UploadImage from "../components/UploadImage";
import ipfs from "../config/ipfs";

function CreateAsset({ auth }) {
  const [age, setAge] = React.useState(10);
  const [disableSubmit, setDisable] = React.useState(true);
  const [img, setImg] = React.useState({
    src: "",
    name: "",
    type: "",
  });

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
    setAge(event.target.value);
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
    setDisable(true);
    const cid = await ipfs.add(img.src);
    const source = await ipfs.add(
      {
        path: "metadata.json",
        content: JSON.stringify({
          name: img.name,
          description: e.target["asset-description"].value,
          image: `https://ipfs.io/ipfs/${cid.path}`,
        }),
      },
      {
        wrapWithDirectory: true,
      }
    );

    let newAsset = {
      name: e.target["asset-name"].value,
      description: e.target["asset-description"].value,
      fileName: img.name,
      fileType: img.type,
      cid: cid.path,
      collectionId: "306af3fa-9d28-472b-8c4e-961749f49ea4",
      collectionName: "Potato",
      metadata: source.cid.toString(),
    };

    console.log(newAsset);

    const token = `Bearer ${auth}`;
    //use state auth from main
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products`, {
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
        window.alert(err);
      });
    console.log(response);
    if (response.statusCode === 201) {
      fetch(response.data.s3Url, {
        method: "PUT",
        headers: {
          Accept: "*/*",
          "Content-type": img.type,
        },
        body: _arrayBufferToBase64(img.src),
      })
        .then((res) => res.status)
        .then((res) => {
          console.log("put image to s3 : " + res);
          setDisable(false);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="createasset-root">
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
        <div>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={age}
              onChange={handleChange}
              autoWidth>
              <MenuItem value={10}>Twenty</MenuItem>
              <MenuItem value={21}>Twenty one</MenuItem>
              <MenuItem value={22}>Twenty one and a half</MenuItem>
            </Select>
          </FormControl>
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
    </div>
  );
}

export default CreateAsset;
