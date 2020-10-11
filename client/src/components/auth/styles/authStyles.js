import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  field: {
    variant: "outlined",
    margin: "normal",
    required: true,
    fullWidth: true,
    autoComplete: "email",
    autoFocus: true,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "flex-start",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    color: "primary",
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
