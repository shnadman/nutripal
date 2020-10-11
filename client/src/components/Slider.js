import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    height: 300,
  },
});

const valuetext = (value) => `${value} Calories`;

const marks = [
  {
    value: 0,
    label: "Air",
  },
  {
    value: 200,
    label: "Small sized meal",
  },
  {
    value: 400,
    label: "Medium sized meal",
  },
  {
    value: 1000,
    label: "Big meal",
  },
];

export default function VerticalSlider({
  category,
  onChange,
  defaultValue,
  step,
  max,
}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography id="vertical-slider" gutterBottom>
        {category}
      </Typography>
      <div className={classes.root}>
        <Slider
          orientation="vertical"
          defaultValue={defaultValue}
          marks={marks}
          onChange={(_, value) => onChange(value)}
          step={step}
          max={max}
        />
      </div>
    </React.Fragment>
  );
}
