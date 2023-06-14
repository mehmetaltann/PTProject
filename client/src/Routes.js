import Home from "./pages/Home";
import Investments from "./pages/Investments.jsx";
import InvestmentRecords from "./pages/InvestmentRecords";
import Budget from "./pages/Budget";
import BudgetStatistics from "./pages/BudgetStatistics.jsx";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import NavBar from "./layouts/NavBar";
import CalculateSheet from "./pages/CalculateSheet";
import Parameters from "./pages/Parameters";
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
    component: InvestmentRecords,
  },
  {
    path: "/butce-kayit",
    component: Budget,
  },
  {
    path: "/hesaplama-tablosu",
    component: CalculateSheet,
  },
  {
    path: "/parametereler",
    component: Parameters,
  },
  {
    path: "/butce-istatistik",
    component: BudgetStatistics,
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
