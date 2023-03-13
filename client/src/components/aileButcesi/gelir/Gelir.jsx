import React from "react";
import { useGlobalContext } from "../../../context/globalContext";
import GelirForm from "./GelirForm";

const Gelir = () => {
  const { gelirEkle } = useGlobalContext();

  return (
    <div className="gelir">
      <h2 className="gelir__title">Gelirler</h2>
      <div className="gelir__content">
        <div className="gelir__form-container">
          <GelirForm/>
        </div>
        <div className="gelir__gelirler"></div>
      </div>
    </div>
  );
};

export default Gelir;
