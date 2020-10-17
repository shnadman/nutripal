import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import React from "react";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.secondary,
    variant: "contained",
  },
  helperText: {
    color: "primary",
    variant: "h5",
    textField: {},
  },
}));

export default ({ onSubmit, icon, placeholder, buttonText, name }) => {
  const classes = useStyles();
  const { handleSubmit, register } = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        placeholder={placeholder}
        fullWidth
        className={classes.textField}
        inputRef={register}
        name={name}
        InputProps={{
          endAdornment: (
            <IconButton type="submit" className={classes.button}>
              <InputAdornment position="end" children={icon} />
            </IconButton>
          ),
        }}
      />
    </form>
  );
};
