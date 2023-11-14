import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Feature/authSlice";
import DataSlice from "../Feature/DataSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    data: DataSlice,
  },
});
export default store;
