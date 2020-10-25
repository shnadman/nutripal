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
  compositions: [],
  userName: "",
};

// Slice
const slice = createSlice({
  name: "basket",
  initialState,
  reducers: {
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
  addCompositionSuccess,
  addCompositionError,
  getCompositionSuccess,
  deleteCompositionSuccess,
  modifyCompositionSuccess,
  getUserHubSuccess,
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
