import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:1623";

const initialState = {
  yatirimIslemleri: [],
  status: "idle",
  error: null,
};

export const getYatirimIslemleri = createAsyncThunk(
  "yatirimIslemleri/getYatirimIslemleri",
  async (date = 2, thunkAPI) => {
    try {
      const res = await axios.get(`${BASE_URL}/yatirim-islem-sorgula/${date}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);

export const postYatirimIslemleri = createAsyncThunk(
  "yatirimIslemleri/postYatirimIslemleri",
  async (initialPost, thunkAPI) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/yatirim-alis-ekle`,
        initialPost
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);

export const yatirimSlice = createSlice({
  name: "yatirimIslemleri",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getYatirimIslemleri.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getYatirimIslemleri.fulfilled, (state, action) => {
        state.yatirimIslemleri = action.payload;
        state.status = "successful";
      })
      .addCase(getYatirimIslemleri.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(postYatirimIslemleri.fulfilled, (state, action) => {
        state.islemler.push(action.payload);
      });
  },
});

export default yatirimSlice.reducer;
