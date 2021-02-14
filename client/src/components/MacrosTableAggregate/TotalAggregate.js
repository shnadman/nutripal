import React, { useEffect, useState } from "react";
import _ from "lodash";

import { useSelected } from "../utils/hooks";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import { lighten, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  totals: {
    marginRight: "60px",
  },
  mostRight: {
    marginRight: "10px",
  },
  mostLeft: {
    marginRight: "60px",
  },
  grp: {
    position: "relative",
  },
}));

export default ({ selected, aggTotals, totals }) => {
  const classes = useStyles();

  useEffect(() => {
    aggTotals();
  }, [selected]);

  return (
    <Box display="flex" justifyContent="space-between">
      <Typography>Totals</Typography>
      <Box className={classes.grp} display="flex" justifyContent="flex-end">
        <Typography className={classes.mostLeft}>
          {_.round(totals.calories, 1)}
        </Typography>
        <Typography className={classes.totals}>
          {_.round(totals.fat, 1)}g
        </Typography>
        <Typography className={classes.totals}>
          {_.round(totals.carbs, 1)}g
        </Typography>
        <Typography className={classes.mostRight}>
          {_.round(totals.protein, 1)}g
        </Typography>
      </Box>
    </Box>
  );
};
