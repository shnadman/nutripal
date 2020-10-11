import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import app from "../api/auth";

const initialState = {
  authenticated: "",
  errorMessage: "",
};

// Slice
const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authSuccess: (state, action) => {
      state.authenticated = action.payload;
    },
    authError: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});
export default slice.reducer;

// Actions
export const { authSuccess, authError } = slice.actions;

export const login = (formProps, callback) => async (dispatch) => {
  try {
    const res = await app.post("/api/auth/", formProps);
    localStorage.setItem("x-auth-token", res.data.token);
    dispatch(authSuccess(res.data.token));
    callback();
  } catch (e) {
    dispatch(authError(e.response.data));
  }
};
export const signup = (formProps, callback) => async (dispatch) => {
  try {
    const res = await app.post("/api/users", formProps);
    dispatch(authSuccess(res.headers["x-auth-token"]));
    localStorage.setItem("x-auth-token", res.headers["x-auth-token"]);
    callback();
  } catch (e) {
    dispatch(authError(e.response.data));
  }
};
export const logout = () => {
  localStorage.removeItem("x-auth-token");
  return authSuccess("");
};
