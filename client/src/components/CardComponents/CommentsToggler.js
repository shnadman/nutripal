import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";

const useStyles = makeStyles((theme) => ({
  text: {
    color: "#fff",
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
        <QuestionAnswerIcon />
      </IconButton>
    </Box>
  );
};
