import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    loading: false,
    error: null,
    isLoggedIn: false,
  },
  reducers: {
    registerUser: (state, action) => {
      state.userInfo = action.payload;
      state.isLoggedIn = true;
      state.loading = false;
    },
    loginUser: (state, action) => {
      state.userInfo = action.payload;
      state.isLoggedIn = true;
      state.loading = false;
    },
    logoutUser: (state) => {
      state.userInfo = null;
      state.isLoggedIn = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetError: (state) => {
      state.error = null;
    }
  },
});

export const { registerUser, loginUser, logoutUser, setLoading, setError, resetError } = UserSlice.actions;

export default UserSlice.reducer;
