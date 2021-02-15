import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles((theme) => ({
  text: {
    color: "#ddcccc",
  },

  disabled: {
    variant: "disabled",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  icon: { color: "#ddcccc" },
}));

export default ({ expanded, handleExpandClick, commentsCount }) => {
  const classes = useStyles();

  return (
    <Box display="flex" direction="row" justifyContent="center">
      <Box marginTop="12px">
        <Typography className={classes.text}>{commentsCount}</Typography>
      </Box>
      <IconButton
        className={clsx(classes.expand, {
          [classes.expandOpen]: expanded,
        })}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <QuestionAnswerIcon className={classes.icon} />
      </IconButton>
    </Box>
  );
};
