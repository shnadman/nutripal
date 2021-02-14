import React, { useEffect, useRef, useState } from "react";
import Box from "@material-ui/core/Box";
import FacetSearch from "./Searching/FacetSearch";
import { useSelector, useDispatch } from "react-redux";
import { clearResults, searchMacros } from "../features/macros";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useAdvancedSearch, useSelected } from "./utils/hooks";
import CreateComposition from "./MacrosTableAggregate/CreateComposition";
import ModifyComposition from "./MacrosTableAggregate/ModifyComposition";
import ControlledPagination from "./utils/ControlledPagination";
import MacrosLayout from "./MacrosLayout";
import SortBy from "./Searching/SortBy";
import BrandToggle from "./Searching/BrandToggle";
import CategoryFilter from "./Searching/CategoryFilter";
import { getNotifications } from "../features/notifications";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import background from "../static/back1.jpg";
import Copyright from "./Copyright";
import Divider from "@material-ui/core/Divider";

const useGridStyles = makeStyles((color) => ({
  sideMenu: {
    display: "flex",
    flexDirection: "column",
    width: "25%",
  },
  bg: {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.9),rgba(0,0,0,0.45)), url(${background})`,
    backgroundSize:"cover",
    zIndex: -2,
  },
  searchGroup: {
    display: "flex",
    flexDirection: "column",
  },
  container: {
    marginTop: "70px",
  },
  paper: {
    backgroundColor: "transparent ",
    border: "1.5px solid",
    borderRadius: 12,
  },
}));

export default () => {
  const { data, pagination } = useSelector(
    (state) => state.macros.searchResults
  );
  const {
    sortBy,
    setSortBy,
    ascending,
    setAscending,
    branded,
    setBranded,
    category,
    setCategory,
  } = useAdvancedSearch();
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
    <Box className={classes.bg}>
      <Box className={classes.searchGroup}>
        <FacetSearch
          sortBy={sortBy}
          ascending={ascending}
          branded={branded}
          category={category}
        />
        <Box display="flex" justifyContent="space-between">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            maxWidth="300px"
          >
            <Typography>Advanced filters</Typography>
            <Paper className={classes.paper} variant="outlined">
              <SortBy
                sortBy={sortBy}
                setSortBy={setSortBy}
                ascending={ascending}
                setAscending={setAscending}
              />
              <CategoryFilter category={category} setCategory={setCategory} />
              {/*<BrandToggle branded={branded} setBranded={setBranded} />*/}
            </Paper>
          </Box>

          {totalPages ? (
            <Box
              paddingBottom="50px"
              marginRight="40vw"
              marginTop="50px"
              flexSrink="1"
            >
              <ControlledPagination count={totalPages} />
            </Box>
          ) : null}
        </Box>

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
      <Divider />
    </Box>
  );
};
