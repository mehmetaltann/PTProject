import { useState } from "react";
import AbSideBar from "../layouts/aileButce/AbSideBar";
import Dashboard from "../components/aileButcesi/dashboard/Dashboard";
import Gelir from "../components/aileButcesi/gelir/Gelir";
import Gider from "../components/aileButcesi/gider/Gider";
import { useGlobalContext } from "../context/globalContext";

const AileButcesiPage = () => {
  const [active, setActive] = useState(1);

  const global = useGlobalContext();

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Dashboard />;
      case 3:
        return <Gelir />;
      case 4:
        return <Gider />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <AbSideBar active={active} setActive={setActive} />
      <main className="abmain">
        <h2>{displayData()}</h2>
      </main>
    </>
  );
};

export default AileButcesiPage;
