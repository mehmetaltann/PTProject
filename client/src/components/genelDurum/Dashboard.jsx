import { useEffect } from "react";
import { tl } from "../../utils/abicons";
import { useGlobalContext } from "../../context/globalContext";
import { tarihSecimCat } from "../../utils/formCategoryData";
import {
  giderCategories,
  gelirCategories,
  totalCat,
} from "../../utils/formCategoryData";
import styled from "styled-components";
import Chart from "./Chart";

const Dashboard = () => {
  const {
    toplamGelir,
    toplamGider,
    gelirler,
    giderler,
    totalBalance,
    gelirGetir,
    giderGetir,
  } = useGlobalContext();

  useEffect(() => {
    gelirGetir();
    giderGetir();
  }, []);

  const giderCategoriesList = giderCategories.flatMap((cat) => cat.alt);

  return (
    <DashboardStyled>
      <div className="container">
        <div className="left-container">
          <div className="tarihSecim-container">
            {tarihSecimCat.map((cat, index) => (
              <button className="tarihsecim" key={index}>
                {cat}
              </button>
            ))}
          </div>
          <div className="chart-container">
            <Chart />
          </div>
          <div className="totals-container">
            {totalCat.map((cat, index) => (
              <div className="total" key={index}>
                <h4>{cat}</h4>
              </div>
            ))}
          </div>
        </div>
        <div className="right-container">
          <div className="gelir-container">
            <h3>Gelirler</h3>
            {gelirCategories.map((cat, index) => (
              <div className="gelir" key={index}>
                {cat}
              </div>
            ))}
          </div>

          <div className="gider-container">
            <h3>Gelirler</h3>
            <div className="gider-con">
              {giderCategoriesList.flatMap((cat, index) => (
                <div className="gider" key={index}>
                  {cat}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardStyled>
  );
};

const DashboardStyled = styled.div`
  height: 900px;
  width: 100%;
  display: flex;
  flex-direction: column;

  .container {
    height: 100%;
    width: 100%;
    display: flex;
    gap: 0.8rem;
    padding-top: 0.8rem;

    @media only screen and (max-width: 1250px) {
      flex-wrap: wrap;
      overflow: auto;
    }

    .left-container {
      height: 90%;
      width: 50%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      gap: 0.5rem;

      @media only screen and (max-width: 750px) {
        width: 100%;
      }

      .tarihSecim-container {
        height: 12%;
        width: 100%;
        background: var(--theme-secondary);
        border: var(--theme-border);
        box-shadow: var(--theme-box-shadow);
        padding: 1rem;
        border-radius: 20px;
        overflow: hidden;
        display: flex;
        justify-content: space-around;
        gap: 1rem;

        @media only screen and (max-width: 1250px) {
          height: 24%;
          flex-wrap: wrap;
          overflow: auto;
        }

        .tarihsecim {
          background: var(--theme-secondary);
          border: var(--theme-border);
          box-shadow: var(--theme-box-shadow);
          padding: 1rem;
          border-radius: 20px;
          color: var(--theme-fourth);
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          opacity: 0.7;
          display: flex;
          justify-content: center;
          align-items: center;

          &:hover {
            background-color: var(--theme-fourth);
            color: var(--theme-primary);
          }
        }
      }

      .chart-container {
        flex: 1;
        background: var(--theme-secondary);
        border: var(--theme-border);
        box-shadow: var(--theme-box-shadow);
        padding: 1rem;
        border-radius: 20px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .totals-container {
        height: 30%;
        background: var(--theme-secondary);
        border: var(--theme-border);
        box-shadow: var(--theme-box-shadow);
        padding: 1rem;
        border-radius: 20px;
        overflow: hidden;
        display: flex;
        gap: 1rem;

        .total {
          background: var(--theme-secondary);
          border: var(--theme-border);
          box-shadow: var(--theme-box-shadow);
          padding: 1rem;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;

          h4 {
            text-align: center;
          }
        }
      }
    }

    .right-container {
      height: 90%;
      flex: 1;
      display: flex;
      gap: 0.6rem;
      font-size: 1rem;

      @media only screen and (max-width: 500px) {
        flex-wrap: wrap;
      }

      .gelir-container {
        width: 35%;
        background: var(--theme-secondary);
        border: var(--theme-border);
        box-shadow: var(--theme-box-shadow);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        @media only screen and (max-width: 500px) {
          width: 100%;
        }

        .gelir {
          background: var(--theme-secondary);
          border: var(--theme-border);
          box-shadow: var(--theme-box-shadow);
          padding: 1rem;
          border-radius: 20px;
        }
      }

      .gider-container {
        flex: 1;
        background: var(--theme-secondary);
        border: var(--theme-border);
        box-shadow: var(--theme-box-shadow);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        overflow: auto;
        flex-direction: column;

        h3 {
          margin-bottom: 1rem;
        }

        .gider-con {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 0.6rem;

          .gider {
            width: 32%;
            background: var(--theme-secondary);
            border: var(--theme-border);
            box-shadow: var(--theme-box-shadow);
            padding: 1rem;
            border-radius: 20px;
          }
        }
      }
    }
  }
`;

export default Dashboard;
