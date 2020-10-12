import { createSlice } from "@reduxjs/toolkit";
import macrosApi from "../api/macros";

const initialState = {
  macros: {},
};

// Slice
const slice = createSlice({
  name: "macros",
  initialState,
  reducers: {
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
export const { macrosSuccess, macrosError } = slice.actions;

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
