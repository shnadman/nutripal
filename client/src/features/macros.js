import { createSlice } from "@reduxjs/toolkit";
import macrosApi from "../api/macros";

macrosApi.interceptors.request.use(function (config) {
  const token = localStorage.getItem("x-auth-token");
  config.headers["x-auth-token"] = token ? token : "";
  return config;
});

const initialState = {
  macros: {},
};

// Slice
const slice = createSlice({
  name: "macros",
  initialState,
  reducers: {
    commentsSuccess: (state) => {
      state.macros = state.macros;
    },
    clearResults: (state) => {
      state.macros = {};
    },
    macrosSuccess: (state, action) => {
      state.macros = action.payload.data;
      state.macros.params = action.payload.config.params;
    },
    macrosError: (state, action) => {
      console.log(action.payload);
    },
  },
});
export default slice.reducer;

// Actions
export const {
  macrosSuccess,
  macrosError,
  clearResults,
  commentsSuccess,
} = slice.actions;

export const searchMacros = (params) => async (dispatch) => {
  try {
    const res = await macrosApi.get("/", {
      params,
    });
    dispatch(macrosSuccess(res));
  } catch (e) {
    dispatch(macrosError(e.response.data));
  }
};

export const postComment = (comment, _id) => async (dispatch) => {
  try {
    const body = { content: comment, responseTo: _id };
    const res = await macrosApi.post("/comments", body);

    dispatch(commentsSuccess(res));
  } catch (e) {
    console.log(e.message);
  }
};
