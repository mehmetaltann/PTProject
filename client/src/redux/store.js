import { configureStore } from "@reduxjs/toolkit";
import { portfolioApi } from "./api/portfolioApi";
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
    [portfolioApi.reducerPath]: portfolioApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(portfolioApi.middleware),
});
