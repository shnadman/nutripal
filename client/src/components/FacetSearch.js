import React from "react";
import Container from "@material-ui/core/Container";
import { searchMacros } from "../features/macros";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";

export default () => {
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
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="calories"
          control={control}
          defaultValue={[0, 2500]}
          render={(props) => (
            <Slider
              {...props}
              onChange={(_, value) => {
                props.onChange(value);
              }}
              valueLabelDisplay="auto"
              max={2500}
              step={10}
              orientation="vertical"
              style={{ height: "150px" }}
            />
          )}
        />
        <Controller
          name="protein"
          control={control}
          defaultValue={[0, 200]}
          render={(props) => (
            <Slider
              {...props}
              onChange={(_, value) => {
                props.onChange(value);
              }}
              valueLabelDisplay="auto"
              max={100}
              step={1}
              orientation="vertical"
              style={{ height: "150px" }}
            />
          )}
        />
        <Controller
          name="carbs"
          control={control}
          defaultValue={[0, 200]}
          render={(props) => (
            <Slider
              {...props}
              onChange={(_, value) => {
                props.onChange(value);
              }}
              valueLabelDisplay="auto"
              max={100}
              step={1}
              orientation="vertical"
              style={{ height: "150px" }}
            />
          )}
        />
        <Controller
          name="fat"
          control={control}
          defaultValue={[0, 200]}
          render={(props) => (
            <Slider
              {...props}
              onChange={(_, value) => {
                props.onChange(value);
              }}
              valueLabelDisplay="auto"
              max={100}
              step={1}
              orientation="vertical"
              style={{ height: "150px" }}
            />
          )}
        />
        <Button style={{ marginTop: "30px" }} type="submit" variant="contained">
          Search
        </Button>
      </form>
    </Container>
  );
};
