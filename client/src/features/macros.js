import { createSlice } from "@reduxjs/toolkit";
import macrosApi from "../api/macros";
import _ from "lodash";

macrosApi.interceptors.request.use(function (config) {
  const token = localStorage.getItem("x-auth-token");
  config.headers["x-auth-token"] = token ? token : "";
  return config;
});

const initialState = {
  searchResults: {},
};

// Slice
const slice = createSlice({
  name: "macros",
  initialState,
  reducers: {
    deleteCommentSuccess: (state, action) => {
      state.searchResults.data
        .find((macros) => macros._id === action.payload.macroId)
        .comments.pull(action.payload.commentId);
    },

    commentsSuccess: (state, action) => {
      state.searchResults.data
        .find((macros) => macros._id === action.payload._id)
        .comments.push(action.payload.res.data);
    },

    clearResults: (state) => {
      state.searchResults = {};
    },
    macrosSuccess: (state, action) => {
      state.searchResults = action.payload.data;
      if (action.payload.config.params)
        state.searchResults.params = action.payload.config.params;
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

    dispatch(commentsSuccess({ _id, res }));
  } catch (e) {
    console.log(e.message);
  }
};

export const deleteComment = (macroId, commentId) => async (dispatch) => {
  try {
    const res = await macrosApi.delete(`/comments/${commentId}`);

    dispatch(commentsSuccess({ macroId, commentId }));
  } catch (e) {
    console.log(e.message);
  }
};
