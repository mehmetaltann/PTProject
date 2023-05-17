import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:1623";

const initialState = {
  categories: [],
  status: "idle",
  error: null,
};

export const categoriesSlice = createSlice({
  name: "category",
  initialState,
  extraReducers: (builder) => {},
});

export default categoriesSlice.reducer;
