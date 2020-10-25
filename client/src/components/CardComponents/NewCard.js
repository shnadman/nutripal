import React, { useEffect } from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Color from "color";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CardActions from "@material-ui/core/CardActions";
import PieChart from "./PieChart";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import _ from "lodash";
import Comment from "./Comment";
import Divider from "@material-ui/core/Divider";
import TextFieldWithButton from "../utils/TextFieldWithButton";
import AddCommentIcon from "@material-ui/icons/AddComment";
import { postComment } from "../../features/macros";
import { useDispatch, useSelector } from "react-redux";
import getCategoryImg from "./staticImgs";
import Tooltip from "@material-ui/core/Tooltip";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 304,
    margin: "auto",
    boxShadow: "0 32px 32px 0 #fff",
  },
  contentX: {
    padding: 24,
  },
  divider: {
    backgroundColor: "#d9e2ee",
    margin: "0 20px",
  },
  avatar: {
    width: 50,
    height: 50,
    border: "2px solid #fff",
    margin: "-48px 32px 0 auto",
    "& > img": {
      margin: 0,
    },
  },
  actionArea: {
    borderRadius: 12,
  },
  selected: ({ color }) => ({
    borderRadius: 16,
    transition: "0.2s",
    transform: "matrix(0,-20px)",
    boxShadow: `2px 2px 10px 10px ${Color(color)
      .rotate(-12)
      .lighten(0.6)
      .fade(0.5)
      .mix(Color("#ffffff"))}`,
  }),

  card: ({ color }) => ({
    minWidth: 200,
    display: "flex",
    flexDirection: "column",
    borderRadius: 16,
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
    fontSize: "1.5rem",
    fontWeight: "bolder",
    color: "#000000",
  },
  subtitle: {
    fontFamily: " sofia-pro, Helvetica,",
    color: "#000000",
    marginTop: "0.5rem",
    fontWeight: 300,
    fontSize: 17,
  },
  servingSize: {
    fontWeight: 250,
    fontSize: 12,
    fontFamily: " sofia-pro, Helvetica,",
    color: "#8a8888",
    opacity: 0.87,
  },

  actions: {
    display: "flex",
    justifyContent: "space-around",
    backgroundColor: "#ffffff",
  },
  comments: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  addComment: {
    marginTop: "50px",
  },
  logo: {
    maxWidth: "10vh",
    padding: "13%",
    position: "absolute",
    zIndex: 1,
  },
  pie: { height: "60%", width: "50%" },
}));

export default ({ image, data, curriedCardAction, dynamicSelecting }) => {
  const classes = useStyles({ color: "#ffffff" });
  const dispatch = useDispatch();
  const [expanded, setExpanded] = React.useState(false);
  const { handleClick, isSelected } = dynamicSelecting;
  const {
    name,
    calories,
    protein,
    carbs,
    fat,
    ratio,
    _id,
    comments,
    brand,
    brandLogo,
    category,
    servingSize,
    servingSizeUnit,
  } = data;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const onSubmit = ({ comment }) => {
    dispatch(postComment(comment, _id));
  };

  const renderComments = (comments) =>
    _.map(comments, (comment) => (
      <Comment key={comment._id} comment={comment} />
    ));

  return (
    <CardActionArea
      className={isSelected(data) ? classes.selected : classes.actionArea}
    >
      <Card className={classes.card}>
        <Box position={"relative"}>
          <Tooltip placement="top-start" title={brand}>
            <CardMedia image={brandLogo} className={classes.logo} />
          </Tooltip>
          <Tooltip enterDelay={1000} title={category} placement="top-end">
            <CardMedia
              onClick={(event) => handleClick(event, data)}
              style={{ height: 0, paddingTop: "56%", position: "relative" }}
              image={getCategoryImg(category)}
            />
          </Tooltip>
        </Box>
        <CardContent
          onClick={(event) => handleClick(event, data)}
          className={classes.content}
        >
          <Box>
            <Typography className={classes.title}>{name}</Typography>
            <Typography
              className={classes.servingSize}
            >{`serving size: ${servingSize} ${servingSizeUnit}`}</Typography>
          </Box>
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
            <Box className={classes.pie}>
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
