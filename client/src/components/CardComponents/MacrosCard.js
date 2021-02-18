import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import AddCommentIcon from "@material-ui/icons/AddComment";
import Color from "color";
import _ from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { postComment } from "../../features/macros";
import TextFieldWithButton from "../utils/TextFieldWithButton";
import Comment from "./Comment";
import PieChart from "./PieChart";
import getCategoryImg from "./staticImgs";

const useStyles = makeStyles((theme) => ({
  actionArea: {
    borderRadius: 20,
  },
  selected: ({ color }) => ({
    [theme.breakpoints.down("md")]: {
      minWidth: "inherit",
    },
    minWidth: 200,
    borderRadius: 20,
    transition: "0.2s",
    transform: "matrix(0,-20px)",
    boxShadow: `2px 2px 10px 10px ${Color(color)
      .rotate(-12)
      .lighten(0.6)
      .fade(0.5)
      .mix(Color("#ffffff"))}`,
  }),

  card: ({ color }) => ({
    [theme.breakpoints.down("md")]: {
      minWidth: 100,
    },
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

    fontSize: "1.2rem",
    color: "#ffffff",
  },
  subtitle: {
    fontFamily: " sofia-pro, Helvetica,",
    color: "#fff",
    opacity: 0.87,
    marginTop: "0.5rem",
    fontWeight: 250,
    fontSize: "1rem",
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
    backgroundColor: "#585252",
  },
  comments: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    overflowY: "scroll",
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
  pie: { height: "55%", width: "50%" },
  divider: { marginTop: "20px" },
}));

export default ({ data, curriedCardAction, dynamicSelecting }) => {
  const classes = useStyles({ color: "#585252" });
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
  const auth = useSelector((store) => store.auth.authenticated);

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
      <Card className={`${classes.card} macrocard`}>
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
              {calories !== 0 && <PieChart ratio={ratio} />}
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
            <Divider className={classes.divider} />
            <TextFieldWithButton
              className={classes.addComment}
              onSubmit={onSubmit}
              icon={<AddCommentIcon />}
              placeholder={"Comment"}
              name={"comment"}
              disabled={!auth}
            />
          </CardContent>
        </Collapse>
      </Card>
    </CardActionArea>
  );
};
