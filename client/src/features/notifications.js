// import { createSlice } from "@reduxjs/toolkit";
//
// const initialState = {
//   notifications: [],
// };
//
// const slice = createSlice({
//   name: "app",
//   initialState,
//   reducers: {
//     enqueueSnackbar: (state, action) => {
//       state.authenticated = action.payload;
//     },
//     closeSnackbar: (state, action) => {
//       state.errorMessage = action.payload;
//     },
//     removeSnackbar: (state, action) => {},
//   },
// });
// export default slice.reducer;
//
// export const ENQUEUE_SNACKBAR = "ENQUEUE_SNACKBAR";
// export const CLOSE_SNACKBAR = "CLOSE_SNACKBAR";
// export const REMOVE_SNACKBAR = "REMOVE_SNACKBAR";
//
// export const enqueueSnackbar = (notification) => {
//   const key = notification.options && notification.options.key;
//
//   return {
//     type: ENQUEUE_SNACKBAR,
//     notification: {
//       ...notification,
//       key: key || `key_${Math.random}`,
//     },
//   };
// };
//
// export const closeSnackbar = (key) => ({
//   type: CLOSE_SNACKBAR,
//   dismissAll: !key, // dismiss all if no key has been defined
//   key,
// });
//
// export const removeSnackbar = (key) => ({
//   type: REMOVE_SNACKBAR,
//   key,
// });
//
// import {
//   ENQUEUE_SNACKBAR,
//   CLOSE_SNACKBAR,
//   REMOVE_SNACKBAR,
// } from "../actions/snackbarActions";
//
// export default (state = defaultState, action) => {
//   switch (action.type) {
//     case ENQUEUE_SNACKBAR:
//       return {
//         ...state,
//         notifications: [
//           ...state.notifications,
//           {
//             key: action.key,
//             ...action.notification,
//           },
//         ],
//       };
//
//     case CLOSE_SNACKBAR:
//       return {
//         ...state,
//         notifications: state.notifications.map((notification) =>
//           action.dismissAll || notification.key === action.key
//             ? { ...notification, dismissed: true }
//             : { ...notification }
//         ),
//       };
//
//     case REMOVE_SNACKBAR:
//       return {
//         ...state,
//         notifications: state.notifications.filter(
//           (notification) => notification.key !== action.key
//         ),
//       };
//
//     default:
//       return state;
//   }
// };
