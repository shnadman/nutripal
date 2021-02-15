import { createSlice } from "@reduxjs/toolkit";
import basket from "../api/basket";

basket.interceptors.request.use(function (config) {
  const token = localStorage.getItem("x-auth-token");
  config.headers["x-auth-token"] = token ? token : "";
  return config;
});

const initialState = {
  basket: {},
  compositions: [],
  userName: "",
  friends: [],
};

// Slice
const slice = createSlice({
  name: "friendsBasket",
  initialState,
  reducers: {
    getFriendsHubSuccess: (state, action) => {
      state.basket = action.payload.data.starredMeals;
      state.compositions = action.payload.data.compositions;
      state.userName = action.payload.data.name;
      state.avatar = action.payload.data.avatar;
      if (state.friends.length === 0)
        state.friends = action.payload.data.friends;
    },
    getFriendsHubError: (state, action) => {
      console.log(action.payload);
    },
  },
});
export default slice.reducer;

// Actions
export const { getFriendsHubSuccess, getFriendsHubError } = slice.actions;

export const getFriendsHub = (id) => async (dispatch) => {
  try {
    const jwt = localStorage.getItem("x-auth-token");
    const res = await basket.get(`/friends/${id}`, {
      headers: {
        "x-auth-token": jwt,
      },
    });
    dispatch(getFriendsHubSuccess(res));
  } catch (e) {
    dispatch(getFriendsHubError(e.response.data));
  }
};
