// import { createSlice } from "@reduxjs/toolkit";
// import { SignUpThunk } from "./auth.thunk";

// export const authSlice = createSlice({
//   name: "user",
//   initialState: {
//     user: null,
//     pending: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: {
//     // [loginUser.pending]: (state) => {
//     //   state.pending = true;
//     //   state.error = null;
//     // },
//     // [loginUser.fulfilled]: (state, action) => {
//     //   state.auth = action.payload;
//     //   state.pending = false;
//     // },
//     // [loginUser.rejected]: (state, action) => {
//     //   state.pending = false;
//     //   state.error = action.payload;
//     // },
//     // logout out user reducers
//     // [logOutUser.pending]: (state) => {
//     //   state.pending = true;
//     //   state.error = null;
//     // },
//     // [logOutUser.fulfilled]: (state) => {
//     //   state.auth = null;
//     //   state.pending = true;
//     // },
//     // [logOutUser.rejected]: (state, action) => {
//     //   state.pending = false;
//     //   state.error = action.error;
//     // },
//     // customer creation
//     [SignUpThunk.pending]: (state) => {
//       state.pending = true;
//       state.error = null;
//     },
//     [SignUpThunk.fulfilled]: (state, action) => {
//       state.user = action.payload;
//       state.pending = false;
//     },
//     [SignUpThunk.rejected]: (state, action) => {
//       state.pending = false;
//       state.error = action.error;
//     },
//   },
// });

// export default authSlice;
// export const authReducer = authSlice.reducer;
