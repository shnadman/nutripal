import React from "react";
import Container from "@material-ui/core/Container";
import { searchMacros } from "../../features/macros";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";

const StyledSlider = withStyles({
  root: {
    color: "#1ed1ea",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
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

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "30px",
  },
}));

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { handleSubmit, register, control } = useForm();

  //const extractParams = (sliderVals) => ({...})

  const onSubmit = ({ calories, protein, carbs, fat }) => {
    const [gtCal, ltCal] = calories;
    const [gtProtein, ltProtein] = protein;
    const [gtCarbs, ltCarbs] = carbs;
    const [gtFat, ltFat] = fat;
    const params = {
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
          defaultValue={[0, 2500]}
          render={(props) => (
            <Box marginLeft="20px" flexGrow="0.1">
              <Typography>Calories</Typography>
              <StyledSlider
                {...props}
                onChange={(_, value) => {
                  props.onChange(value);
                }}
                valueLabelDisplay="auto"
                max={2500}
                step={10}
              />
            </Box>
          )}
        />
        <Controller
          name="protein"
          control={control}
          defaultValue={[0, 200]}
          render={(props) => (
            <Box flexGrow="0.1">
              <Typography>Protein</Typography>
              <StyledSlider
                style={{ color: "#2b3fcf" }}
                {...props}
                onChange={(_, value) => {
                  props.onChange(value);
                }}
                valueLabelDisplay="auto"
                max={100}
                step={1}
              />
            </Box>
          )}
        />
        <Controller
          name="carbs"
          control={control}
          defaultValue={[0, 200]}
          render={(props) => (
            <Box flexGrow="0.1">
              <Typography>Carbs</Typography>
              <StyledSlider
                style={{ color: "#ec3333" }}
                {...props}
                onChange={(_, value) => {
                  props.onChange(value);
                }}
                valueLabelDisplay="auto"
                max={100}
                step={1}
              />
            </Box>
          )}
        />
        <Controller
          name="fat"
          control={control}
          defaultValue={[0, 200]}
          render={(props) => (
            <Box flexGrow="0.1">
              <Typography>Fat</Typography>
              <StyledSlider
                style={{ color: "#59ec1b" }}
                {...props}
                onChange={(_, value) => {
                  props.onChange(value);
                }}
                valueLabelDisplay="auto"
                max={100}
                step={1}
              />
            </Box>
          )}
        />
        <Button
          tooltip="Search for specified macros"
          style={{ marginTop: "30px" }}
          type="submit"
          variant="contained"
        >
          Search
        </Button>
      </div>
    </form>
  );
};
