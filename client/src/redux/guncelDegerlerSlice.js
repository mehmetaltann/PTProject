import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/localData";
import axios from "axios";

const initialState = {
  guncelDegerler: [],
  status: "idle",
  message: null,
  error: null,
};

export const getGuncelDegerler = createAsyncThunk(
  "history/getHistoryIslemleri",
  async (args, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/guncel-deger-sorgula`);
      return res.data;
    } catch (err) {
      return rejectWithValue({ error: err.message });
    }
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
