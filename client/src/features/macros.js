import { createSlice } from "@reduxjs/toolkit";
import macrosApi from "../api/macros";

macrosApi.interceptors.request.use(function (config) {
  const token = localStorage.getItem("x-auth-token");
  config.headers["x-auth-token"] = token ? token : "";
  return config;
});

const initialState = {
  searchResults: {},
  isLoading: false,
};

// Slice
const slice = createSlice({
  name: "macros",
  initialState,
  reducers: {
    changeLoadingState: (state, action) => {
      state.isLoading = action.payload;
    },
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
  changeLoadingState,
} = slice.actions;

export const searchMacros = (params) => async (dispatch) => {
  try {
    dispatch(changeLoadingState(true));
    const res = await macrosApi.get("/", {
      params,
    });
    dispatch(macrosSuccess(res));
    dispatch(changeLoadingState(false));
  } catch (e) {
    if (!e.response) {
      dispatch(macrosError("Timed out"));
      dispatch(changeLoadingState(false));
    } else {
      dispatch(macrosError(e.response.data));
      dispatch(changeLoadingState(false));
    }
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
