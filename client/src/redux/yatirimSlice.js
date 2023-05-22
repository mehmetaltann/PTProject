import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dataServices from "../services/data-services";

const initialState = {
  yatirimIslemleri: [],
  tarihAraligi: 2,
  status: "idle",
  message: null,
  error: null,
  degisim: null,
  islemTipi: "Alış",
};

export const getYatirimIslemleri = createAsyncThunk(
  "yatirimIslemleri/getYatirimIslemleri",
  async (args, { rejectWithValue, getState }) => {
    const state = getState();
    return await dataServices.getData(
      `yatirim-islem-sorgula/${state.yatirim.tarihAraligi}`,
      rejectWithValue
    );
  }
);

export const postYatirimIslemleriAlis = createAsyncThunk(
  "yatirimIslemleri/postYatirimIslemleriAlis",
  async (initialPost, { rejectWithValue }) => {
    return await dataServices.postData(
      initialPost,
      "yatirim-alis-ekle",
      rejectWithValue
    );
  }
);

export const postYatirimIslemleriSatis = createAsyncThunk(
  "yatirimIslemleri/postYatirimIslemleriSatis",
  async (initialPost, { rejectWithValue }) => {
    return await dataServices.postData(
      initialPost,
      "yatirim-satis-ekle",
      rejectWithValue
    );
  }
);

export const deleteYatirimIslemleri = createAsyncThunk(
  "yatirimIslemleri/deleteYatirimIslemleri",
  async (id, { rejectWithValue }) => {
    return await dataServices.deleteData(
      id,
      "yatirim-islem-sil",
      rejectWithValue
    );
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
    islemTipiSec: (state, action) => {
      state.islemTipi = action.payload;
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
        state.message = action.error.message;
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
export const { tarihAraligiSec, setMessage, islemTipiSec } =
  yatirimSlice.actions;
