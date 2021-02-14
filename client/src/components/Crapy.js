import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHub } from "../features/basket";
import { getNotifications } from "../features/notifications";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import _ from "lodash";

const useStyles = makeStyles((color) => ({
  appBarParent: {
    flexGrow: 1,
    marginTop: 30,
    height: 5000,
  },
  root: {
    marginBottom: "80px",
    borderRadius: 12,
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7))," +
      "url(https://images.unsplash.com/photo-1562772186-ad68d3906ca9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80)",
    backgroundRepeat: "no-repeat",

    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "22vh",
  },

  text: {
    color: "#fff",
  },
}));

export default () => {
  const { basket, userName, compositions, friends } = useSelector(
    (state) => state.basket
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getHub());
    dispatch(getNotifications());
  }, []);

  return (
    <Paper className={classes.root}>
      <Typography style={{ alignSelf: "center" }} variant="h2">
        {`${userName}'s basket`}
      </Typography>
      <Grid
        style={{ marginLeft: "20px" }}
        container
        justify="flex-start"
        alignItems="center"
        direction="row"
        spacing={8}
      >
        <Grid item>
          <Link
            component={RouterLink}
            to={{
              pathname: "/api/users/me/meals",
            }}
          >
            <Typography variant="h6" className={classes.text}>
              {`Favorite meals (${basket.length})`}
            </Typography>
          </Link>
        </Grid>
        <Grid item>
          <Link
            component={RouterLink}
            to={{
              pathname: "/api/users/me/compositions",
            }}
          >
            <Typography variant="h6" className={classes.text}>
              {`Compositions (${compositions.length})`}
            </Typography>
          </Link>
        </Grid>
        <Grid item>
          <Link
            component={RouterLink}
            to={{
              pathname: "/api/users/me/friends",
            }}
          >
            <Typography variant="h6" className={classes.text}>
              {`Friends (${friends.length})`}
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );
};
