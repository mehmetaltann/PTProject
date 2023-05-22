import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dataServices from "../services/data-services";

const initialState = {
  categories: [],
  selectedPortfoy: "Bireysel Emeklilik Fonları",
  status: "idle",
  error: null,
};

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (args, { rejectWithValue }) => {
    return await dataServices.getData("category-sorgula", rejectWithValue);
  }
);

export const postCategories = createAsyncThunk(
  "category/postCategories",
  async (initialPost, { rejectWithValue }) => {
    return await dataServices.postData(initialPost, "exlink", rejectWithValue);
  }
);

export const deleteCategories = createAsyncThunk(
  "category/deleteCategories",
  async (id, { rejectWithValue }) => {
    return await dataServices.deleteData(id, "category-sil", rejectWithValue);
  }
);

export const categoriesSlice = createSlice({
  name: "category",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.status = "successful";
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message;
      })
      .addCase(postCategories.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message;
      })
      .addCase(deleteCategories.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message;
      });
  },
});

export default categoriesSlice.reducer;
