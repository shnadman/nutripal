import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100px",
    backgroundColor: "#1f1d19",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
}));

export default () => {
  const classes = useStyles();

  return <div className={classes.root}>Copyright © 2020–2021 Nadav Sherf</div>;
};