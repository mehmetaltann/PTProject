import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import YatirimPage from "./pages/YatirimPage";
import BireyselEmeklilikPage from "./pages/BireyselEmeklilikPage";
import IstatistikPage from "./pages/IstatistikPage";
import AileButcesiPage from "./pages/AileButcesiPage";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

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
    path: "/bireysel_emeklilik",
    component: BireyselEmeklilikPage,
  },
  {
    path: "/istatistik",
    component: IstatistikPage,
  },
  {
    path: "/butce",
    component: AileButcesiPage,
  },
];

export const Rotalar = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.component />} />
        ))}
      </Routes>
      <Footer />
    </Router>
  );
};
