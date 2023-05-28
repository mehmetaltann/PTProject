import { Rotalar } from "./Routes";
import { ThemeProvider } from "@mui/material";
import { GlobalTheme } from "./styles/GlobalTheme";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getGuncelDurum } from "./redux/guncelDurumSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGuncelDurum());
  }, [dispatch]);

  return (
    <ThemeProvider theme={GlobalTheme}>
      <Rotalar />
    </ThemeProvider>
  );
}

export default App;
