import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { fade, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./Searching/SearchBar";
import Login from "./utils/Modal";
import NotificationsPopper from "./utils/NotificationsPopper";
import ProfilePopupMenu from "./utils/ProfilePopupMenu";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },

  menuButton: {
    marginRight: theme.spacing(2),
    variant: "secondary",
  },
  title: {
    fontSize: 20,
    display: "none",
    textTransform: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  btns: { textTransform: "none", fontSize: 17 },
  sectionDesktop: {
    display: "flex",
    position: "relative",
    top: "5px",
    justifyContent: "space-between",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  toolbar: { height: "5vh" },
}));

export default function PrimarySearchAppBar({ history }) {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Link to="/home">
            <Button className={classes.title} size="large">
              NutriPal
            </Button>
          </Link>
          <SearchBar placeholder={"Search by name..."} />
          <div className={classes.grow} />
          <Box className={classes.sectionDesktop}>
            <Login />
            <Link to="/signup">
              <Button
                className={classes.btns}
                variant="contained"
                color="primary"
              >
                Sign up
              </Button>
            </Link>
            <NotificationsPopper />
            <ProfilePopupMenu history={history} />
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}
