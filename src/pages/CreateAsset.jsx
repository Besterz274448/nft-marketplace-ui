import React from "react";
import "../asset/main.css";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "../components/Button";

function CreateAsset() {
  const [age, setAge] = React.useState(10);

  const handleChange = (event) => {
    setAge(event.target.value);
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
    //reading image file
    let src = await getDataImage(e.target["asset-image"].files[0]);

    console.log(e);
    console.log(src);

    if(e.target["asset-image"].files[0].type === "image/jpeg"){
    }
    //set value;
    let image = "";
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

  //useEffect must call userCollection from backend
  return (
    <div className="createasset-root">
      <form onSubmit={createAsset}>
        <h1>Create New Item</h1>
        <h4>
          Image<span className="createasset-root-required">*</span>
        </h4>
        {/* drop zone */}
        <input id="asset-image" type="file" multiple accept="image/*" required></input>
        <h4>
          Name<span className="createasset-root-required">*</span>
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
          fullWidth
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
          sx={{ width: "fit-content", padding: "10px 20px", backgroundColor: "rgb(100,100,200)" }}
          type="submit"
        />
      </form>
    </div>
  );
}

export default CreateAsset;
