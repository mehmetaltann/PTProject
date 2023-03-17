import styled from "styled-components";
import { menuItems } from "../utils/abmenuitems";

const ContentTitle = ({ active, setActive, title }) => {
  return (
    <ContentTitleStyled>
      <div className="right-side">
        {menuItems.map(({ id, icon, title }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={active === id ? "btn active" : "btn"}
          >
            {icon}
            <span>{title}</span>
          </button>
        ))}
      </div>
      <div className="left-side">
        <h2>{title}</h2>
      </div>
    </ContentTitleStyled>
  );
};

const ContentTitleStyled = styled.div`
  display: flex;
  gap: 1.5rem;

  .right-side {
    width: 22%;
    background-color: var(--theme-secondary);
    border: var(--theme-border);
    box-shadow: var(--theme-box-shadow);
    border-radius: 20px;
    padding: 0.8rem;
    display: flex;
    justify-content: space-around;

    @media only screen and (max-width: 1250px) {
      flex-wrap: wrap;
      width: 30%;
    }

    @media only screen and (max-width: 750px) {
      width: 40%;
    }

    @media only screen and (max-width: 500px) {
      flex-wrap: wrap;
      width: 100%;
    }

    .btn {
      background: var(--theme-secondary);
      border: 2px solid var(--theme-fourth);
      box-shadow: var(--theme-box-shadow);
      padding: 1rem;
      border-radius: 40px;
      color: var(--theme-fourth);
      font-size: 1.3rem;
      font-weight: 500;
      opacity: 0.8;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        background-color: var(--theme-fourth);
        color: var(--theme-primary);
      }

      i {
        padding-right: 0.5rem;
      }
    }

    .active {
      background-color: var(--theme-fourth);
      color: var(--theme-primary);
    }
  }

  .left-side {
    flex: 1;
    background-color: var(--theme-secondary);
    border: var(--theme-border);
    box-shadow: var(--theme-box-shadow);
    border-radius: 20px;
    padding: 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default ContentTitle;
