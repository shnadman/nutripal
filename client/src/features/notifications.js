import { createSlice } from "@reduxjs/toolkit";
import basket from "../api/basket";

basket.interceptors.request.use(function (config) {
  const token = localStorage.getItem("x-auth-token");
  config.headers["x-auth-token"] = token ? token : "";
  return config;
});

const initialState = {};
// Slice
const slice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    getNotificationsSuccess: (state, action) => {
      state.notifications = action.payload.data.notifications;
    },
    // respondFriendRequestSuccess: (state, action) => {
    //   state.notifications = action.payload.data.notifications;
    // },
    getNotificationsError: (state, action) => {
      console.log(action.payload);
    },
    // sendFriendRequestSuccess: (state, action) => {
    //   console.log(action.payload);
    // },
    // sendFriendRequestError: (state, action) => {
    //   console.log(action.payload);
    // },
    // removeFriendSuccess: (state, action) => {
    //   console.log(action.payload);
    // },
    // removeFriendError: (state, action) => {
    //   console.log(action.payload);
    // },
  },
});
export default slice.reducer;

// Actions
export const {
  getNotificationsSuccess,
  getNotificationsError,
  // sendFriendRequestSuccess,
  // sendFriendRequestError,
  // respondFriendRequestSuccess,
  // removeFriendSuccess,
  // removeFriendError,
} = slice.actions;

export const getNotifications = () => async (dispatch) => {
  try {
    const res = await basket.get("/notifications");
    dispatch(getNotificationsSuccess(res));
  } catch (e) {
    dispatch(getNotificationsError(e.response.data));
  }
};
//
// export const respondFriendRequest = (id, response) => async (dispatch) => {
//   try {
//     const res = await basket.put(`/notifications/${id}/${response}`);
//     dispatch(respondFriendRequestSuccess(res));
//   } catch (e) {
//     dispatch(getNotificationsError(e.response.data));
//   }
// };
//
// export const sendFriendRequest = (id) => async (dispatch) => {
//   try {
//     const res = await basket.put(`/friends/${id}`);
//     dispatch(sendFriendRequestSuccess(res));
//   } catch (e) {
//     dispatch(sendFriendRequestError(e.response.data));
//   }
// };
//
// export const removeFriend = (id) => async (dispatch) => {
//   try {
//     const res = await basket.put(`/friends/${id}/remove`);
//     dispatch(removeFriendSuccess(res));
//   } catch (e) {
//     dispatch(removeFriendError(e.response.data));
//   }
// };
