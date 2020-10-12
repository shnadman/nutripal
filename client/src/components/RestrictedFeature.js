import React, { Component, useEffect } from "react";
import requireAuth from "./auth/requireAuth";
import { getHub } from "../features/basket";
import { useSelector, useDispatch } from "react-redux";
import Container from "@material-ui/core/Container";
import CardGrid from "./CardGrid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: "40px",
  },
}));

const Feature = () => {
  const classes = useStyles();

  const basket = useSelector((state) => state.basket.basket);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHub());
  }, []);

  return (
    <div>
      <Typography variant="h4" color="primary">
        Your starred meals
      </Typography>
      <Container maxWidth="md">
        <CardGrid data={basket} />
      </Container>
    </div>
  );
};

export default requireAuth(Feature);
