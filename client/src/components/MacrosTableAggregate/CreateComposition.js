import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import AddBoxIcon from "@material-ui/icons/AddBox";
import React from "react";
import { useDispatch } from "react-redux";
import { addComposition } from "../../features/basket";
import TextFieldWithButton from "../utils/TextFieldWithButton";

const useStyles = makeStyles({
  item: {
    backgroundColor: "rgb(101,39,125,0.3)",
    border: "0.7px solid white",
    borderRadius: 14,
  },
});

export default ({ selected }) => {
  const dispatch = useDispatch();
  const onSubmit = async ({ compositionName }) => {
    let mealIds = selected.map((m) => m._id);
    dispatch(addComposition(compositionName, mealIds));
  };
  const classes = useStyles();

  return (
    <Accordion className={classes.item}>
      <AccordionSummary>
        <Typography variant="subtitle1">CREATE COMPOSITION</Typography>
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
