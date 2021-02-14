import React, { useEffect, useState } from "react";
import UserPanel from "./UserPanel";
import Box from "@material-ui/core/Box";
import { useDispatch, useSelector } from "react-redux";
import { getFriends } from "../../features/basket";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Color from "color";
import { useSelected } from "../utils/hooks";
import { getFriendsHub } from "../../features/friendsBasket";
import CardActions from "@material-ui/core/CardActions";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Button from "@material-ui/core/Button";
import { respondFriendRequest } from "../../features/basket";
import { formatDistance } from "date-fns";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: theme.palette.backgroundColor,
    borderRadius: 14,

    "&:hover": {
      boxShadow: `0 6px 12px 10px ${Color("#665e5e")
        .rotate(-12)
        .darken(0.2)
        .fade(0.5)}`,
      transform: "scale(1.02,1.02)",
      transition: "0.1s",
    },
  },

  inline: {
    display: "inline",
  },
  timestamp: {
    fontWeight: "light",
    fontSize: "13px",
    color: "#d0cccc",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default ({ history, closePopper }) => {
  const classes = useStyles();
  const dynamicSelecting = useSelected([]);

  const { notifications } = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getFriends());
  // }, []);

  const handleConfirm = (id) => {
    dispatch(respondFriendRequest(id, "accept"));
  };
  const handleDelete = (id) => {
    dispatch(respondFriendRequest(id, "reject"));
  };
  const renderNotifications = notifications.map((notification) => {
    return (
      <Grid key={notification._id} xs item container alignItems="flex-start">
        <Card raised className={classes.card}>
          <CardContent>
            <Box display="flex" wrap="wrap">
              <Avatar
                alt={notification.msg}
                src="/static/images/avatar/1.jpg"
              />
              <Typography>{notification.msg}</Typography>
            </Box>
            <Box>{`${2} mutual friends`}</Box>
            <Box paddingTop="10px">
              {
                <Typography className={classes.timestamp}>
                  {formatDistance(new Date(notification.createdAt), Date.now())}
                </Typography>
              }
            </Box>
          </CardContent>
          <CardActions>
            <Button
              onClick={() => handleConfirm(notification._id)}
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<CheckCircleOutlineIcon />}
            >
              Confirm
            </Button>
            <Button
              onClick={() => handleDelete(notification._id)}
              variant="contained"
              color="disabled"
              className={classes.button}
              startIcon={<HighlightOffIcon />}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  });

  return (
    <div>
      <Box display="flex">
        <Grid container spacing={2} direction="column">
          <Typography variant="h5">Notifications</Typography>
          {renderNotifications}
        </Grid>
      </Box>
    </div>
  );
};
