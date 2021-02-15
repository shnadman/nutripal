import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { searchMacros } from "../../features/macros";

const iOSBoxShadow =
  "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

const StyledSlider = withStyles({
  root: {
    color: "#ADA3D4",
    height: 8,
    width: "135%",
  },

  thumb: {
    height: 20,
    width: 20,
    backgroundColor: "#fff",
    boxShadow: iOSBoxShadow,
    marginTop: -8,
    marginLeft: -14,
    "&:focus, &:hover, &$active": {
      boxShadow:
        "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        boxShadow: iOSBoxShadow,
      },
    },
  },

  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "30px",
    padding: "5px 5vw",
  },
}));

export default ({
  sortBy = "calories",
  ascending = true,
  branded = true,
  category,
}) => {
  const marks = [
    {
      value: 50,
      label: "50",
    },
    {
      value: 100,
      label: "100",
    },
    {
      value: 250,
      label: "250",
    },
  ];
  const classes = useStyles();
  const dispatch = useDispatch();
  const { handleSubmit, control } = useForm();

  //const extractParams = (sliderVals) => ({...})

  const onSubmit = ({ calories, protein, carbs, fat }) => {
    const [gtCal, ltCal] = calories;
    const [gtProtein, ltProtein] = protein;
    const [gtCarbs, ltCarbs] = carbs;
    const [gtFat, ltFat] = fat;
    const params = {
      sort: ascending ? `${sortBy}` : `-${sortBy}`,
      page: 0,
      brand: branded ? "true" : "",
      category,
      "calories[lte]": ltCal,
      "calories[gte]": gtCal,
      "protein[lte]": ltProtein,
      "protein[gte]": gtProtein,
      "carbs[lte]": ltCarbs,
      "carbs[gte]": gtCarbs,
      "fat[lte]": ltFat,
      "fat[gte]": gtFat,
    };
    dispatch(searchMacros(params));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.root}>
        <Controller
          name="calories"
          control={control}
          defaultValue={[0, 7000]}
          render={(props) => (
            <Box marginLeft="20px" flexGrow="0.1">
              <Typography>Calories (kcal)</Typography>
              <StyledSlider
                {...props}
                onChange={(_, value) => {
                  props.onChange(value);
                }}
                valueLabelDisplay="auto"
                max={7000}
                step={50}
              />
            </Box>
          )}
        />
        <Controller
          name="protein"
          control={control}
          defaultValue={[0, 500]}
          render={(props) => (
            <Box flexGrow="0.1">
              <Typography>Protein (g)</Typography>
              <StyledSlider
                style={{ color: "#2b3fcf" }}
                {...props}
                onChange={(_, value) => {
                  props.onChange(value);
                }}
                valueLabelDisplay="auto"
                max={500}
                step={1}
                marks={marks}
              />
            </Box>
          )}
        />
        <Controller
          name="carbs"
          control={control}
          defaultValue={[0, 500]}
          render={(props) => (
            <Box flexGrow="0.1">
              <Typography>Carbs (g)</Typography>
              <StyledSlider
                style={{ color: "#ec3333" }}
                {...props}
                onChange={(_, value) => {
                  props.onChange(value);
                }}
                valueLabelDisplay="auto"
                max={500}
                step={1}
                marks={marks}
              />
            </Box>
          )}
        />
        <Controller
          name="fat"
          control={control}
          defaultValue={[0, 500]}
          render={(props) => (
            <Box flexGrow="0.1">
              <Typography>Fat (g)</Typography>
              <StyledSlider
                style={{ color: "#59ec1b" }}
                {...props}
                onChange={(_, value) => {
                  props.onChange(value);
                }}
                valueLabelDisplay="auto"
                max={500}
                step={1}
                marks={marks}
              />
            </Box>
          )}
        />
      </div>
      <Button
        tooltip="Search for specified macros"
        style={{ marginTop: "30px", left: "47vw" }}
        type="submit"
        color="secondary"
        variant="outlined"
      >
        Search
      </Button>
    </form>
  );
};
