import React, { useEffect, useState } from "react";
import _ from "lodash";

import { useSelected } from "../utils/hooks";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";

export default ({ selected, aggTotals, totals }) => {
  useEffect(() => {
    aggTotals();
  }, [selected]);

  return (
    <Box display="flex" justifyContent="space-around">
      <Typography>Calories: {_.round(totals.calories, 1)} </Typography>
      <Typography>Fat: {_.round(totals.fat, 1)} </Typography>
      <Typography>Protein: {_.round(totals.protein, 1)} </Typography>
      <Typography>Carbs: {_.round(totals.carbs, 1)} </Typography>
    </Box>
  );
};
