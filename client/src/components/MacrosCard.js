import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Color from "color";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CardActions from "@material-ui/core/CardActions";
import PieChart from "./CardComponents/PieChart";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import { useCommentExpander } from "./utils/hooks";
import _ from "lodash";
import Comment from "./CardComponents/Comment";
import Divider from "@material-ui/core/Divider";
import TextFieldWithButton from "./utils/TextFieldWithButton";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import AddCommentIcon from "@material-ui/icons/AddComment";
import macrosApi from "../api/macros";
import { postComment } from "../features/macros";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  actionArea: {
    borderRadius: 16,
    transition: "0.2s",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  selected: ({ color }) => ({
    borderRadius: 16,
    transition: "0.2s",
    transform: "matrix(0,-20px)",
    boxShadow: `2px 2px 10px 10px ${Color(color)
      .rotate(-12)
      .lighten(0.6)
      .fade(0.5)
      .mix(Color("yellow"))}`,
  }),

  card: ({ color }) => ({
    minWidth: 200,
    display: "flex",
    flexDirection: "column",
    borderRadius: 16,
    boxShadow: "none",
    "&:hover": {
      boxShadow: `0 6px 12px 10px ${Color(color)
        .rotate(-12)
        .darken(0.2)
        .fade(0.5)}`,
    },
  }),
  content: ({ color }) => {
    return {
      backgroundColor: color,
      padding: "0.5rem 1rem 1rem",
    };
  },
  title: {
    fontFamily: " sofia-pro, Helvetica,",
    fontSize: "2rem",
    color: "#ffffff",
    textTransform: "uppercase",
  },
  subtitle: {
    fontFamily: " sofia-pro, Helvetica,",
    color: "#fff",
    opacity: 0.87,
    marginTop: "0.5rem",
    fontWeight: 250,
    fontSize: 17,
  },
  actions: {
    display: "flex",
    justifyContent: "space-around",
    backgroundColor: "#034c5b",
  },
  comments: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  addComment: {
    marginTop: "50px",
  },
}));

export default ({ image, data, curriedCardAction, dynamicSelecting }) => {
  const classes = useStyles({ color: "#023b45" });
  const dispatch = useDispatch();
  const { handleClick, isSelected } = dynamicSelecting;
  const { name, calories, protein, carbs, fat, ratio, _id } = data;
  //const comments = useSelector((state) => _.find(state.macros.macros.data,_id));

  const onSubmit = ({ comment }) => {
    dispatch(postComment(comment, _id));
  };

  let comments = data.comments;
  const { expanded, handleExpandClick } = useCommentExpander();
  //"writer", "responseTo", "content"]

  const renderComments = (comments) =>
    _.map(comments, (comment) => (
      <Comment key={comment._id} comment={comment} />
    ));

  return (
    <CardActionArea
      className={isSelected(data) ? classes.selected : classes.actionArea}
    >
      <Card className={classes.card}>
        <CardMedia
          onClick={(event) => handleClick(event, data)}
          style={{ height: 0, paddingTop: "56%" }}
          image={image}
        />
        <CardContent
          onClick={(event) => handleClick(event, data)}
          className={classes.content}
        >
          <Typography className={classes.title} variant={"h2"}>
            {name}
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Typography className={classes.subtitle}>
                Calories: {calories}
              </Typography>
              <Typography className={classes.subtitle}>
                Protein: {protein}g
              </Typography>
              <Typography className={classes.subtitle}>
                Carbs: {carbs}g
              </Typography>
              <Typography className={classes.subtitle}>Fat: {fat}g</Typography>
            </Box>
            <Box>
              <PieChart ratio={ratio} />
            </Box>
          </Box>
        </CardContent>
        <CardActions
          className={classes.actions}
          children={curriedCardAction(
            expanded,
            handleExpandClick,
            comments.length
          )}
        />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent className={classes.comments}>
            {renderComments(comments)}
            <Divider />
            <TextFieldWithButton
              className={classes.addComment}
              onSubmit={onSubmit}
              icon={<AddCommentIcon />}
              placeholder={"Write a comment"}
              name={"comment"}
            />
          </CardContent>
        </Collapse>
      </Card>
    </CardActionArea>
  );
};
