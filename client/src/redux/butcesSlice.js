import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {BASE_URL} from "../utils/localData"
import axios from "axios";

const initialState = {
  butceIslemleri: [],
  tarihAraligi: 2,
  status: "idle",
  message: null,
  error: null,
  degisim: null,
};

export const getButceIslemleri = createAsyncThunk(
  "butce/getButceIslemleri",
  async (args, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const res = await axios.get(
        `${BASE_URL}/butce-sorgula/${state.butce.tarihAraligi}`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue({ error: err.message });
    }
  }
);

export const postButceIslemi = createAsyncThunk(
  "butce/postButceIslemi",
  async (initialPost, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/butce-veri-ekle`, initialPost);
      return res.data;
    } catch (err) {
      return rejectWithValue({ error: err.message });
    }
  }
);

export const deleteButceIslemi = createAsyncThunk(
  "butce/deleteButceIslemi",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${BASE_URL}/butce-veri-sil/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue({ error: err.message });
    }
  }
);

export const butceSlice = createSlice({
  name: "butce",
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
      .addCase(getButceIslemleri.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getButceIslemleri.fulfilled, (state, action) => {
        const filteredData = action.payload.map(({ _id: id, ...rest }) => ({
          id,
          ...rest,
        }));
        state.butceIslemleri = filteredData;
        state.status = "successful";
      })
      .addCase(getButceIslemleri.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message;
      })
      .addCase(postButceIslemi.fulfilled, (state, action) => {
        state.message = action.payload;
        state.degisim = action.payload;
      })
      .addCase(postButceIslemi.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message;
      })
      .addCase(deleteButceIslemi.fulfilled, (state, action) => {
        state.message = action.payload;
        state.degisim = action.payload;
      })
      .addCase(deleteButceIslemi.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message;
      });
  },
});

export default butceSlice.reducer;
export const { tarihAraligiSec, setMessage } = butceSlice.actions;
