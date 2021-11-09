import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FormGroup } from "@mui/material";

export default function AccordionCom(props) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header">
        <Typography>{props.title}</Typography>
      </AccordionSummary>
      <AccordionDetails style={{ paddingLeft: "35px" }}>
        {props.select == true ? (
          <FormGroup>
            {props.option.map((l, i) => {
              return (
                <FormControlLabel value={l} control={<Checkbox />} label={l} labelPlacement="end" />
              );
            })}
          </FormGroup>
        ) : (
          <RadioGroup
            aria-label={props.title}
            defaultValue={props.option[0]}
            name={props.title + "radio-group"}>
            {props.option.map((l, i) => {
              return <FormControlLabel value={l} control={<Radio />} label={l} />;
            })}
          </RadioGroup>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
