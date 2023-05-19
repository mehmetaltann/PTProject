import { Rotalar } from "./Routes";
import { ThemeProvider, Box, Container } from "@mui/material";
import { GlobalTheme } from "./styles/GlobalTheme";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPortfoys } from "./redux/portfoysSlice";
import { getGuncelDegerler } from "./redux/guncelDegerlerSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPortfoys());
    dispatch(getGuncelDegerler());
  }, [dispatch]);

  return (
    <ThemeProvider theme={GlobalTheme}>
      <Rotalar />
    </ThemeProvider>
  );
}

export default App;
