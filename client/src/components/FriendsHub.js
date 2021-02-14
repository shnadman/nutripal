import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHub } from "../features/basket";
import { getNotifications } from "../features/notifications";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import _ from "lodash";
import StarredMeals from "./UserHub/StarredMeals";
import { useStarredMeals } from "./utils/hooks";
import Compositions from "./UserHub/Compositions";
import Friends from "./UserHub/Friends";
import Button from "@material-ui/core/Button";

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
      "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5))," +
      "url(https://images.unsplash.com/photo-1504892612018-159ffa1d147f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)",
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

export default ({ history }) => {
  const { basket, userName, compositions, friends } = useSelector(
    (state) => state.friendsBasket
  );

  const [rendered, setRendered] = useState(null);
  const dispatch = useDispatch();
  const classes = useStyles();

  const renderFeature = () => {
    switch (rendered) {
      case "starred":
        return <StarredMeals basket={basket} />;
      case "compositions":
        return <Compositions compositions={compositions} />;
      case "friends":
        return <Friends friends={friends} history={history} />;
      default:
        return null;
    }
  };

  return (
    <Box>
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
            <Button
              onClick={() => setRendered("starred")}
              variant="text"
            >{`Favorite meals (${basket.length})`}</Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setRendered("compositions")} variant="text">
              {`Compositions (${compositions.length})`}
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => setRendered("friends")}
              variant="text"
            >{`Friends (${friends.length})`}</Button>
          </Grid>
        </Grid>
      </Paper>
      {renderFeature()}
    </Box>
  );
};
