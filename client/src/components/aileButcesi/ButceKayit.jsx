import React from "react";
import styled from "styled-components";
import ContentTitle from "./ContentTitle";
import KayitForm from "./KayitForm";
import TarihSecim from "./TarihSecim";
import TableTitle from "./TableTitle";
import DataTable from "./DataTable";
import { useGlobalContext } from "../../context/globalContext";
import { useEffect } from "react";

const ButceKayit = () => {
  const { butceKalemiGetir, activeTarih, activeCategory } = useGlobalContext();

  useEffect(() => {
    butceKalemiGetir();
  }, [activeTarih]);

  return (
    <ButceKayitStyled>
      <ContentTitle />
      <div className="container">
        <div className="left-container">
          <div className="form-container">
            <KayitForm />
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
        height: 35%;
        background: var(--theme-secondary);
        border: var(--theme-border);
        box-shadow: var(--theme-box-shadow);
        padding: 1rem;
        margin-top: 2rem;
        border-radius: 20px;
        overflow: hidden;
        display: flex;
        justify-content: space-around;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;

        .active {
          background-color: var(--theme-fourth);
          color: var(--theme-primary);
        }
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
      overflow: hidden;

      &::-webkit-scrollbar {
        display: none;
      }

      .title-container {
        padding: 1rem;
        width: 100%;
        overflow: hidden;
      }

      .dataTable-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        overflow: auto;
      }
    }
  }
`;

export default ButceKayit;
