import { createSlice } from "@reduxjs/toolkit";

const initialDataState = {
  posts: [],
};

const dataSlice = createSlice({
  name: "data",
  initialDataState,
  reducers: {
    setstoreData: (state, action) => {
      state.posts = action.payload;
    },
  },
});
export const { setstoreData } = dataSlice.actions;

export default dataSlice;
