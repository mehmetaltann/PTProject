import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, Container } from "@mui/material";
import HomePage from "./pages/HomePage";
import YatirimIslemleri from "./pages/YatirimIslemleri.jsx";
import YatirimGecmisi from "./pages/YatirimGecmisi";
import NavBar from "./layouts/NavBar";
import ButceGenelDurumPage from "./pages/ButceGenelDurumPage";
import ButceKayitPage from "./pages/ButceKayitPage";
import ButceGiris from "./pages/ButceGiris";

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/yatirim-islemleri",
    component: YatirimIslemleri,
  },
  {
    path: "/yatirim-gecmisi",
    component: YatirimGecmisi,
  },
  {
    path: "/butce-kayit",
    component: ButceGiris,
  },
  {
    path: "/genel-durum",
    component: ButceGenelDurumPage,
  },
  {
    path: "/butce",
    component: ButceKayitPage,
  },
];

export const Rotalar = () => {
  return (
    <Router>
      <NavBar />
      <Box sx={{ height: "100vh", overflow: "auto" }}>
        <Container>
          <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
        </Container>
      </Box>
    </Router>
  );
};
