import React from "react";
import { closeSnackbar, enqueueSnackbar } from "../actions/snackbarActions";

const makeNotification = (message, variant) => ({
  message,
  options: {
    autoHideDuration: 2000,
    key: `key_${Math.random()}`,
    variant,
    // action: (id) => <Button onClick={() => closeSnackbar(id)}></Button>, //couldnt get closeSnackbar to work
  },
});

export default ({ dispatch }) => (next) => (action) => {
  switch (action.type) {
    case "auth/authError":
      dispatch(enqueueSnackbar(makeNotification(action.payload, "warning")));
      next(action);
      break;
    case "auth/authSuccess":
      action.payload
        ? dispatch(
            enqueueSnackbar(
              makeNotification("Logged in successfully :)", "success")
            )
          )
        : dispatch(
            enqueueSnackbar(makeNotification("Logged out successfully", "info"))
          );
      next(action);
      break;
    case "macros/macrosError":
      dispatch(enqueueSnackbar(makeNotification(action.payload, "warning")));
      next(action);
      break;
    case "basket/basketError":
      dispatch(enqueueSnackbar(makeNotification(action.payload, "warning")));
      next(action);
      break;
    case "basket/basketSuccess":
      const { name, remove } = action.payload.data;
      dispatch(
        enqueueSnackbar(
          makeNotification(
            `${name} ${remove ? "removed from" : "added to"}  your basket!`,
            "success"
          )
        )
      );
      next(action);
      break;
    default:
      next(action);
  }
};
