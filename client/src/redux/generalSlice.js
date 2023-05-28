import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedPortfolio: "Tümü",
  selectedDate: 2,
  selectedBudgetType: "Tümü",
  messageData: null,
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    pickPortfolio: (state, { payload }) => {
      state.selectedPortfolio = payload;
    },
    pickDate: (state, { payload }) => {
      state.selectedDate = payload;
    },
    pickBudgetType: (state, { payload }) => {
      state.selectedBudgetType = payload;
    },
    setMessage: (state, { payload }) => {
      state.messageData = payload;
    },
  },
});

export default generalSlice.reducer;
export const { pickPortfolio, pickDate, pickBudgetType, setMessage } =
  generalSlice.actions;
