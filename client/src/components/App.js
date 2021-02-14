import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Homepage from "./Homepage";
import history from "../history";
import Signup from "./auth/Signup";
import Notifier from "./utils/Notifier";
import Modal from "./utils/Modal";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Appbar from "./Appbar";
import LandingPage from "./LandingPage";
import FriendsHub from "./FriendsHub";
import UserHub from "./UserHub";
import { useSelfData, useFriendsData } from "./utils/hooks";

import Copyright from "./Copyright";
import EditProfile from "./EditProfile";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: { main: "#141f1f" },
    secondary: { main: "#ADA3D4" },
  },
  typography: {
    fontSize: 20,
    fontFamily: "Helvetica",
  },
});

const stylePropsUser = {
  backgroundImage:
    "linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7))," +
    "url(https://images.unsplash.com/photo-1562772186-ad68d3906ca9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80)",
};

const stylePropsFriend = {
  backgroundImage:
    "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5))," +
    "url(https://images.unsplash.com/photo-1504892612018-159ffa1d147f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)",
};

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div>
        <Router history={history}>
          <div>
            <Notifier />
            <div style={{ zIndex: 3, position: "sticky", top: 0 }}>
              <Appbar history={history} />
            </div>
            <Switch>
              <Route path="/" exact component={LandingPage} />
              <Route path="/home" exact component={Homepage} />
              <Route path="/signup" exact component={Signup} />
              <Route path="/login" exact component={Modal} />
              <Route path="/api/users/me/edit" exact component={EditProfile} />
              <Route
                path="/api/users/me"
                exact
                render={(props) => (
                  <UserHub
                    {...props}
                    useData={useSelfData}
                    friendFlag={false}
                    styleProps={stylePropsUser}
                  />
                )}
              />
              <Route
                path="/api/users/friend/:id"
                exact
                render={(props) => (
                  <UserHub
                    {...props}
                    useData={useFriendsData}
                    friendFlag={true}
                    styleProps={stylePropsFriend}
                  />
                )}
              />
            </Switch>
            {/*<Copyright />*/}
          </div>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
