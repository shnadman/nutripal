import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { reducer as formReducer } from "redux-form";
import auth from "./features/auth";
import basket from "./features/basket";
import friendsBasket from "./features/friendsBasket";
import macros from "./features/macros";
import notifications from "./features/notifications";
import notify from "./middleware/notify";
import app from "./reducers/snackReducer";

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
