import { makeStyles } from "@material-ui/core/styles";
import background from "../../../static/back6.jpg";

export default makeStyles((theme) => ({
  field: {
    margin: "normal",
    borderColor: "white",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "flex-start",
    backgroundColor: "rgba(255,255,255,0.02)",
    border: " 2px solid",
    borderRadius: 14,
  },
  paperLogin: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "flex-start",
    backgroundColor: "rgba(0,0,0,0.02)",
    borderRadius: 14,
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
  bg: {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.65)), url(${background})`,
    height: "100vh",
    display: "flex",
    alignItems: "center",
  },
}));
