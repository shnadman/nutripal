import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";

const useStyles = makeStyles(() => ({
  root: {
    minHeight: "50px",
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
