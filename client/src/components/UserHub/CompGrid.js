import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

import _ from "lodash";
import Button from "@material-ui/core/Button";
import Color from "color";
import DeleteComposition from "../MacrosTableAggregate/DeleteComposition";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import PieChart from "../CardComponents/PieChart";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import DeletePopper from "./DeletePopper";
import DeleteIcon from "@material-ui/icons/Delete";
import background from "../../static/back6.jpg";

const useGridStyles = makeStyles(({ breakpoints }) => ({
  root: {
    [breakpoints.up("md")]: {
      justifyContent: "center",
      alignContent: "space-between",
    },
  },
  bg: {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.55)), url(${background})`,
    backgroundPosition: "initial",
    paddingTop: "80px",
    minHeight: "1200px",
  },
  subtitle: {
    fontFamily: " sofia-pro, Helvetica,",
    color: "#fff",
    opacity: 0.87,
    marginTop: "0.5rem",
    fontWeight: 250,
    fontSize: 17,
  },
  grid: {
    justifyContent: "center",
    alignContent: "space-between",
  },
  card: ({ color }) => {
    return {
      // backgroundImage: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)), url(${background})`,
      // backgroundPosition: "center bottom",
      // backgroundSize: "cover",
      backDropFilter: "blur(2px)",
      backgroundColor: "rgba(255,255,255,0.1)",
      border: "0.7px solid white",
      height: "400px",
      display: "flex",
      flexDirection: "column",
      borderRadius: 16,
    };
  },
  content: ({ color }) => {
    return {
      paddingTop: "10px",
      display: "flex",
      justifyContent: "space-between",
    };
  },

  header: ({ color }) => {
    return {
      padding: "0.5rem 1rem 1rem",
    };
  },
  pie: { height: "70%", width: "60%" },
  selected: ({ color }) => ({
    borderRadius: 16,
    transition: "0.2s",
    transform: "matrix(0,-20px)",
    boxShadow: `2px 2px 10px 10px ${Color(color)
      .rotate(-12)
      .lighten(0.6)
      .fade(0.5)
      .mix(Color("#fff"))}`,
  }),
}));

export default ({ data, renderSelectedComposition, isSelected }) => {
  const renderTotals = (composition) => {
    let [protein, fat, carbs, calories] = [0, 0, 0, 0];
    _.forEach(composition.mealIds, (macros) => {
      protein += macros.protein;
      fat += macros.fat;
      carbs += macros.carbs;
      calories += macros.calories;
    });

    const protRatio = (protein * 4) / calories;
    const fatRatio = (fat * 4) / calories;
    const carbstRatio = (carbs * 9) / calories;
    const ratio = [protRatio, carbstRatio, fatRatio];
    return (
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography className={classes.subtitle}>
            Calories: {calories}
          </Typography>
          <Typography className={classes.subtitle}>
            Protein: {protein}g
          </Typography>
          <Typography className={classes.subtitle}>Carbs: {carbs}g</Typography>
          <Typography className={classes.subtitle}>Fat: {fat}g</Typography>
        </Box>
        <Box className={classes.pie}>
          <PieChart ratio={ratio} />
        </Box>
      </Box>
    );
  };
  const classes = useGridStyles({ color: "#50476b" });
  const dispatch = useDispatch();

  if (!data || _.isEmpty(data) || _.isUndefined(data)) {
    return null;
  }
  const renderedGrid = _.map(data, (composition) => {
    return (
      <Grid
        className={isSelected(composition._id) ? classes.selected : ""}
        xs={2}
        item
      >
        <Card className={classes.card} raised>
          <CardActionArea
            onClick={() => renderSelectedComposition(composition)}
            className={isSelected(data) ? classes.selected : classes.actionArea}
          >
            <CardHeader
              className={classes.header}
              title={composition.name}
              subheader={`${composition.mealIds.length} meals`}
            />

            <CardContent className={classes.content}>
              {renderTotals(composition)}
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Box display="flex">
              <DeleteIcon />
              <DeletePopper
                component={<DeleteComposition _id={composition._id} />}
              />
            </Box>
          </CardActions>
        </Card>
      </Grid>
    );
  });
  return (
    <div>
      <Grid alignItems="center" justify="space-evenly" container>
        {renderedGrid}
      </Grid>
    </div>
  );
};
