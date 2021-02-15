import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { editProfile, getHub } from "../features/basket";
import background from "../static/back6.jpg";

const useStyles = makeStyles((theme) => ({
  nameField: {
    position: "relative",
    left: "40px",
    margin: "50px 0",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
    },
  },
  passwordField: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
    },
    position: "relative",
    left: "40px",
    margin: "50px 0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  paper: {
    height: "88vh",
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.05)",
    border: " 2px solid",
  },
  bg: {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.45)), url(${background})`,
    height: "100vh",
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  button: {
    margin: theme.spacing(2),
  },
}));

const EditProfile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { userName, avatar } = useSelector((state) => state.basket);
  const { handleSubmit, register } = useForm({
    defaultValues: { name: userName },
  });

  useEffect(() => {
    dispatch(getHub());
  }, [dispatch]);

  const onSubmit = (form) => {
    dispatch(editProfile(form));
  };

  return (
    <div className={classes.bg}>
      <Container maxWidth="md">
        <Paper raised className={classes.paper}>
          <Box position="relative" left="20px" top="20px">
            <Avatar className={classes.avatar} alt={userName} src={avatar} />
            <Typography component="h1" variant="h4">
              {`${userName}'s profile`}
            </Typography>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Container maxWidth="sm">
              <Box className={classes.nameField}>
                <Typography>Name</Typography>
                <TextField
                  defaultValue={`${userName}`}
                  label="Edit name"
                  variant="outlined"
                  inputRef={register}
                  name="name"
                />
              </Box>
              <Box className={classes.passwordField}>
                <Typography>Password</Typography>
                <TextField
                  type="password"
                  variant="outlined"
                  label="Old Password"
                  inputRef={register}
                  name="passwordOld"
                />
                <TextField
                  type="password"
                  style={{ marginTop: "20px" }}
                  variant="outlined"
                  label="New password"
                  inputRef={register}
                  name="passwordNew"
                />
              </Box>
              <Box marginLeft="40px" display="flex">
                <Avatar
                  className={classes.avatar}
                  alt={userName}
                  src="/static/images/avatar/1.jpg"
                />
                <TextField
                  type="avatar"
                  style={{ marginTop: "20px" }}
                  label="Avatar URL"
                  inputRef={register}
                  name="avatar"
                />
              </Box>
              <div
                style={{ position: "relative", left: "480px", bottom: "-10px" }}
              >
                <Button
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  Save Profile
                </Button>
              </div>
            </Container>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default EditProfile;
