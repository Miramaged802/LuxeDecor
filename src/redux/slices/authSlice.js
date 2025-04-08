import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuthenticated: !!localStorage.getItem("user"),
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    registerSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("user");
    },
    updateUserInfo: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    updateUserOrders: (state, action) => {
      state.user.orders = [...(state.user.orders || []), action.payload];
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  loginSuccess,
  registerSuccess,
  logout,
  updateUserInfo,
  updateUserOrders,
  setError,
} = authSlice.actions;

export default authSlice.reducer;
