import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import { SnackbarProvider } from "notistack";
import store from "./store";

require("dotenv").config();

const preloadedState = {
  auth: {
    authenticated: localStorage.getItem("x-auth-token"),
    userId: localStorage.getItem("x-user-id"),
  },
};

ReactDOM.render(
  <Provider store={store(preloadedState)}>
    <SnackbarProvider maxSnack={3}>
      <App />
    </SnackbarProvider>
  </Provider>,
  document.querySelector("#root")
);
