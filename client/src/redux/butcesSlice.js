import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:1623";

const initialState = {
  butceIslemleri: [],
  status: "idle",
  error: null,
};

export const butceSlice = createSlice({
  name: "butce",
  initialState,
  extraReducers: (builder) => {},
});

export default butceSlice.reducer;
