import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CreateIcon from "@material-ui/icons/Create";
import TextFieldWithButton from "../utils/TextFieldWithButton";
import { useDispatch, useSelector } from "react-redux";
import { modifyComposition } from "../../features/basket";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { useCompositions } from "../utils/hooks";
import AddIcon from "@material-ui/icons/Add";
import _ from "lodash";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import DeleteComposition from "./DeleteComposition";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Color from "color";

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    [breakpoints.up("md")]: {
      justifyContent: "center",
      alignContent: "space-between",
    },
  },
  grid: {
    wrap: "wrap",
  },

  selected: ({ color }) => ({
    borderRadius: 16,
    transition: "0.2s",
    transform: "matrix(0,-20px)",
    boxShadow: `2px 2px 10px 10px ${Color(color)
      .rotate(-12)
      .lighten(0.6)
      .fade(0.5)
      .mix(Color("red"))}`,
  }),
}));

export default ({ selected }) => {
  const classes = useStyles();
  const { compositions, setChosenComposition, isSelected } = useCompositions();
  const dispatch = useDispatch();
  const handleModify = async (compId, name) => {
    let mealIds = selected.map((m) => m._id);
    dispatch(modifyComposition(name, mealIds, compId));
  };

  const renderedMiniComps = _.map(compositions, (composition) => {
    return (
      <div className={isSelected(composition._id) ? classes.selected : ""}>
        <Grid
          direction="column"
          justify="flex-start"
          alignItems="baseline"
          container
          key={composition._id}
          xs="3"
          item
        >
          <Chip
            color="secondary"
            deleteIcon={<AddIcon />}
            onDelete={() => handleModify(composition._id, composition.name)}
            avatar={<Avatar>{composition.name[0]}</Avatar>}
            label={composition.name}
          />
        </Grid>
      </div>
    );
  });

  return (
    <Accordion>
      <AccordionSummary>
        <Typography>Add to existing composition</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box display="flex" wrap="wrap" maxWidth="30px">
          {renderedMiniComps}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
