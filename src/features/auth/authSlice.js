
import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("eventhub_user");

const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem(
        "eventhub_user",
        JSON.stringify(action.payload)
      );
    },

    logout: (state) => {
      state.user = null;
      localStorage.removeItem("eventhub_user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
