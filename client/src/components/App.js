import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Homepage from "./Homepage";
import history from "../history";
import Signup from "./auth/Signup";
import Feature from "./UserHub";
import Notifier from "./utils/Notifier";
import Modal from "./utils/Modal";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppbarTest from "./Appbar";
import LandingPage from "./LandingPage";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: { main: "#141f1f" },
  },
  typography: {
    fontSize: 20,
    fontFamily: "Helvetica",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div>
        <Router history={history}>
          <div>
            <Notifier />
            <AppbarTest history={history} />
            <Switch>
              <Route path="/" exact component={LandingPage} />
              <Route path="/home" exact component={Homepage} />
              <Route path="/signup" exact component={Signup} />
              <Route path="/api/users/me" exact component={Feature} />
              <Route path="/login" exact component={Modal} />
            </Switch>
          </div>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
