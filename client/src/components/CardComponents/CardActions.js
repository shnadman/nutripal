import IconButton from "@material-ui/core/IconButton";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import React from "react";
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
