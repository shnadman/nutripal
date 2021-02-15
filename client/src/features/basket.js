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
  avatar: "",
  friends: [],
};

// Slice
const slice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    editProfileSuccess: (state, action) => {
      state.userName = action.payload.data.name;
      state.avatar = action.payload.data.avatar;
    },
    getFriendsSuccess: (state, action) => {
      state.friends = action.payload.data[0].friends;
    },
    modifyCompositionSuccess: (state, action) => {
      state.compositions = action.payload.data.compositions;
    },
    deleteCompositionSuccess: (state, action) => {
      state.compositions = action.payload.data.compositions;
    },
    getCompositionSuccess: (state, action) => {
      state.compositions = action.payload.data[0].compositions;
    },
    addCompositionSuccess: (state, action) => {
      state.compositions = action.payload.data.compositions;
    },
    addCompositionError: (state, action) => {
      console.error(action.payload);
    },
    getUserHubSuccess: (state, action) => {
      state.basket = action.payload.data.starredMeals;
      state.compositions = action.payload.data.compositions;
      state.userName = action.payload.data.name;
      state.avatar = action.payload.data.avatar;
      if (state.friends.length === 0)
        state.friends = action.payload.data.friends;
    },
    basketSuccess: (state, action) => {
      state.basket = action.payload.data.starredMeals;
    },
    basketError: (state, action) => {
      console.log(action.payload);
    },
    respondFriendRequestSuccess: (state, action) => {
      state.friends = action.payload.data.friends;
    },
    getNotificationsError: (state, action) => {
      console.log(action.payload);
    },
    sendFriendRequestSuccess: (state, action) => {
      console.log(action.payload);
    },
    sendFriendRequestError: (state, action) => {
      console.log(action.payload);
    },
    removeFriendSuccess: (state, action) => {
      state.friends = action.payload.data.friends;
    },
    removeFriendError: (state, action) => {
      console.log(action.payload);
    },
    respondFriendRequestError: (state, action) => {
      console.log(action.payload);
    },
    editProfileError: (state, action) => {
      console.log(action.payload);
    },
  },
});
export default slice.reducer;

// Actions
export const {
  basketSuccess,
  basketError,
  modifyDiscardList,
  addCompositionSuccess,
  addCompositionError,
  getCompositionSuccess,
  deleteCompositionSuccess,
  modifyCompositionSuccess,
  getUserHubSuccess,
  getFriendsSuccess,
  sendFriendRequestSuccess,
  sendFriendRequestError,
  respondFriendRequestSuccess,
  removeFriendSuccess,
  removeFriendError,
  respondFriendRequestError,
  editProfileSuccess,
  editProfileError,
} = slice.actions;

export const modifyBasket = (mealId, remove) => async (dispatch) => {
  try {
    const res = await basket.put("/", { mealId, remove });
    dispatch(basketSuccess(res));
  } catch (e) {
    dispatch(basketError(e.response.data));
  }
};

export const getHub = () => async (dispatch) => {
  try {
    const jwt = localStorage.getItem("x-auth-token");
    const res = await basket.get("/", {
      headers: {
        "x-auth-token": jwt,
      },
    });
    dispatch(getUserHubSuccess(res));
  } catch (e) {
    dispatch(basketError(e.response.data));
  }
};

export const addComposition = (name, mealIds) => async (dispatch) => {
  try {
    const res = await basket.post("/compositions", { name, mealIds });
    dispatch(addCompositionSuccess(res));
  } catch (e) {
    dispatch(addCompositionError(e.response.data));
  }
};

export const getCompositions = () => async (dispatch) => {
  try {
    const res = await basket.get("/compositions");
    dispatch(getCompositionSuccess(res));
  } catch (e) {
    dispatch(addCompositionError(e.response.data));
  }
};

export const modifyComposition = (name, mealIds, id) => async (dispatch) => {
  try {
    const res = await basket.put(`/compositions/${id}`, {
      name,
      mealIds,
    });
    dispatch(modifyCompositionSuccess(res));
  } catch (e) {
    dispatch(addCompositionError(e.response.data));
  }
};

export const deleteComposition = (id) => async (dispatch) => {
  try {
    const res = await basket.put(`/compositions/${id}`);
    dispatch(deleteCompositionSuccess(res));
  } catch (e) {
    dispatch(addCompositionError(e.response.data));
  }
};

export const getFriends = () => async (dispatch) => {
  try {
    const res = await basket.get(`/friends`);
    dispatch(getFriendsSuccess(res));
  } catch (e) {
    dispatch(basketError(e.response.data));
  }
};
export const removeFriend = (id) => async (dispatch) => {
  try {
    const res = await basket.put(`/friends/${id}/remove`);
    dispatch(removeFriendSuccess(res));
  } catch (e) {
    dispatch(removeFriendError(e.response.data));
  }
};

export const respondFriendRequest = (id, response) => async (dispatch) => {
  try {
    const res = await basket.put(`/notifications/${id}/${response}`);
    dispatch(respondFriendRequestSuccess(res));
  } catch (e) {
    dispatch(respondFriendRequestError(e.response.data));
  }
};

export const sendFriendRequest = (id) => async (dispatch) => {
  try {
    const res = await basket.put(`/friends/${id}`);
    dispatch(sendFriendRequestSuccess(res));
  } catch (e) {
    dispatch(sendFriendRequestError(e.response.data));
  }
};
export const editProfile = (form) => async (dispatch) => {
  try {
    debugger;
    const res = await basket.put(`/profile`, form);
    dispatch(editProfileSuccess(res));
  } catch (e) {
    dispatch(editProfileError(e.response.data));
  }
};
