import React from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { Typography } from "@material-ui/core";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    color: "primary",
    variant: "contained",
  },
  helperText: {
    marginBottom: "20px",
    color: "primary",
    variant: "h5",
    textField: {},
  },
}));

export default ({ helperTitle, placeholder }) => {
  const classes = useStyles();

  const { handleSubmit, register } = useForm();
  const onSubmit = (term) => {
    debugger;

    console.log(term);
  };
  return (
    <Container className={classes.helperText} maxWidth="sm">
      <Typography
        variant="h5"
        color="primary"
        style={{ marginBottom: "20px" }}
        className={classes.helperText}
      >
        {helperTitle}
      </Typography>
      <Paper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            placeholder={placeholder}
            fullWidth
            className={classes.textField}
            inputRef={register}
            name="searchBar"
            InputProps={{
              endAdornment: (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Submit
                  <InputAdornment position="end">
                    <SearchRoundedIcon />
                  </InputAdornment>
                </Button>
              ),
            }}
          />
        </form>
      </Paper>
    </Container>
  );
};
