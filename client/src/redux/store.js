import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import generalSlice from "./slices/generalSlice";
import yatirimSlice from "./yatirimSlice";
import butcesSlice from "./butcesSlice";
import portfoliosSlice from "./portfoliosSlice";
import categoriesSlice from "./categoriesSlice";
import historiesSlice from "./historiesSlice";
import guncelDurumSlice from "./guncelDurumSlice";

export const store = configureStore({
  reducer: {
    yatirim: yatirimSlice,
    butce: butcesSlice,
    portfolio: portfoliosSlice,
    category: categoriesSlice,
    history: historiesSlice,
    guncelDurum: guncelDurumSlice,
    general: generalSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
