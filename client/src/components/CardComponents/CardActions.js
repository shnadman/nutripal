import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import BackspaceRoundedIcon from "@material-ui/icons/BackspaceRounded";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useToggleOnSearch, useToggleOnDiscard } from "../utils/hooks";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ShareButton from "./ShareButton";
import CommentsToggler from "./CommentsToggler";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: "#ddcccc",
    alignSelf: "center",
    marginLeft: "12px",
  },
  starred: {
    color: "#e53131",
    marginLeft: "12px",
  },
  remove: {
    color: "red",
  },
  actions: {
    background: "#0e1cb7",
  },
  text: {
    color: "#ddcccc",
  },

  textComments: {
    color: "#fff",
    marginTop: "20px",
  },

  disabled: {
    variant: "disabled",
  },
}));

export const StarAction = ({
  id,
  starred,
  expanded,
  handleExpandClick,
  commentsCount,
}) => {
  const classes = useStyles();
  const { on, toggle } = useToggleOnSearch(starred, id);

  return (
    <>
      <IconButton
        onMouseDown={(event) => event.stopPropagation()}
        onClick={toggle}
      >
        <Typography className={classes.text}>{starred.length}</Typography>
        <FavoriteIcon className={on ? classes.starred : classes.icon} />
      </IconButton>
      <ShareButton style={{ marginRight: "15px" }} />

      <CommentsToggler
        expanded={expanded}
        handleExpandClick={handleExpandClick}
        commentsCount={commentsCount}
      />
    </>
  );
};

export const RemoveAction = ({ id, starred }) => {
  const classes = useStyles();
  const { on, toggle } = useToggleOnDiscard(false, id);

  return (
    <>
      <IconButton
        onMouseDown={(event) => event.stopPropagation()}
        onClick={toggle}
      >
        <BackspaceRoundedIcon className={on ? classes.remove : classes.icon} />
      </IconButton>
      <Box alignSelf="center">
        <Typography variant="h5" color="secondary">
          Discard
        </Typography>
      </Box>
    </>
  );
};
