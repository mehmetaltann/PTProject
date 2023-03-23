import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import YatirimPage from "./pages/YatirimPage";
import BireyselEmeklilikPage from "./pages/BireyselEmeklilikPage";
import NavBar from "./layouts/NavBar";
import ButceGenelDurumPage from "./pages/ButceGenelDurumPage";
import ButceKayitPage from "./pages/ButceKayitPage";

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/yatirim",
    component: YatirimPage,
  },
  {
    path: "/yatirim2",
    component: BireyselEmeklilikPage,
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
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.component />} />
        ))}
      </Routes>
    </Router>
  );
};
