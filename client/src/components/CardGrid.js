import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import _ from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MacrosCard from "./CardComponents/MacrosCard";
import ThreeDCard from "./CardComponents/ThreeDCard";

const useGridStyles = makeStyles(({ breakpoints }) => ({
  root: {
    [breakpoints.up("md")]: {
      justifyContent: "center",
      alignContent: "space-between",
    },
  },
}));

export default ({ data, curriedCardAction, dynamicSelecting }) => {
  const gridStyles = useGridStyles();
  useDispatch();
  const { isLoading } = useSelector((state) => state.macros);

  const noResults = !data || _.isEmpty(data) || _.isUndefined(data);

  if (noResults || isLoading) {
    return null;
  }

  const renderedGrid = _.map(data, (row) => {
    return (
      <Grid container key={row._id} xs={12} md={6} lg={4} item>
        <ThreeDCard
          component={
            <MacrosCard
              raised
              data={row}
              dynamicSelecting={dynamicSelecting}
              image={
                "https://images2.minutemediacdn.com/image/upload/c_crop,h_1126,w_2000,x_0,y_181/f_auto,q_auto,w_1100/v1554932288/shape/mentalfloss/12531-istock-637790866.jpg"
              }
              curriedCardAction={curriedCardAction(row._id, row.starred)}
            />
          }
        />
      </Grid>
    );
  });

  return (
    <>
      <Grid classes={gridStyles} container spacing={8}>
        {renderedGrid}
      </Grid>
    </>
  );
};
