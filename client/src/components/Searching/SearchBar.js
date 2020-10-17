import React from "react";
import Container from "@material-ui/core/Container";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { searchMacros } from "../../features/macros";
import TextFieldWithButton from "../utils/TextFieldWithButton";

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

export default ({ helperTitle, placeholder }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onSubmit = ({ term }) => {
    const params = {
      "name[regex]": term,
    };

    dispatch(searchMacros(params));
  };
  return (
    <Container className={classes.helperText} maxWidth="sm">
      <Paper>
        <TextFieldWithButton
          onSubmit={onSubmit}
          icon={<SearchRoundedIcon />}
          placeholder={placeholder}
          buttonText="Submit"
          name="term"
        />
      </Paper>
    </Container>
  );
};
