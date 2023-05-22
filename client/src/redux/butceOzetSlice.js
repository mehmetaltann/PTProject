import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { thisMonth, thisYear } from "../utils/help-functions";
import dataServices from "../services/data-services";

const initialState = {
  secilenAy: thisMonth,
  secilenYil: thisYear,
};

export const butceOzetSlice = createSlice({
  name: "butceOzet",
  initialState,
  reducers: {
    setSecilenYil: (state, action) => {
      state.secilenYil = action.payload;
    },
    setSecilenAy: (state, action) => {
      state.secilenAy = parseInt(action.payload);
    },
  },
});

export default butceOzetSlice.reducer;
export const { setSecilenYil, setSecilenAy } = butceOzetSlice.actions;
