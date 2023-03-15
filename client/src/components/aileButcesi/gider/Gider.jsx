import React from "react";
import styled from "styled-components";
import GiderForm from "./GiderForm";
import GiderItem from "./GiderItem";

import { InnerLayout } from "../../../styles/Layout";
import { useGlobalContext } from "../../../context/globalContext";
import { useEffect } from "react";

const Gider = () => {
  const { giderGetir, giderler, giderSil, toplamGider} =
    useGlobalContext();


  useEffect(() => {
    giderGetir();
  }, []);

  return (
    <GiderStyle>
      <InnerLayout>
        <h2>Giderler</h2>
        <h2 className="toplam-gider">
          Toplam Gider: <span>{toplamGider()} TL</span>
        </h2>
        <div className="gider-content">
          <div className="form-container">
            <GiderForm />
          </div>
          <div className="giderler">
            {giderler.map(
              ({
                _id,
                title,
                amount,
                date,
                categoryA,
                categoryB,
                description,
              }) => {
                return (
                  <GiderItem
                    key={_id}
                    id={_id}
                    title={title}
                    amount={amount}
                    date={date}
                    categoryA={categoryA}
                    categoryB={categoryB}
                    description={description}
                    indicatorColor={"var(--theme-red)"}
                    deleteItem={giderSil}
                  />
                );
              }
            )}
          </div>
        </div>

      </InnerLayout>
    </GiderStyle>
  );
};

const GiderStyle = styled.div`
  display: flex;
  overflow: auto;

  .toplam-gider {
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

  .gider-content {
    display: flex;
    overflow: auto;
    flex-wrap: wrap;
    gap: 1.5rem;

    .giderler {
      flex: 1;
    }
  }
`;

export default Gider;
