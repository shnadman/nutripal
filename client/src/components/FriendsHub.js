import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Compositions from "./UserHub/Compositions";
import Friends from "./UserHub/Friends";
import StarredMeals from "./UserHub/StarredMeals";

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
