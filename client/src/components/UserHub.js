import React, { useEffect } from "react";
import requireAuth from "./auth/requireAuth";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { Link as RouterLink, Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { getHub } from "../features/basket";
import Grid from "@material-ui/core/Grid";
import Compositions from "./UserHub/Compositions";
import StarredMeals from "./UserHub/StarredMeals";
import UserPanel from "./UserHub/UserPanel";

const useStyles = makeStyles((color) => ({
  appBarParent: {
    flexGrow: 1,
    marginTop: 30,
    height: 5000,
  },
  root: {
    height: "92vh",
    width: "50%",

    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7))," +
      "url(https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1900&q=80)",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "1000px 1200px",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },

  second: {
    height: "92vh",
    width: "50%",
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7))," +
      "url(https://images.unsplash.com/photo-1550728193-be87c574be86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  text: {
    color: "#fff",
  },
}));

const Feature = ({ match }) => {
  const dispatch = useDispatch();
  const { basket, userName, compositions } = useSelector(
    (state) => state.basket
  );
  debugger;

  useEffect(() => {
    setTimeout(() => dispatch(getHub()), 20);
  }, []);

  const classes = useStyles();
  return (
    <Box>
      <UserPanel />
      <Switch>
        <Route path={`${match.path}/meals`} exact component={StarredMeals} />
        <Route
          path={`${match.path}/compositions`}
          exact
          component={Compositions}
        />
      </Switch>
      <Box width="100%" display="inline-flex" flexDirection="row"></Box>
    </Box>
  );
};

export default requireAuth(Feature);
