import React from "react";
import styled from "styled-components";
import Button from "../UI/Button";
import { butceCategoryData } from "../../utils/localData";
import { tl, calender, trash, comment } from "../../utils/icons";
import { dateFormat } from "../../utils/help-functions";

const GiderItem = ({
  id,
  title,
  amount,
  date,
  categoryB,
  deleteItem,
  indicatorColor,
}) => {
  return (
    <GiderItemStyle indicatorColor={indicatorColor}>
      <div className="icon">
        {butceCategoryData.find((cat) => cat.categoryB === categoryB).icon}
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
          <span>{categoryB}</span>
        </p>
      </div>
      <div className="bottom">
        <Button
          background={"var(--theme-fourth)"}
          color={"var(--theme-primary)"}
          icon={trash}
          bpadding={"1rem"}
          bradious={"50%"}
          onClick={() => deleteItem(id)}
        />
      </div>
    </GiderItemStyle>
  );
};

const GiderItemStyle = styled.div`
  background-color: var(--theme-primary);
  border: var(--theme-border);
  box-shadow: var(--theme-box-shadow);
  border-radius: 20px;
  padding: 0.8rem;
  margin-bottom: 0.8rem;

  display: flex;
  align-items: center;
  gap: 1.2rem;
  width: 98%;
  color: var(--theme-fourth);

  .icon {
    flex-basis: 12%;
    width: 3rem;
    height: 3rem;
    border-radius: 20px;
    background-color: var(--theme-primary);
    border: var(--theme-border);
    margin-left: 0.4rem;
    display: flex;
    align-items: center;
    justify-content: center;

    i {
      font-size: 1.8rem;
    }
  }

  .title {
    flex-basis: 25%;
    font-size: 1.2rem;
    padding-left: 1.4rem;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      left: 4%;
      top: 30%;
      transform: translate(-50%);
      border-radius: 50%;
      width: 0.7rem;
      height: 0.8rem;
      background: ${(props) => props.indicatorColor};
    }
  }

  .text {
    font-size: 1.2rem;
    flex-basis: 65%;
    display: flex;
    gap: 3rem;
    justify-content: flex-start;
    opacity: 0.8;

    span {
      padding-left: 0.4rem;
    }
  }
`;

export default GiderItem;
