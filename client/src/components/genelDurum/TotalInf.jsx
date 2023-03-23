import styled from "styled-components";

const TotalInf = ({ ortalamaButceData, toplamButceData }) => {

  const balance =
    toplamButceData("gelir") - toplamButceData("gider");

  const totalCat = [
    {
      id: 1,
      title: "Toplam Gelir",
      value: toplamButceData("gelir"),
      stil: "gelir",
    },
    {
      id: 2,
      title: "Toplam Gider",
      value: toplamButceData("gider"),
      stil: "gider",
    },
    {
      id: 3,
      title: "Ortalama Aylık Gelir",
      value: ortalamaButceData("gelir"),
      stil: "gelir",
    },
    {
      id: 4,
      title: "Ortalama Aylık Gider",
      value: ortalamaButceData("gider"),
      stil: "gider",
    },
    { id: 5, title: "Gelir-Gider Farkı", value: balance, stil: "" },
  ];

  return (
    <TotalInfStyled>
      {totalCat.map(({ id, title, value, stil }) => (
        <div className="total" key={id}>
          <h4>{title}</h4>
          <h4 className={value < 0 ? `${stil} eksi` : `${stil} arti`}>
            {value} TL
          </h4>
        </div>
      ))}
    </TotalInfStyled>
  );
};

const TotalInfStyled = styled.div`
  height: 20%;
  background: var(--theme-secondary);
  border: var(--theme-border);
  box-shadow: var(--theme-box-shadow);
  padding: 1rem;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media only screen and (max-width: 1200px) {
    height: 25%;
  }

  @media only screen and (max-width: 850px) {
    height: 35%;
  }

  .total {
    width: 18%;
    background: var(--theme-secondary);
    border: var(--theme-border);
    box-shadow: var(--theme-box-shadow);
    padding: 1rem;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    @media only screen and (max-width: 1460px) {
      width: 31%;
    }

    @media only screen and (max-width: 800px) {
      width: 46%;
    }

    h4 {
      text-align: center;
      font-size: 1rem;
      opacity: 0.6;
    }

    .eksi {
      color: var(--theme-red);
    }

    .arti {
      color: var(--theme-green);
    }

    .gelir {
      color: var(--theme-green);
    }

    .gider {
      color: var(--theme-red);
    }
  }
`;

export default TotalInf;
