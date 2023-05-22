import { configureStore } from "@reduxjs/toolkit";
import yatirimSlice from "./yatirimSlice";
import butcesSlice from "./butcesSlice";
import portfoysSlice from "./portfoysSlice";
import categoriesSlice from "./categoriesSlice";
import historiesSlice from "./historiesSlice";
import guncelDegerlerSlice from "./guncelDegerlerSlice";
import butceOzetSlice from "./butceOzetSlice";

export const store = configureStore({
  reducer: {
    yatirim: yatirimSlice,
    butce: butcesSlice,
    butceOzet: butceOzetSlice,
    portfoy: portfoysSlice,
    category: categoriesSlice,
    history: historiesSlice,
    guncelDeger: guncelDegerlerSlice,
  },
});
