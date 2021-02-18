import { useMediaQuery } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.secondary,
    variant: "contained",
    [theme.breakpoints.down("md")]: {
      padding: "1px",
    },
  },

  helperText: {
    color: "primary",
    variant: "h5",
    textField: {},
  },
}));

export default ({ onSubmit, icon, placeholder, name, disabled }) => {
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:860px)");

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
            <IconButton
              disabled={disabled}
              type="submit"
              className={classes.button}
            >
              <InputAdornment position="end" children={icon} />
            </IconButton>
          ),
        }}
      />
    </form>
  );
};
