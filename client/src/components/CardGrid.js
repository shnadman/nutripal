import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import MacrosCard from "./MacrosCard";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { searchMacros } from "../features/macros";
import useInfiniteScroll from "react-infinite-scroll-hook";
import _ from "lodash";

const useGridStyles = makeStyles(({ breakpoints }) => ({
  root: {
    [breakpoints.up("md")]: {
      justifyContent: "center",
      alignContent: "space-between",
    },
  },
}));

export default ({ data, params, pagination }) => {
  const gridStyles = useGridStyles();
  const dispatch = useDispatch();

  // let hasNextPage = true;
  // let loading = false;
  //
  // function handleLoadMore() {
  //   loading = true;
  //   dispatch(searchMacros({ ...params, page: pagination.next.page }));
  //   hasNextPage = pagination.next ? true : false;
  //   loading = false;
  // }
  //
  // const infiniteRef = useInfiniteScroll({
  //   loading,
  //   hasNextPage,
  //   onLoadMore: handleLoadMore,
  //   scrollContainer: "window",
  // });

  if (!data || _.isEmpty(data) || _.isUndefined(data)) {
    return null;
  }
  debugger;
  const renderedGrid = data.map(
    ({ name, protein, carbs, fat, calories, _id }) => {
      return (
        <Grid key={_id} xs item>
          <MacrosCard
            id={_id}
            title={name}
            protein={protein}
            carbs={carbs}
            fat={fat}
            calories={calories}
            image={
              "https://images2.minutemediacdn.com/image/upload/c_crop,h_1126,w_2000,x_0,y_181/f_auto,q_auto,w_1100/v1554932288/shape/mentalfloss/12531-istock-637790866.jpg"
            }
          />
        </Grid>
      );
    }
  );

  return (
    <>
      <Grid classes={gridStyles} container spacing={8}>
        {renderedGrid}
      </Grid>
    </>
  );
};
