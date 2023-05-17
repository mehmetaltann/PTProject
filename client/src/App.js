import { Rotalar } from "./Routes";
import { ThemeProvider } from "@mui/material";
import { GlobalTheme } from "./styles/GlobalTheme";
import { useGlobalContext } from "./store/globalContext";
import { useEffect } from "react";

function App() {
  const { portfoyleriGetir, guncelDegerleriGetir } = useGlobalContext();

  useEffect(() => {
    portfoyleriGetir();
    guncelDegerleriGetir();
  }, []);

  return (
    <ThemeProvider theme={GlobalTheme}>
      <Rotalar />
    </ThemeProvider>
  );
}

export default App;
