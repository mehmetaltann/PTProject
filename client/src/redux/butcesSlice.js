import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dataServices from "../services/data-services";

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
    const state = getState();
    return await dataServices.getData(
      `butce-sorgula/${state.butce.tarihAraligi}`,
      rejectWithValue
    );
  }
);

export const postButceIslemi = createAsyncThunk(
  "butce/postButceIslemi",
  async (initialPost, { rejectWithValue }) => {
    await dataServices.postData(
      initialPost,
      "butce-veri-ekle",
      rejectWithValue
    );
  }
);

export const deleteButceIslemi = createAsyncThunk(
  "butce/deleteButceIslemi",
  async (id, { rejectWithValue }) => {
    await dataServices.deleteData(id, "butce-veri-sil", rejectWithValue);
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
