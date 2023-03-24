import styled from "styled-components";
import Button from "../UI/Button";
import { dateFormat } from "../../utils/help-functions";
import { butceCategoryData } from "../../utils/localData";
import { tl, calender, trash, comment } from "../../utils/icons";
import { useGlobalContext } from "../../context/globalContext";

const DataTableItem = ({
  id,
  title,
  amount,
  date,
  categoryA,
  categoryB,
  description,
  activeType,
}) => {
  const { butceKalemiSil } = useGlobalContext();

  return (
    <DataTableItemStyled
      indicatorColor={activeType === "gelir" ? "green" : "red"}
    >
      <div className="icon">
        {activeType === "gelir"
          ? butceCategoryData.find((cat) => cat.categoryA === categoryA).icon
          : butceCategoryData.find((cat) => cat.categoryB === categoryB).icon}
      </div>
      <h5 className="title">{title}</h5>
      <div className="text">
        <p>
          {calender}
          <span>{dateFormat(date)}</span>
        </p>
        <p>
          {tl}
          <span>{amount}</span>
        </p>
        <p>
          {comment}
          <span>{activeType === "gelir" ? categoryA : categoryB}</span>
        </p>
      </div>
      <div className="bottom">
        <Button
          background={"var(--theme-fourth)"}
          color={"var(--theme-primary)"}
          icon={trash}
          bpadding={"1rem"}
          bradious={"50%"}
          onClick={() => butceKalemiSil(id)}
        />
      </div>
    </DataTableItemStyled>
  );
};

const DataTableItemStyled = styled.div`
  background-color: var(--theme-primary);
  border: var(--theme-border);
  box-shadow: var(--theme-box-shadow);
  border-radius: 20px;
  padding: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--theme-fourth);

  .icon {
    flex-basis: 8%;
    width: 4rem;
    height: 4rem;
    border-radius: 20px;
    background-color: var(--theme-primary);
    border: var(--theme-border);
    display: flex;
    align-items: center;
    justify-content: center;

    @media only screen and (max-width: 1000px) {
      width: 3rem;
      height: 3rem;
    }

    @media only screen and (max-width: 500px) {
      width: 2rem;
      height: 2rem;
    }

    i {
      font-size: 1.8rem;

      @media only screen and (max-width: 1000px) {
        font-size: 1.5rem;
      }

      @media only screen and (max-width: 500px) {
        flex-basis: 6%;
        font-size: 1.2rem;
      }
    }
  }

  .title {
    flex-basis: 20%;
    font-size: 1.2rem;
    padding-left: 1.8rem;

    position: relative;

    @media only screen and (max-width: 1400px) {
      flex-basis: 25%;
    }

    @media only screen and (max-width: 1200px) {
      flex-basis: 30%;
      font-size: 1.1rem;
    }

    @media only screen and (max-width: 1000px) {
      flex-basis: 35%;
    }

    @media only screen and (max-width: 800px) {
      flex-basis: 45%;
    }

    @media only screen and (max-width: 700px) {
      flex-basis: 35%;
    }

    @media only screen and (max-width: 500px) {
      flex-basis: 45%;
      font-size: 1rem;
    }

    @media only screen and (max-width: 400px) {
      font-size: 0.9rem;
    }

    &::before {
      content: "";
      position: absolute;
      left: 7%;
      top: 30%;
      transform: translate(-60%);
      border-radius: 50%;
      width: 0.7rem;
      height: 0.7rem;
      background: ${(props) => props.indicatorColor};

      @media only screen and (max-width: 500px) {
        left: 9%;
        width: 0.5rem;
        height: 0.5rem;
      }

      @media only screen and (max-width: 500px) {
        left: 15%;
      }
    }
  }

  .text {
    flex: 1;
    font-size: 1.2rem;
    display: flex;
    gap: 1.5rem;
    opacity: 0.8;

    @media only screen and (max-width: 1100px) {
      font-size: 1.1rem;
    }

    @media only screen and (max-width: 1000px) {
      flex-direction: column;
      gap: 0;
    }

    @media only screen and (max-width: 500px) {
      font-size: 0.9rem;
    }

    @media only screen and (max-width: 400px) {
      font-size: 0.7rem;
    }

    span {
      padding-left: 0.4rem;
    }
  }

  .bottom {
    flex-basis: 8%;

    button {
      @media only screen and (max-width: 500px) {
        padding: 0.6rem;
      }

      @media only screen and (max-width: 400px) {
        padding: 0.4rem;
      }
    }
  }
`;

export default DataTableItem;
