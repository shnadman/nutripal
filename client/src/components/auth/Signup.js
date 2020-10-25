import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import _ from "lodash";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";

import { renderTextField } from "../utils/ReduxFormUtils";
import validate from "../utils/validation";
import { signup } from "../../features/auth";
import useStyles from "./styles/authStyles";

const Signup = (props) => {
  const [showPassword, setShowPassword] = useState({ showPassword: false });
  const dispatch = useDispatch();

  const handleClickShowPassword = () => {
    setShowPassword({ showPassword: !showPassword });
  };

  const classes = useStyles();

  const onSubmit = (formProps) => {
    dispatch(
      signup(_.pick(formProps, "name", "email", "password"), () => {
        props.history.push("/");
      })
    );
  };

  const { handleSubmit, pristine, reset, submitting, invalid } = props;
  return (
    <Container maxWidth="xs">
      <Paper className={classes.paper}>
        <Box alignSelf="center">
          <Avatar style={{ marginLeft: "70px" }} className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create a user
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className={classes.field}>
            <Field
              name="name"
              component={renderTextField}
              label="Name"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              size="small"
              autoFocus
            />
          </Box>
          <Box>
            <Field
              name="email"
              component={renderTextField}
              label="Email"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              size="small"
              autoComplete="email"
            />
          </Box>
          <Box>
            <Field
              name="password"
              component={renderTextField}
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              size="small"
            />
          </Box>
          <Box>
            <Field
              name="passwordConfirm"
              component={renderTextField}
              label="Re-enter password"
              type="password"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              size="small"
            />
          </Box>
          <Box />
          <Box>
            <Button
              className={classes.button}
              color="primary"
              variant="contained"
              type="submit"
              disabled={invalid || submitting}
            >
              Submit
            </Button>
            <Button
              className={classes.button}
              color="secondary"
              variant="contained"
              type="button"
              disabled={pristine || submitting}
              onClick={reset}
            >
              Clear Values
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default reduxForm({ form: "signin", validate })(Signup);
