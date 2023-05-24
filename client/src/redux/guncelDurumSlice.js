import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dataServices from "../services/data-services";

const initialState = {
  guncelDurum: [],
  status: "idle",
  message: null,
  error: null,
};

export const getGuncelDurum = createAsyncThunk(
  "guncelDurum/getGuncelDurum",
  async (args, { rejectWithValue }) => {
    return await dataServices.getData("guncel-durum", rejectWithValue);
  }
);

export const guncelDurumSlice = createSlice({
  name: "guncelDurum",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getGuncelDurum.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getGuncelDurum.fulfilled, (state, action) => {
        state.guncelDurum = action.payload;
        state.status = "successful";
      })
      .addCase(getGuncelDurum.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message;
      });
  },
});

export default guncelDurumSlice.reducer;
