import { createSlice } from "@reduxjs/toolkit";
import macrosApi from "../api/macros";

const initialState = [];

// Slice
const slice = createSlice({
  name: "selected",
  initialState,
  reducers: {
    clearResults: (state) => {
      state = [];
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
export const { macrosSuccess, macrosError, clearResults } = slice.actions;

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
