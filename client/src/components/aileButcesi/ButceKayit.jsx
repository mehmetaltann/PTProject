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
  }, [activeTarih, activeCategory]);

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
  height: 900px;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding-top: 0.8rem;

  .container {
    width: 100%;
    display: flex;
    gap: 1.5rem;
    padding-top: 0.8rem;

    @media only screen and (max-width: 700px) {
      height: 1800px;
      flex-direction: column;
    }

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

      @media only screen and (max-width: 1400px) {
        width: 30%;
      }

      @media only screen and (max-width: 1000px) {
        width: 40%;
      }

      @media only screen and (max-width: 700px) {
        width: 100%;
        height:600px;
      }

      .form-container {
        flex: 1;
        display: flex;
        justify-content: center;

        @media only screen and (max-width: 700px) {
        width: 100%;
      }
      }

      .tarihSecim-container {
        height: 40%;
        background: var(--theme-secondary);
        border: var(--theme-border);
        box-shadow: var(--theme-box-shadow);
        padding: 1rem;
        margin-top: 1rem;
        border-radius: 20px;
        overflow: hidden;
        display: flex;
        justify-content: space-around;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;

        @media only screen and (max-width: 1000px) {
          height: 38%;
        }

        @media only screen and (max-width: 700px) {
          flex-wrap: wrap;
          flex-basis: 25%;
        }

        .active {
          background-color: var(--theme-fourth);
          color: var(--theme-primary);
          font-size: 1.1rem;
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
        gap: 0.5rem;
      }
    }
  }
`;

export default ButceKayit;
