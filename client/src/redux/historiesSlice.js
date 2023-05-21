import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dataServices from "../services/data-services";

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
    const state = getState();
    return await dataServices.getData(
      `gecmis-islem-sorgula/${state.history.tarihAraligi}`,
      rejectWithValue
    );
  }
);

export const deleteHistoryIslemleri = createAsyncThunk(
  "history/deleteHistoryIslemleri",
  async (id, { rejectWithValue }) => {
    return await dataServices.deleteData(id, "gecmis-islem-sil", rejectWithValue);
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
