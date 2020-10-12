import React from "react";
import Box from "@material-ui/core/Box";
import SearchBar from "./SearchBar";
import FacetSearch from "./FacetSearch";
import CardGrid from "./CardGrid";
import Container from "@material-ui/core/Container";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { useSelector } from "react-redux";

export default () => {
  const { data, pagination, params } = useSelector(
    (state) => state.macros.macros
  );
  return (
    <Box>
      <SearchBar helperTitle="Search for some meals" placeholder={"Search"} />
      <FacetSearch />
      <Container>
        <CardGrid data={data} pagination={pagination} params={params} />
      </Container>
    </Box>
  );
};
