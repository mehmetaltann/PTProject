import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedPortfolio: "Tümü",
  selectedDate: 2,
  selectedBudgetType: "Tümü",
  snackbar: null,
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
    setSnackbar: (state, { payload }) => {
      state.snackbar = payload;
    },
  },
});

export default generalSlice.reducer;
export const { pickPortfolio, pickDate, pickBudgetType, setSnackbar } =
  generalSlice.actions;
