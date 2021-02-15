import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import Color from "color";
import _ from "lodash";
import React from "react";
import { useDispatch } from "react-redux";
import { modifyComposition } from "../../features/basket";
import { useCompositions } from "../utils/hooks";

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

  item: {
    backgroundColor: "rgba(255,255,255,0.03)",
    border: "0.7px solid white",
    borderRadius: 14,
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
  const { compositions, isSelected } = useCompositions();
  const dispatch = useDispatch();
  const handleModify = async (compId, name) => {
    let mealIds = selected.map((m) => m._id);
    dispatch(modifyComposition(name, mealIds, compId));
  };

  const renderedMiniComps = _.map(compositions, (composition) => {
    return (
      <div
        key={composition._id}
        className={isSelected(composition._id) ? classes.selected : ""}
      >
        <Grid
          direction="column"
          justify="flex-start"
          alignItems="baseline"
          container
          xs={3}
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
    <Accordion className={classes.item}>
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
