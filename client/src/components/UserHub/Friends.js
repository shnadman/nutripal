import React, { useEffect, useState } from "react";
import UserPanel from "./UserPanel";
import Box from "@material-ui/core/Box";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import _ from "lodash";
import { useSelected, useUsersSearch } from "../utils/hooks";
import { getFriendsHub } from "../../features/friendsBasket";
import { getHub } from "../../features/basket";
import TextFieldWithButton from "../utils/TextFieldWithButton";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import background from "../../static/back7.jpg";

const useStyles = makeStyles((theme) => ({
  card: {
    position: "relative",
    left: "10px",
    width: "430px",
    height: "200px",
    backgroundColor: "rgba(255,255,255,0.15)",
    border: "0.7px solid white",
    borderRadius: 8,
  },
  bg: {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.95),rgba(0,0,0,0.55)), url(${background})`,
    backgroundPosition: "center bottom",
    paddingTop: "80px",
    minHeight: "75vh",
  },
  subtitle: {
    fontFamily: " sofia-pro, Helvetica,",
    color: "#fff",
    opacity: 0.87,
    marginTop: "0.5rem",
    fontWeight: 400,
    fontSize: 20,
  },
  inline: {
    display: "inline",
  },
  avatar: {
    width: theme.spacing(11),
    height: theme.spacing(11),
  },
  searchResult: { overflowY: "scroll", height: "90vh" },
}));

export default ({ history, friends, friendRequestProps }) => {
  const { userId } = useSelector((state) => state.auth);
  const classes = useStyles();
  const userFriends = useSelector((state) =>
    state.basket.friends.map((friend) => friend._id)
  );

  useEffect(() => {
    dispatch(getHub());
  }, []);

  const { searchForUsers, users } = useUsersSearch();

  const handleSubmit = async ({ userName }) => {
    await searchForUsers(userName);
  };

  const dispatch = useDispatch();

  const handleSelectFriend = ({ _id }) => {
    debugger;
    if (userId === _id) {
      history.push(`/api/users/me`);
    } else {
      dispatch(getFriendsHub(_id));
      history.push(`/api/users/friend/${_id}`);
    }
  };

  const renderFriendsList = (users) =>
    users.map((friend) => {
      const mutualFriends = _.intersectionBy(friend.friends, userFriends, "_id")
        .length;
      return (
        <Grid key={friend._id} xs item container alignItems="flex-start">
          <Card raised className={classes.card}>
            <CardActionArea onClick={() => handleSelectFriend(friend)}>
              <CardHeader
                subheader={`${mutualFriends} mutual friends`}
                title={friend.name}
              />
              <CardContent
                style={{ display: "flex", justifyContent: "space-around" }}
              >
                <Box>
                  <Typography className={classes.subtitle}>
                    {`Favorite meals (${friend.starredMeals.length})`}
                  </Typography>
                  <Typography className={classes.subtitle}>
                    {`Compositions (${friend.compositions.length})`}
                  </Typography>
                </Box>
                <Box position="relative" bottom="40px">
                  <Avatar
                    className={classes.avatar}
                    alt={friend.name}
                    src={friend.avatar}
                  />
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      );
    });

  return (
    <div className={classes.bg}>
      <Box display="flex" justifyContent="space-around">
        <Box>
          <Grid container spacing={3} direction="column" alignItems="basline">
            {renderFriendsList(friends)}
          </Grid>
        </Box>
        <Box>
          <Typography variant="h2" style={{ marginBottom: "40px" }}>
            Or look for new friends
          </Typography>
          <TextFieldWithButton
            onSubmit={handleSubmit}
            icon={<SearchRoundedIcon />}
            placeholder={"Ex. John Doe"}
            buttonText="Submit"
            name="userName"
          />
          {users ? (
            <div className={classes.searchResult}>
              <Grid
                style={{ marginTop: "30px" }}
                container
                spacing={3}
                direction="column"
                alignItems="basline"
              >
                {renderFriendsList(users)}
              </Grid>
            </div>
          ) : null}
        </Box>
      </Box>
    </div>
  );
};
