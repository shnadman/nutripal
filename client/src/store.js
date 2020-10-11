import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import auth from "./features/auth";
import macros from "./features/macros";
import app from "./reducers/snackReducer";
import { reducer as formReducer } from "redux-form";
import notify from "./middleware/notify";

const reducer = {
  auth,
  form: formReducer,
  app,
  macros,
};

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer,
    middleware: [notify, ...getDefaultMiddleware()],
    preloadedState,
  });

  return store;
}