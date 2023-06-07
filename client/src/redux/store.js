import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./baseApi";
import generalSlice from "./slices/generalSlice";
import calculateSlice from "./slices/calculateSlice";
import parameterSlices from "./slices/parameterSlices";

export const store = configureStore({
  reducer: {
    general: generalSlice,
    calculate: calculateSlice,
    parameter: parameterSlices,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(baseApi.middleware),
});
