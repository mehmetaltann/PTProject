import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/localData";
import axios from "axios";

const initialState = {
  categories: [],
  selectedPortfoy: "Bireysel Emeklilik Fonları",
  status: "idle",
  error: null,
};

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (args, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/category-sorgula`);
      return res.data;
    } catch (err) {
      return rejectWithValue({ error: err.message });
    }
  }
);

export const postCategories = createAsyncThunk(
  "category/postCategories",
  async (initialPost, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/category-ekle`, initialPost);
      return res.data;
    } catch (err) {
      return rejectWithValue({ error: err.message });
    }
  }
);

export const deleteCategories = createAsyncThunk(
  "category/deleteCategories",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${BASE_URL}/category-sil/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue({ error: err.message });
    }
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
