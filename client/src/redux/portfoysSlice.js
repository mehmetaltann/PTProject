import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:1623";

const initialState = {
  portfoys: [],
  status: "idle",
  error: null,
};

export const portfoysSlice = createSlice({
  name: "portfoy",
  initialState,
  extraReducers: (builder) => {},
});

export default portfoysSlice.reducer;