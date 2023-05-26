import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dataServices from "../services/data-services";

const initialState = {
  portfolios: [],
  selectedPortfolio: "Tümü",
  status: "idle",
  error: null,
};

export const getPortfolios = createAsyncThunk(
  "portfoy/getPortfoys",
  async (args, { rejectWithValue }) => {
    return await dataServices.getData("portfoy-sorgula", rejectWithValue);
  }
);

export const postPortfolios = createAsyncThunk(
  "portfoy/postPortfoys",
  async (initialPost, { rejectWithValue }) => {
    return await dataServices.postData(
      initialPost,
      "portfoy-ekle",
      rejectWithValue
    );
  }
);

export const deletePortfolios = createAsyncThunk(
  "portfoy/deletePortfoys",
  async (id, { rejectWithValue }) => {
    return await dataServices.deleteData(id, "portfoy-sil", rejectWithValue);
  }
);

export const portfoliosSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    pickPortfolio: (state, { payload }) => {
      state.selectedPortfolio = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPortfolios.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPortfolios.fulfilled, (state, action) => {
        state.portfolios = action.payload;
        state.status = "successful";
      })
      .addCase(getPortfolios.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message;
      })
      .addCase(postPortfolios.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message;
      })
      .addCase(deletePortfolios.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message;
      });
  },
});

export default portfoliosSlice.reducer;
export const { pickPortfolio } = portfoliosSlice.actions;
