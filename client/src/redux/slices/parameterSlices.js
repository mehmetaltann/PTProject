import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  parameterType: "portfolio",
};

export const parameterSlice = createSlice({
  name: "parameter",
  initialState,
  reducers: {
    setParameterType: (state, { payload }) => {
      state.parameterType = payload;
    },
  },
});

export default parameterSlice.reducer;
export const { setParameterType } = parameterSlice.actions;
