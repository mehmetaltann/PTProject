import Home from "./pages/Home";
import Investments from "./pages/Investments.jsx";
import InvRecords from "./pages/InvRecords";
import NavBar from "./layouts/Navbar.jsx";
import Budget from "./pages/Budget";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/yatirim-islemleri",
    component: Investments,
  },
  {
    path: "/yatirim-gecmisi",
    component: InvRecords,
  },
  {
    path: "/butce-kayit",
    component: Budget,
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
            <Route path="/login" element={<UserLogin />} />
            <Route path="/sivefa" element={<UserRegister />} />
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
    </BrowserRouter>
  );
};
