import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import "../asset/components.css";

export default function AccordionCom(props) {
  const [expanded, setExpand] = React.useState(true);
  return (
    <Accordion expanded={expanded}>
      <AccordionSummary
        onClick={() => setExpand(!expanded)}
        expandIcon={expanded ? <CloseIcon /> : <AddIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header">
        <div className="accord-title b">{props.title}</div>
      </AccordionSummary>
      <AccordionDetails>{props.children}</AccordionDetails>
    </Accordion>
  );
}
