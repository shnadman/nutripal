import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

import _ from "lodash";
import Button from "@material-ui/core/Button";
import Color from "color";
import DeleteComposition from "../MacrosTableAggregate/DeleteComposition";

const useGridStyles = makeStyles(({ breakpoints }) => ({
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

export default ({ data, renderSelectedComposition, isSelected }) => {
  const classes = useGridStyles();
  const dispatch = useDispatch();

  if (!data || _.isEmpty(data) || _.isUndefined(data)) {
    return null;
  }
  const renderedGrid = _.map(data, (composition) => {
    return (
      <div className={isSelected(composition._id) ? classes.selected : ""}>
        <Grid container key={composition._id} xs="4" item>
          <Button
            onClick={() => renderSelectedComposition(composition)}
            variant="contained"
            color="primary"
          >
            {composition.name}
          </Button>
          <DeleteComposition _id={composition._id} />
        </Grid>
      </div>
    );
  });
  return (
    <div>
      <Grid container s>
        {renderedGrid}
      </Grid>
    </div>
  );
};
