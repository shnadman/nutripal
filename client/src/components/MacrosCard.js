import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import GradeRoundedIcon from "@material-ui/icons/GradeRounded";
import Color from "color";
import { useDispatch } from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import CardActions from "@material-ui/core/CardActions";
import { modifyBasket } from "../features/basket";

const useStyles = makeStyles(() => ({
  actionArea: {
    borderRadius: 16,
    transition: "0.2s",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  card: ({ color }) => ({
    minWidth: 180,
    display: "flex",
    flexDirection: "column",
    borderRadius: 16,
    boxShadow: "none",
    "&:hover": {
      boxShadow: `0 6px 12px 0 ${Color(color)
        .rotate(-12)
        .darken(0.2)
        .fade(0.5)}`,
    },
  }),
  content: ({ color }) => {
    return {
      backgroundColor: color,
      padding: "1rem 1.5rem 1.5rem",
    };
  },
  title: {
    fontFamily: " sofia-pro, Helvetica,",
    fontSize: "2rem",
    color: "#fff",
    textTransform: "uppercase",
  },
  subtitle: {
    fontFamily: " sofia-pro, Helvetica,",
    color: "#fff",
    opacity: 0.87,
    marginTop: "0.5rem",
    fontWeight: 200,
    fontSize: 12,
  },
  icon: {
    color: "white",
    alignSelf: "center",
  },
  starred: {
    color: "yellow",
  },
  actions: {
    background: "#0e1cb7",
  },
}));

export default ({ image, title, calories, protein, carbs, fat, id }) => {
  const classes = useStyles({ color: "#27C7E9" });
  const [starred, setStarred] = useState(false);
  const dispatch = useDispatch();

  const handleStar = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setStarred(!starred);
    dispatch(modifyBasket(id, starred));
  };

  return (
    <CardActionArea className={classes.actionArea}>
      <Card className={classes.card}>
        <CardMedia style={{ height: 0, paddingTop: "56%" }} image={image} />
        <CardContent className={classes.content}>
          <Typography className={classes.title} variant={"h2"}>
            {title}
          </Typography>
          <Typography className={classes.subtitle}>
            Calories: {calories}
          </Typography>
          <Typography className={classes.subtitle}>
            Protein: {protein}g
          </Typography>
          <Typography className={classes.subtitle}>Carbs: {carbs}g</Typography>
          <Typography className={classes.subtitle}>Fat: {fat}g</Typography>
        </CardContent>
        <CardActions className={classes.actions}>
          <IconButton
            onMouseDown={(event) => event.stopPropagation()}
            onClick={handleStar}
          >
            <GradeRoundedIcon
              className={starred ? classes.starred : classes.icon}
            />
          </IconButton>
        </CardActions>
      </Card>
    </CardActionArea>
  );
};
