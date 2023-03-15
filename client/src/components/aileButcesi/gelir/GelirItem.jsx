import React from "react";
import styled from "styled-components";
import { gelirCategoriesIcons } from "../../../utils/formCategoryData";
import { tl, calender, comment, trash } from "../../../utils/abicons";
import Button from "../../UI/Button";

const GelirItem = ({
  id,
  title,
  amount,
  date,
  category,
  description,
  deleteItem,
  type,
  indicatorColor,
}) => {
  return (
    <GelirItemStyle indicatorColor={indicatorColor}>
      <div className="icon">{gelirCategoriesIcons[category]}</div>
      <div className="content">
        <h5>{title}</h5>
        <div className="inner-content">
          <div className="text">
            <p>
              {tl}
              {amount}
            </p>
            <p>
              {calender}
              {date}
            </p>
            <p>
              {comment}
              {description}
            </p>
          </div>
          <div className="bottom-container">
            <Button
              background={"var(--theme-fourth)"}
              color={"var(--theme-primary)"}
              icon={trash}
              bpadding={"1rem"}
              bradious={"50%"}
              onClick={() => deleteItem(id)}
            />
          </div>
        </div>
      </div>
    </GelirItemStyle>
  );
};

const GelirItemStyle = styled.div`
  background-color: var(--theme-primary);
  border: var(--theme-border);
  box-shadow: var(--theme-box-shadow);
  border-radius: 20px;
  padding: 1rem;
  margin-bottom: 1rem;

  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  color: var(--theme-fourth);
  .icon {
    width: 5rem;
    height: 5rem;
    border-radius: 20px;
    background-color: var(--theme-primary);

    display: flex;
    align-items: center;
    justify-content: center;
    border: var(--theme-border);

    i {
      font-size: 2.6rem;
    }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    h5 {
      font-size: 1.3rem;
      padding-left: 2rem;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        left: 1%;
        top: 30%;
        transform: translate(-50%);
        border-radius: 50%;
        width: 0.8rem;
        height: 0.8rem;
        background: ${(props) => props.indicatorColor};
      }
    }

    .inner-content {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .text {
        display: flex;
        gap: 1.5rem;
        align-items: center;

        p {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          opacity: 0.8;
          color: var(--theme-fourth);
          font-size: 1rem;
        }
      }
    }
  }
`;

export default GelirItem;
