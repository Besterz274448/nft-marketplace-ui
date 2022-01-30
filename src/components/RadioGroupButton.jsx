import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import "../asset/components.css";

function RadioGroupButton(props) {
  return (
    <RadioGroup
      aria-label={props.title}
      defaultValue={props.option[0]}
      name={props.title + "radio-group"}>
      {props.option.map((l, i) => {
        return (
          <div key={l+i} className="accord-box">
            <FormControlLabel value={l}  onChange={props.onChange} control={<Radio />} label={<div className="b">{l}</div>} />
          </div>
        );
      })}
    </RadioGroup>
  );
}

export default RadioGroupButton;
