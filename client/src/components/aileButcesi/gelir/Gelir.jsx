import React from "react";
import styled from "styled-components";
import GelirForm from "./GelirForm";
import GelirItem from "./GelirItem";

import { InnerLayout } from "../../../styles/Layout";
import { useGlobalContext } from "../../../context/globalContext";
import { useEffect, useState } from "react";

const Gelir = () => {
  const { gelirGetir, gelirler, gelirSil, toplamGelir } = useGlobalContext();


  useEffect(() => {
    gelirGetir();
  }, []);

  return (
    <GelirStyle>
      <InnerLayout>
        <h2>Gelirler</h2>
        <h2 className="toplam-gelir">
          Toplam Gelir: <span>{toplamGelir()} TL</span>
        </h2>
        <div className="gelir-content">
          <div className="form-container">
            <GelirForm />
          </div>
          <div className="gelirler">
            {gelirler.map(
              ({ _id, title, amount, date, category, description }) => {
                return (
                  <GelirItem
                    key={_id}
                    id={_id}
                    title={title}
                    amount={amount}
                    date={date}
                    category={category}
                    description={description}
                    indicatorColor={"var(--theme-green)"}
                    deleteItem={gelirSil}
                  />
                );
              }
            )}
          </div>
        </div>

      </InnerLayout>
    </GelirStyle>
  );
};

const GelirStyle = styled.div`
  display: flex;
  overflow: auto;

  .toplam-gelir {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--theme-primary);
    border: var(--theme-border);
    box-shadow: var(--theme-box-shadow);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 1.6rem;
    gap: 0.5rem;

    span {
      color: var(--theme-green);
      opacity: 0.8;
    }
  }

  .gelir-content {
    display: flex;
    overflow: auto;
    flex-wrap: wrap;
    gap: 1.5rem;

    .gelirler {
      flex: 1;
    }
  }
`;

export default Gelir;
