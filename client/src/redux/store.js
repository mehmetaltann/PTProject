import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./baseApi";
import generalSlice from "./generalSlice";

export const store = configureStore({
  reducer: {
    general: generalSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
