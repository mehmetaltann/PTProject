import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/localData";
import axios from "axios";

const initialState = {
  yatirimIslemleri: [],
  tarihAraligi: 2,
  status: "idle",
  message: null,
  error: null,
  degisim: null,
};

export const getYatirimIslemleri = createAsyncThunk(
  "yatirimIslemleri/getYatirimIslemleri",
  async (args, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const res = await axios.get(
        `${BASE_URL}/yatirim-islem-sorgula/${state.yatirim.tarihAraligi}`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue({ error: err.message });
    }
  }
);

export const postYatirimIslemleriAlis = createAsyncThunk(
  "yatirimIslemleri/postYatirimIslemleriAlis",
  async (initialPost, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/yatirim-alis-ekle`,
        initialPost
      );
      return res.data;
    } catch (err) {
      return rejectWithValue({ error: err.message });
    }
  }
);

export const postYatirimIslemleriSatis = createAsyncThunk(
  "yatirimIslemleri/postYatirimIslemleriSatis",
  async (initialPost, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/yatirim-satis-ekle`,
        initialPost
      );
      return res.data;
    } catch (err) {
      return rejectWithValue({ error: err.message });
    }
  }
);

export const deleteYatirimIslemleri = createAsyncThunk(
  "yatirimIslemleri/deleteYatirimIslemleri",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${BASE_URL}/yatirim-islem-sil/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue({ error: err.message });
    }
  }
);

export const yatirimSlice = createSlice({
  name: "yatirimIslemleri",
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
      .addCase(getYatirimIslemleri.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getYatirimIslemleri.fulfilled, (state, action) => {
        const filteredData = action.payload.map(({ _id: id, ...rest }) => ({
          id,
          ...rest,
        }));
        state.yatirimIslemleri = filteredData;
        state.status = "successful";
      })
      .addCase(getYatirimIslemleri.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message;
      })
      .addCase(postYatirimIslemleriAlis.fulfilled, (state, action) => {
        state.message = action.payload;
        state.degisim = action.payload;
      })
      .addCase(postYatirimIslemleriAlis.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message;
      })
      .addCase(postYatirimIslemleriSatis.fulfilled, (state, action) => {
        state.message = action.payload;
        state.degisim = action.payload;
      })
      .addCase(postYatirimIslemleriSatis.rejected, (state, action) => {
        state.status = "failed";
        state.message= action.error.message;
      })
      .addCase(deleteYatirimIslemleri.fulfilled, (state, action) => {
        state.message = action.payload;
        state.degisim = action.payload;
      })
      .addCase(deleteYatirimIslemleri.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message;
      });
  },
});

export default yatirimSlice.reducer;
export const { tarihAraligiSec, setMessage } = yatirimSlice.actions;
