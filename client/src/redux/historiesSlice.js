import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {BASE_URL} from "../utils/localData"
import axios from "axios";

const initialState = {
  historyIslemleri: [],
  tarihAraligi: 2,
  status: "idle",
  message: null,
  error: null,
  degisim: null,
};

export const getHistoryIslemleri = createAsyncThunk(
  "history/getHistoryIslemleri",
  async (args, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const res = await axios.get(
        `${BASE_URL}/gecmis-islem-sorgula/${state.history.tarihAraligi}`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue({ error: err.message });
    }
  }
);

export const deleteHistoryIslemleri = createAsyncThunk(
  "history/deleteHistoryIslemleri",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${BASE_URL}/gecmis-islem-sil/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue({ error: err.message });
    }
  }
);

export const historiesSlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    tarihAraligiSec: (state, action) => {
      state.tarihAraligi = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHistoryIslemleri.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getHistoryIslemleri.fulfilled, (state, action) => {
        const filteredData = action.payload.map(({ _id: id, ...rest }) => ({
          id,
          ...rest,
        }));
        state.historyIslemleri = filteredData;
        state.status = "successful";
      })
      .addCase(getHistoryIslemleri.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message;
      })
      .addCase(deleteHistoryIslemleri.fulfilled, (state, action) => {
        state.degisim = action.payload;
        state.message = action.payload;
      })
      .addCase(deleteHistoryIslemleri.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message;
      });
  },
});

export default historiesSlice.reducer;
export const { tarihAraligiSec, setMessage } = historiesSlice.actions;
