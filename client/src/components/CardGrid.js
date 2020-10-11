import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import MacrosCard from "./MacrosCard";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { searchMacros } from "../features/macros";
import useInfiniteScroll from "react-infinite-scroll-hook";

const useGridStyles = makeStyles(({ breakpoints }) => ({
  root: {
    [breakpoints.up("md")]: {
      justifyContent: "center",
      alignContent: "space-between",
    },
  },
}));

export default () => {
  const gridStyles = useGridStyles();
  const dispatch = useDispatch();
  const { data, pagination, params } = useSelector(
    (state) => state.macros.macros
  );
  let hasNextPage = true;
  let loading = false;

  function handleLoadMore() {
    loading = true;
    dispatch(searchMacros({ ...params, page: pagination.next.page }));
    hasNextPage = pagination.next ? true : false;
    loading = false;
  }

  const infiniteRef = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: handleLoadMore,
    scrollContainer: "window",
  });

  if (!data) {
    return null;
  }

  const renderedGrid = data.map(
    ({ name, protein, carbs, fat, calories, _id }) => {
      debugger;
      return (
        <Grid key={_id} ref={infiniteRef} xs item>
          <MacrosCard
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
