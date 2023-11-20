// import { createAsyncThunk } from "@reduxjs/toolkit";
// import HTTP from "../../../config/HTTPS";
// import baseUrl from "../../../config/Config";
// import Api from "../../../config/Config";

// export const SignUpThunk = createAsyncThunk(
//   "user/create",
//   async (user, { rejectWithValue }) => {
//     try {
//       const singUp = await axios.post(Api?.SIGN_UP, user);
//       if (!singUp?.data) {
//         return rejectWithValue(singUp);
//       }
//       const { statusCode, message, data } = singUp;
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
