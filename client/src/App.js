import { Rotalar } from "./Routes";
import { ThemeProvider } from "@mui/material";
import { GlobalTheme } from "./styles/GlobalTheme";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { portfolioApi } from "./redux/api/portfolioApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPortfolios } from "./redux/portfoliosSlice";
import { getGuncelDurum } from "./redux/guncelDurumSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPortfolios());
    dispatch(getGuncelDurum());
  }, [dispatch]);

  return (
    <ThemeProvider theme={GlobalTheme}>
      <Rotalar />
    </ThemeProvider>
  );
}

export default App;
