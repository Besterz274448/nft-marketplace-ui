import React from "react";
import { FormGroup,Checkbox,FormControlLabel} from "@mui/material";
import "../asset/components.css";


function SelectBox(props) {
  return (
    <FormGroup>
      {props.option.map((l, i) => {
        return (
          <div className="accord-box">
            <FormControlLabel value={l} control={<Checkbox />} label={l} labelPlacement="end" />
          </div>
        );
      })}
    </FormGroup>
  );
}

export default SelectBox;
