import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import app from "../api/auth";

const initialState = {
  authenticated: "",
  errorMessage: "",
  userId: "",
};

// Slice
const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authSuccess: (state, action) => {
      state.authenticated = action.payload.token;
      state.userId = action.payload.userId;
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
    localStorage.setItem("x-user-id", res.data.userId);
    dispatch(authSuccess(res.data));
    callback();
  } catch (e) {
    dispatch(authError(e.response.data));
  }
};
export const signup = (formProps, callback) => async (dispatch) => {
  try {
    const res = await app.post("/api/users", formProps);
    const token = res.headers["x-auth-token"];
    const userId = res.headers["x-user-id"];
    dispatch(authSuccess({ token, userId }));
    localStorage.setItem("x-auth-token", res.headers["x-auth-token"]);
    localStorage.setItem("x-user-id", res.headers["x-user-id"]);
    callback();
  } catch (e) {
    debugger;
    dispatch(authError(e.response.data));
  }
};
export const logout = () => {
  localStorage.removeItem("x-auth-token");
  localStorage.removeItem("x-user-id");
  return authSuccess("");
};
