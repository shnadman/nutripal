import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import _ from "lodash";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFriend, sendFriendRequest } from "../features/basket";
import requireAuth from "./auth/requireAuth";
import Compositions from "./UserHub/Compositions";
import Friends from "./UserHub/Friends";
import StarredMeals from "./UserHub/StarredMeals";

const useStyles = makeStyles((theme) => ({
  appBarParent: {
    flexGrow: 1,
    marginTop: 30,
    height: 5000,
  },
  root: (props) => ({
    borderRadius: 12,
    backgroundImage: props.backgroundImage,
    backgroundRepeat: "no-repeat",
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "25vh",
    paddingTop: "5vh",
    borderBottom: "1px groove #fff",
  }),
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    alignSelf: "center",
    position: "relative",
  },

  menu: {
    position: "relative",
    bottom: "20%",
    display: "flex",
    marginLeft: "20px",
    justifyContent: "flex-start",
  },

  text: {
    color: "#fff",
  },
}));

const UserHub = ({ history, useData, friendFlag, styleProps, match }) => {
  const { userId } = useSelector((state) => state.auth);
  const { basket, userName, compositions, friends, avatar } = useData();
  const friendId = match.params.id;
  const isFriend = _.find(friends, ["_id", userId]);
  const [rendered, setRendered] = useState("starred");
  const dispatch = useDispatch();
  const classes = useStyles(styleProps);

  const handleSendRequest = (isFriend) => {
    isFriend
      ? dispatch(removeFriend(friendId))
      : dispatch(sendFriendRequest(friendId));
  };

  const renderButton = isFriend ? (
    <Button
      onClick={() => handleSendRequest(isFriend)}
      variant="contained"
      size="small"
      color="secondary"
    >
      Remove from friends
    </Button>
  ) : (
    <Button
      onClick={() => handleSendRequest(isFriend)}
      variant="contained"
      color="secondary"
      size="small"
    >
      Send friend request
    </Button>
  );

  const friendRequestProps = { handleSendRequest, isFriend, renderButton };

  const renderFeature = () => {
    switch (rendered) {
      case "starred":
        return <StarredMeals basket={basket} />;
      case "compositions":
        return <Compositions compositions={compositions} />;
      case "friends":
        return (
          <Friends
            friends={friends}
            history={history}
            friendRequestProps={friendRequestProps}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      <Paper className={classes.root}>
        <Avatar alt={userName} src={avatar} className={classes.avatar} />
        <Typography style={{ alignSelf: "center" }} variant="h3">
          {`${userName}'s basket`}
        </Typography>
        <Box position="relative" left="60%" right="40%" bottom="5%">
          {friendFlag ? (
            renderButton
          ) : (
            <Button
              onClick={() => history.push("/api/users/me/edit")}
              variant="outlined"
            >
              Edit profile
            </Button>
          )}
        </Box>
        <Box className={classes.menu}>
          <Button
            onClick={() => setRendered("starred")}
            variant="text"
          >{`Favorite meals (${basket.length})`}</Button>
          <Button onClick={() => setRendered("compositions")} variant="text">
            {`Compositions (${compositions.length})`}
          </Button>
          <Button
            onClick={() => setRendered("friends")}
            variant="text"
          >{`Friends (${friends.length})`}</Button>
        </Box>
      </Paper>
      {renderFeature()}
    </Box>
  );
};

export default requireAuth(UserHub);
