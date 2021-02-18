import IconButton from "@material-ui/core/IconButton";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import React, { useState } from "react";
import { useToggleOnSearch } from "../utils/hooks";
import CommentsToggler from "./CommentsToggler";
import ShareButton from "./ShareButton";

const useStyles = makeStyles(() => ({
  icon: {
    color: "#ddcccc",
    alignSelf: "center",
    marginLeft: "12px",
  },
  starred: {
    color: "#ff5f5f",
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
  const [currLikes, setCurrLikes] = useState(starred.length);

  return (
    <>
      <IconButton
        onMouseDown={(event) => event.stopPropagation()}
        onClick={(event) => {
          toggle(event);
          setCurrLikes((curr) => (on ? curr - 1 : curr + 1));
        }}
      >
        <Typography className={classes.text}>{currLikes}</Typography>
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
