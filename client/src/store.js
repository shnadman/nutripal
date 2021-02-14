import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import auth from "./features/auth";
import macros from "./features/macros";
import basket from "./features/basket";
import app from "./reducers/snackReducer";
import friendsBasket from "./features/friendsBasket";
import notifications from "./features/notifications";
import { reducer as formReducer } from "redux-form";
import notify from "./middleware/notify";

const reducer = {
  auth,
  form: formReducer,
  app,
  macros,
  basket,
  friendsBasket,
  notifications,
};

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer,
    middleware: [notify, ...getDefaultMiddleware()],
    preloadedState,
  });

  return store;
}
