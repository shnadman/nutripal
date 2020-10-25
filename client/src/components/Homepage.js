import React, { useEffect, useRef, useState } from "react";
import Box from "@material-ui/core/Box";
import FacetSearch from "./Searching/FacetSearch";
import { useSelector, useDispatch } from "react-redux";
import { clearResults, searchMacros } from "../features/macros";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useSelected } from "./utils/hooks";
import CreateComposition from "./MacrosTableAggregate/CreateComposition";
import ModifyComposition from "./MacrosTableAggregate/ModifyComposition";
import ControlledPagination from "./utils/ControlledPagination";
import MacrosLayout from "./MacrosLayout";

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
  visible: {},
}));

export default () => {
  const { data, pagination, params } = useSelector(
    (state) => state.macros.searchResults
  );
  const totalPages = pagination ? pagination.totalPages : null;
  const classes = useGridStyles("#fff");
  const dispatch = useDispatch();
  const dynamicSelecting = useSelected(data);
  const { selected, clearSelected } = dynamicSelecting;

  const handleClearResults = () => {
    dispatch(clearResults());
    clearSelected();
  };

  return (
    <Box>
      <Box className={classes.searchGroup}>
        <FacetSearch />
        {totalPages ? (
          <Box marginBottom="50px" marginTop="50px" alignSelf="center">
            <ControlledPagination count={totalPages} />
          </Box>
        ) : null}

        <MacrosLayout
          compositionCreateAction={<CreateComposition selected={selected} />}
          compositionUpdateAction={<ModifyComposition selected={selected} />}
          data={data}
          dynamicSelecting={dynamicSelecting}
        />
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
