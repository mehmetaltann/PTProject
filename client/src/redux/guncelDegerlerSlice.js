import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dataServices from "../services/data-services";

const initialState = {
  guncelDegerler: [],
  status: "idle",
  message: null,
  error: null,
};

export const getGuncelDegerler = createAsyncThunk(
  "history/getHistoryIslemleri",
  async (args, { rejectWithValue }) => {
    return await dataServices.getData("guncel-deger-sorgula", rejectWithValue);
  }
);

export const guncelDegerlerSlice = createSlice({
  name: "guncelDeger",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getGuncelDegerler.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getGuncelDegerler.fulfilled, (state, action) => {
        const filteredData = action.payload.map(({ _id: id, ...rest }) => ({
          id,
          ...rest,
        }));
        state.guncelDegerler = filteredData;
        state.status = "successful";
      })
      .addCase(getGuncelDegerler.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message;
      });
  },
});

export default guncelDegerlerSlice.reducer;
