import { useMediaQuery } from "@material-ui/core";
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
  clearBtn: { margin: "18px" },
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
  const { isLoading } = useSelector((state) => state.macros);
  const isMobile = useMediaQuery("(max-width:860px)");

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
            position="relative"
            top={isMobile ? "5vw" : "0"}
            left={isMobile ? "15vw" : "2vw"}
          >
            <Typography>Advanced filters</Typography>
            <Paper id="filters" className={classes.paper} variant="outlined">
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
            <>
              <Box
                id="results"
                paddingBottom="50px"
                position="absolute"
                left={isMobile ? "40vw" : "42vw"}
                marginTop={isMobile ? "200px" : "50px"}
                display="flex"
                justifyContent="space-around"
                flexDirection="column"
              >
                <ControlledPagination count={totalPages} />
                {!isLoading && (
                  <Typography
                    style={{ position: "relative", left: "15px", top: "15px" }}
                    variant="subtitle2"
                  >
                    {isMobile
                      ? ""
                      : "Click on the meal cards to reveal the aggregate table"}
                  </Typography>
                )}
              </Box>
            </>
          ) : null}
        </Box>
        <Box position="relative" marginTop={isMobile ? "18vh" : "0vh"}>
          <MacrosLayout
            compositionCreateAction={<CreateComposition selected={selected} />}
            compositionUpdateAction={<ModifyComposition selected={selected} />}
            data={data}
            dynamicSelecting={dynamicSelecting}
          />
        </Box>
      </Box>
      {!data ? null : (
        <Button
          className={classes.clearBtn}
          color="secondary"
          variant="contained"
          size="large"
          onClick={handleClearResults}
        >
          Clear Results
        </Button>
      )}
      <Divider />
    </Box>
  );
};
