import React from "react";
import styled from "styled-components";
import ContentTitle2 from "./ContentTitle2";
import KayitForm from "./KayitForm";
import TarihSecim from "./TarihSecim";
import TableTitle from "./TableTitle";
import DataTable from "./DataTable";
import { useGlobalContext } from "../../context/globalContext";
import { useEffect, useState } from "react";

const ButceKayit = () => {
  const [activeType, setActiveType] = useState("gelir");
  const { butceKalemiGetir, activeTarih } = useGlobalContext();

  useEffect(() => {
    butceKalemiGetir();
  }, [activeTarih]);

  return (
    <ButceKayitStyled>
      <ContentTitle2 activeType={activeType} setActiveType={setActiveType} />
      <div className="container">
        <div className="left-container">
          <div className="form-container">
            <KayitForm activeType={activeType} />
          </div>
          <div className="tarihSecim-container">
            <TarihSecim />
          </div>
        </div>
        <div className="right-container">
          <div className="title-container">
            <TableTitle />
          </div>
          <div className="dataTable-container">
            <DataTable />
          </div>
        </div>
      </div>
    </ButceKayitStyled>
  );
};

const ButceKayitStyled = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    padding-top: 0.8rem;

    .left-container {
      width: 22%;
      height: 700px;
      background-color: var(--theme-secondary);
      border: var(--theme-border);
      box-shadow: var(--theme-box-shadow);
      border-radius: 20px;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      text-align: center;

      .form-container {
      }

      .tarihSecim-container {
      }
    }

    .right-container {
      flex: 1;
      height: 700px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: var(--theme-secondary);
      border: var(--theme-border);
      box-shadow: var(--theme-box-shadow);
      border-radius: 20px;
      padding: 1rem;
      overflow: auto;

      &::-webkit-scrollbar {
        display: none;
      }

      h3 {
        margin-bottom: 1rem;

        span {
          color: ${(props) => props.indicatorColor};
          opacity: 0.8;
        }
      }

      .title-container {
      }

      .dataTable-container {
      }
    }
  }
`;

export default ButceKayit;
