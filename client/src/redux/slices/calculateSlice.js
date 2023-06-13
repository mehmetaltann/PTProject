import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [{}, {}, {}, {}, {}, {}, {}, {}],
  investmentData: [{}, {}],
  budgetData: [{}, {}],
  bankData: [],
  totalData: [],
  selectedBank: "VB",
};

export const calculateSlice = createSlice({
  name: "calculate",
  initialState,
  reducers: {
    setData: (state, { payload }) => {
      state.data = payload;
    },
    setInvestmentData: (state, { payload }) => {
      state.investmentData = payload;
    },
    setBudgetData: (state, { payload }) => {
      state.budgetData = payload;
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
  setInvestmentData,
  setBudgetData,
} = calculateSlice.actions;
