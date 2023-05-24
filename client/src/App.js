import { Rotalar } from "./Routes";
import { ThemeProvider } from "@mui/material";
import { GlobalTheme } from "./styles/GlobalTheme";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPortfoys } from "./redux/portfoysSlice";
import { getGuncelDurum } from "./redux/guncelDurumSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPortfoys());
    dispatch(getGuncelDurum());
  }, [dispatch]);

  return (
    <ThemeProvider theme={GlobalTheme}>
      <Rotalar />
    </ThemeProvider>
  );
}

export default App;
