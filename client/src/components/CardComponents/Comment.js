import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import macrosApi from "../../api/macros";
import LikeBadge from "./LikeBadge";
import { likeComment } from "../../features/macros";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import { formatDistance } from "date-fns";

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
    position: "relative",
  },
  writer: {
    fontWeight: "bold",
    color: "#ffffff",
  },
  content: {
    color: "#fcc6c6",
  },
  timestamp: {
    fontWeight: "light",
    fontSize: "13px",
    color: "#d0cccc",
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
  delete: {
    left: "-25px",
    position: "absolute",
    zIndex: "2",
    bottom: "-18px",
  },
}));

export default ({ comment }) => {
  const { content, writer, _id, createdAt } = comment;
  const classes = useStyles();
  const userId = useSelector((state) => state.auth.userId);
  const [showDelete, setShowDelete] = useState(comment.writer._id === userId);

  const onClickDelte = async () => {};

  const renderDelete = () => {
    return (
      <div className={classes.delete}>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </div>
    );
  };

  return (
    <Box>
      <Box display="flex">
        <Box display="flex" flexDirection="column">
          <Avatar alt={writer.name} src={writer.avatar} />
        </Box>
        <div className={classes.comment}>
          <Box display="flex" justifyContent="space-between">
            <Typography className={classes.writer}>{writer.name} </Typography>
            <Typography className={classes.timestamp}>
              {formatDistance(new Date(createdAt), Date.now())}
            </Typography>
          </Box>
          <Typography>{content}</Typography>
          {showDelete ? renderDelete() : null}
          <LikeBadge id={_id} />
        </div>
      </Box>
    </Box>
  );
};
