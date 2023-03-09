import "./sass/main.scss";
import { useState, useMemo } from "react";
import { Rotalar } from "./Routes";
import { DataContext } from "./store/dataContext";

function App() {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const value = useMemo(
    () => ({ selectedMeal, setSelectedMeal }),
    [selectedMeal, setSelectedMeal]
  );

  return (
    <>
      <DataContext.Provider value={value}>
        <Rotalar />
      </DataContext.Provider>
    </>
  );
}

export default App;
