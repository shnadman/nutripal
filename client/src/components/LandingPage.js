import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";

const useStyles = makeStyles(() => ({
  appBarParent: {
    flexGrow: 1,
    marginTop: 30,
    height: 5000,
  },
  root: {
    height: "70vh",
    width: "100%",
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7))," +
      "url(https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1935&q=80)",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    zIndex: "-1",
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },

  second: {
    height: "70vh",
    width: "100%",
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7))," +
      "url(https://images.unsplash.com/photo-1518843875459-f738682238a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1926&q=80)",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    zIndex: "-1",
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },

  demo: {
    height: "90vh",
    width: "100%",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
  },
  typography: {
    zIndex: "1",
    color: "white",
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <Box>
      <Paper className={classes.root}>
        <Box alignSelf="center">
          <Typography variant="h2" className={classes.typography}>
            Discover amazing meals to suit your needs
          </Typography>
        </Box>
      </Paper>
      <Paper className={classes.demo}>
        <Box alignSelf="center">
          <Typography variant="h3" className={classes.typography}>
            Just set the macros you want and you're good to go
          </Typography>
        </Box>
      </Paper>
      <Paper className={classes.second}>
        <Box alignSelf="center">
          <Typography variant="h2" className={classes.typography}>
            See what your're friends are into!
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};
