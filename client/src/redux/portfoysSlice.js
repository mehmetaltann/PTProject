import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/localData";
import axios from "axios";

const initialState = {
  portfoys: [],
  selectedPortfoy: "Bireysel Emeklilik Fonları",
  status: "idle",
  error: null,
};

export const getPortfoys = createAsyncThunk(
  "portfoy/getPortfoys",
  async (args, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/portfoy-sorgula`);
      return res.data;
    } catch (err) {
      return rejectWithValue({ error: err.message });
    }
  }
);

export const postPortfoys = createAsyncThunk(
  "portfoy/postPortfoys",
  async (initialPost, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/portfoy-ekle`, initialPost);
      return res.data;
    } catch (err) {
      return rejectWithValue({ error: err.message });
    }
  }
);

export const deletePortfoys = createAsyncThunk(
  "portfoy/deletePortfoys",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${BASE_URL}/portfoy-sil/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue({ error: err.message });
    }
  }
);

export const portfoysSlice = createSlice({
  name: "portfoy",
  initialState,
  reducers: {
    portfoySec: (state, { payload }) => {
      state.selectedPortfoy = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPortfoys.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPortfoys.fulfilled, (state, action) => {
        state.portfoys = action.payload;
        state.status = "successful";
      })
      .addCase(getPortfoys.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message;
      })
      .addCase(postPortfoys.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message;
      })
      .addCase(deletePortfoys.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message;
      });
  },
});

export default portfoysSlice.reducer;
export const { portfoySec } = portfoysSlice.actions;
