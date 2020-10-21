import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import AddBoxIcon from "@material-ui/icons/AddBox";
import TextFieldWithButton from "../utils/TextFieldWithButton";
import { useDispatch } from "react-redux";
import { addComposition } from "../../features/basket";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
export default ({ selected }) => {
  const dispatch = useDispatch();
  const onSubmit = async ({ compositionName }) => {
    let mealIds = selected.map((m) => m._id);
    dispatch(addComposition(compositionName, mealIds));
  };

  return (
    <Accordion>
      <AccordionSummary>
        <Typography>Create composition</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextFieldWithButton
          onSubmit={onSubmit}
          icon={<AddBoxIcon />}
          placeholder={"Name your composition"}
          buttonText="Add"
          name="compositionName"
        />
      </AccordionDetails>
    </Accordion>
  );
};
