import React from "react";
import "../asset/main.css";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "../components/Button";
import UploadImage from "../components/UploadImage";

function CreateAsset() {
  const [age, setAge] = React.useState(10);
  const [img, setImg] = React.useState({
    src: "",
    name: "",
    type: "",
  });

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleImg = async (files) => {
    let newSrc = {};
    newSrc.name = files[0].name;
    newSrc.type = files[0].type;
    newSrc.src = await getDataImage(files[0]);
    console.log(newSrc)
    setImg(newSrc);
  };

  const resetImg = () => {
    setImg({
      src: "",
      name: "",
      type: "",
    });
  };

  async function getDataImage(file) {
    let result_base64 = await new Promise((resolve) => {
      let fileReader = new FileReader();
      fileReader.onload = (e) => resolve(fileReader.result);
      fileReader.readAsDataURL(file);
    });
    return result_base64;
  }

  const createAsset = async (e) => {
    e.preventDefault();
    //set value;
    let newAsset = {
      name: e.target["asset-name"].value,
      description: e.target["asset-description"].value,
      imageName: e.target["asset-image"].files[0].name,
      imageType: e.target["asset-image"].files[0].type,
    };
    console.log(newAsset);
    //adding data to db;
    //if http.statuscode === 200 > add image file to s3
  };

  return (
    <div className="createasset-root">
      <form onSubmit={createAsset}>
        <h1>Create New Item</h1>
        <h4>
          Image<span className="createasset-required">*</span>
        </h4>
        <UploadImage id="" img={img} handleImg={handleImg} resetImg={resetImg} />
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
            backgroundColor: img.src === "" ? "rgba(0,0,0,0.1)" : "rgb(100,100,200)",
          }}
          type="submit"
          disable={img.src === "" ? true:false}
        />
      </form>
    </div>
  );
}

export default CreateAsset;
