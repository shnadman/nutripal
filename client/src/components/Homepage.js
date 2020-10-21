import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import FacetSearch from "./Searching/FacetSearch";
import CardGrid from "./CardGrid";
import Container from "@material-ui/core/Container";
import { useSelector, useDispatch } from "react-redux";
import { clearResults } from "../features/macros";
import Button from "@material-ui/core/Button";
import { StarAction } from "./CardComponents/CardActions";
import { makeStyles } from "@material-ui/core/styles";
import { useSelected } from "./utils/hooks";
import MacrosAggTable from "./MacrosTableAggregate/FullTable";
import { useSpring, animated, useTransition } from "react-spring";
import CreateComposition from "./MacrosTableAggregate/CreateComposition";

const useGridStyles = makeStyles((color) => ({
  sideMenu: {
    display: "flex",
    flexDirection: "column",
    width: "25%",
  },
  searchGroup: {
    display: "flex",
    flexDirection: "column",
  },
  container: {
    marginTop: "70px",
  },
}));

export default (props) => {
  const { data, pagination, params } = useSelector(
    (state) => state.macros.searchResults
  );
  const classes = useGridStyles("#fff");
  const dispatch = useDispatch();
  const dynamicSelecting = useSelected(data);
  const { selected, anySelected, clearSelected } = dynamicSelecting;
  const springProps = useSpring({
    opacity: anySelected ? 1 : 0,
    from: { opacity: 0 },
  });

  const handleClearResults = () => {
    dispatch(clearResults());
    clearSelected();
  };

  const transition = useTransition(anySelected, null, {
    from: { transform: "translate3d(-250px,0,0)" },
    enter: { transform: "translate3d(0,0px,0)" },
    leave: { transform: "translate3d(-250px,0,0)" },
  });

  return (
    <Box>
      <Box className={classes.searchGroup}>
        <FacetSearch />
        <Box display="flex">
          <Container className={classes.container} maxWidth="md">
            <CardGrid
              data={data}
              dynamicSelecting={dynamicSelecting}
              pagination={pagination}
              params={params}
              curriedCardAction={(id, starred) => (
                expanded,
                handleExpandClick,
                commentsCount
              ) => (
                <StarAction
                  id={id}
                  starred={starred}
                  expanded={expanded}
                  handleExpandClick={handleExpandClick}
                  commentsCount={commentsCount}
                />
              )}
            />
          </Container>
          <MacrosAggTable
            rows={selected}
            dynamicSelecting={dynamicSelecting}
            compositionAction={<CreateComposition selected={selected} />}
          />
        </Box>
      </Box>
      {!data ? null : (
        <Button
          color="secondary"
          variant="contained"
          onClick={handleClearResults}
        >
          Clear Results
        </Button>
      )}
    </Box>
  );
};
