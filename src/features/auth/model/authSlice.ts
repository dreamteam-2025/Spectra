import { createSlice } from "@reduxjs/toolkit";
//import { authApi } from "../api/authApi";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: create => ({
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    }),
  }),
  selectors: {
    selectIsLoggedIn: state => state.isLoggedIn,
  },
  //extraReducers: builder => { },
});

export const { selectIsLoggedIn } = authSlice.selectors;
export const authReducer = authSlice.reducer;
