import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearResults } from "../features/macros";
import background from "../static/back1.jpg";
import MacrosLayout from "./MacrosLayout";
import CreateComposition from "./MacrosTableAggregate/CreateComposition";
import ModifyComposition from "./MacrosTableAggregate/ModifyComposition";
import CategoryFilter from "./Searching/CategoryFilter";
import FacetSearch from "./Searching/FacetSearch";
import SortBy from "./Searching/SortBy";
import ControlledPagination from "./utils/ControlledPagination";
import { useAdvancedSearch, useSelected } from "./utils/hooks";

const useGridStyles = makeStyles(() => ({
  sideMenu: {
    display: "flex",
    flexDirection: "column",
    width: "25%",
  },
  bg: {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.9),rgba(0,0,0,0.45)), url(${background})`,
    backgroundSize: "cover",
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
