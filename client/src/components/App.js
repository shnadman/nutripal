import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Homepage from "./Homepage";
import history from "../history";
import Signup from "./auth/Signup";
import Feature from "./RestrictedFeature";
import Box from "@material-ui/core/Box";
import Signout from "./auth/Signout";
import AppBar from "./utils/AppBar";
import Notifier from "./utils/Notifier";
import Modal from "./utils/Modal";

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Notifier />
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Box alignSelf="flex-start">
              <Signout />
            </Box>
            <Box alignSelf="flex-end">
              <Modal />
            </Box>
          </Box>
          {AppBar()}
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/api/users/me" exact component={Feature} />
            <Route path="/login" exact component={Modal} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
