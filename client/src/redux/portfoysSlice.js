import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dataServices from "../services/data-services";

const initialState = {
  portfoys: [],
  selectedPortfoy: "Tümü",
  status: "idle",
  error: null,
};

export const getPortfoys = createAsyncThunk(
  "portfoy/getPortfoys",
  async (args, { rejectWithValue }) => {
    return await dataServices.getData("portfoy-sorgula", rejectWithValue);
  }
);

export const postPortfoys = createAsyncThunk(
  "portfoy/postPortfoys",
  async (initialPost, { rejectWithValue }) => {
    return await dataServices.postData(initialPost, "portfoy-ekle", rejectWithValue);
  }
);

export const deletePortfoys = createAsyncThunk(
  "portfoy/deletePortfoys",
  async (id, { rejectWithValue }) => {
    return await dataServices.deleteData(id, "portfoy-sil", rejectWithValue);
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
