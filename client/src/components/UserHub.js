import React, { useEffect } from "react";
import requireAuth from "./auth/requireAuth";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

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

const Feature = () => {
  const classes = useStyles();
  return (
    <Box width="100%" display="inline-flex" flexDirection="row">
      <div className={classes.root}>
        <Box alignSelf="center">
          <Link component={RouterLink} to="me/meals">
            <Typography variant="h3" className={classes.text}>
              To Meals
            </Typography>
          </Link>
        </Box>
      </div>
      <div className={classes.second}>
        <Box alignSelf="center">
          <Link component={RouterLink} to="me/compositions">
            <Typography variant="h3" className={classes.text}>
              To Compositions
            </Typography>
          </Link>
        </Box>
      </div>
    </Box>
  );
};

export default requireAuth(Feature);
