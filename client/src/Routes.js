import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import YatirimIslemleri from "./pages/YatirimIslemleri.jsx";
import YatirimGecmisi from "./pages/YatirimGecmisi";
import NavBar from "./layouts/NavBar";
import ButceIslemleri from "./pages/ButceIslemleri";
import UserGiris from "./pages/UserGiris";
import UserKayit from "./pages/UserKayit";
import Footer from "./layouts/Footer";

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
    component: ButceIslemleri,
  },
];

export const Rotalar = () => {
  const user = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Routes>
        {!user ? (
          <>
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path="/login" element={<UserGiris />} />
            <Route path="/sivefa" element={<UserKayit />} />
          </>
        ) : (
          <Route
            element={
              <>
                <NavBar />
                <Outlet />
              </>
            }
          >
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Route>
        )}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
