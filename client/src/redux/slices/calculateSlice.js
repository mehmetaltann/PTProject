import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [{}, {}, {}, {}, {}, {}, {}, {}],
  bankData: [],
  totalData: [],
  selectedBank: "Vakıfbank",
};

export const calculateSlice = createSlice({
  name: "calculate",
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      state.data = payload;
    },
    setBankData: (state, { payload }) => {
      state.bankData = payload;
    },
    setTotalData: (state, { payload }) => {
      state.totalData = payload;
    },
    setSelectedBank: (state, { payload }) => {
      state.selectedBank = payload;
    },
  },
});

export default calculateSlice.reducer;
export const {
  setData,
  setBankData,
  setTotalData,
  setSelectedBank,
  updateBankData,
} = calculateSlice.actions;
