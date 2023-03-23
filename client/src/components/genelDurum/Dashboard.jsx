import { useEffect } from "react";
import { useGlobalContext } from "../../context/globalContext";
import styled from "styled-components";
import TarihSecim from "./TarihSecim";
import Chart from "./Chart";
import TotalInf from "./TotalInf";
import GelirTable from "./GelirTable";
import GiderTable from "./GiderTable";

const Dashboard = () => {
  const {
    butceKalemiGetir,
    toplamButceData,
    ortalamaButceData,
    activeTarih,
    setActiveTarih,
    toplamCategorikButceData,
  } = useGlobalContext();

  useEffect(() => {
    butceKalemiGetir();
  }, [activeTarih]);

  return (
    <GenelDurumStyled>
      <div className="container">
        <div className="left-container">
          <TarihSecim
            activeTarih={activeTarih}
            setActiveTarih={setActiveTarih}
          />
          <Chart />
          <TotalInf
            ortalamaButceData={ortalamaButceData}
            toplamButceData={toplamButceData}
          />
        </div>
        <div className="right-container">
          <GelirTable toplamCategorikButceData={toplamCategorikButceData} />
          <GiderTable toplamCategorikButceData={toplamCategorikButceData} />
        </div>
      </div>
    </GenelDurumStyled>
  );
};

const GenelDurumStyled = styled.div`
  height: 900px;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .container {
    height: 100%;
    width: 100%;
    display: flex;
    gap: 0.8rem;
    padding-top: 0.8rem;
    overflow: auto;

    @media only screen and (max-width: 600px) {
      flex-wrap: wrap;
    }

    .left-container {
      height: 90%;
      width: 50%;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      @media only screen and (max-width: 600px) {
        width: 100%;
      }
    }

    .right-container {
      height: 90%;
      flex: 1;
      display: flex;
      gap: 0.6rem;
      font-size: 1rem;
      overflow: hidden;

      @media only screen and (max-width: 600px) {
        flex-wrap: wrap;
        overflow: auto;
      }
    }
  }
`;

export default Dashboard;
