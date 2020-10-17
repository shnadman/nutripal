import Slider from "@material-ui/core/Slider";
import React from "react";
import { useForm, Controller } from "react-hook-form";

export default ({ name, defaultValue, orientation, height, max, step }) => {
  const { control } = useForm();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={(props) => (
        <Slider
          {...props}
          onChange={(_, value) => {
            props.onChange(value);
          }}
          valueLabelDisplay="auto"
          max={max}
          step={step}
          orientation={orientation}
          style={{ height: height }}
        />
      )}
    />
  );
};
