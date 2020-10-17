import { createSlice } from "@reduxjs/toolkit";
import basket from "../api/basket";
import _ from "lodash";

basket.interceptors.request.use(function (config) {
  const token = localStorage.getItem("x-auth-token");
  config.headers["x-auth-token"] = token ? token : "";
  return config;
});

const initialState = {
  basket: {},
  discardList: [],
};

// Slice
const slice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    clearDiscardList: (state) => {
      state.discardList = [];
    },
    modifyDiscardList: (state, action) => {
      const { id, on } = action.payload;
      on ? _.pull(state.discardList, id) : state.discardList.push(id);
    },
    basketSuccess: (state, action) => {
      state.basket = action.payload.data.starredMeals;
    },
    basketError: (state, action) => {
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
  clearDiscardList,
} = slice.actions;

export const modifyBasket = (mealId, remove) => async (dispatch) => {
  debugger;
  try {
    const res = await basket.put("/", { mealId, remove });
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
    dispatch(basketSuccess(res));
  } catch (e) {
    dispatch(basketError(e.response.data));
  }
};
