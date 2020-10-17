import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import macrosApi from "../../api/macros";
import LikeBadge from "./LikeBadge";

macrosApi.interceptors.request.use(function (config) {
  const token = localStorage.getItem("x-auth-token");
  config.headers["x-auth-token"] = token ? token : "";
  return config;
});

const useStyles = makeStyles(() => ({
  comment: {
    borderRadius: 14,
    backgroundColor: "#807f7f",
    margin: "10px",
    flexGrow: "1",
  },
  writer: {
    fontWeight: "bold",
    color: "#ffffff",
  },
  content: {
    color: "#fcc6c6",
  },
  title: {
    fontFamily: " sofia-pro, Helvetica,",
    fontSize: "2rem",
    color: "#ffffff",
    textTransform: "uppercase",
  },
  liked: {
    colorPrimary: "#3662e0",
  },
}));

export default ({ comment }) => {
  const { content, likedBy, writer, _id } = comment;
  const classes = useStyles();
  const [liked, setLiked] = useState("false");

  const handleClickLike = async (event) => {
    event.preventDefault();
    const res = await macrosApi.put(`/comments/${_id}/like`);
    setLiked(res.data.currLike);
  };

  return (
    <Box>
      <Box display="flex">
        <Avatar
          alt="Remy Sharp"
          src="url(https://images.unsplash.com/photo-1537815749002-de6a533c64db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2045&q=80)"
        />
        <Box className={classes.comment}>
          <Typography className={classes.writer}>{writer.name} </Typography>
          <Typography>{content}</Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <LikeBadge
          liked={liked}
          likedBy={likedBy}
          handleClickLike={handleClickLike}
        />
      </Box>
    </Box>
  );
};
