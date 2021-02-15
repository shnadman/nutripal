import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { getHub } from "../../features/basket";

const useStyles = makeStyles(() => ({
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
