import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:1623";

const initialState = {
  historyIslemleri: [],
  status: "idle",
  error: null,
};

export const historiesSlice = createSlice({
  name: "history",
  initialState,
  extraReducers: (builder) => {},
});

export default historiesSlice.reducer;
