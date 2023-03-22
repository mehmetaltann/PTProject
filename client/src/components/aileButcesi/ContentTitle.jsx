import styled from "styled-components";
import { menuItems } from "../../utils/localData";

const ContentTitle = ({ active, setActive, title }) => {
  return (
    <ContentTitleStyled>
      <div className="left-side">
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
      <div className="right-side">
        <h2>{title}</h2>
      </div>
    </ContentTitleStyled>
  );
};

const ContentTitleStyled = styled.div`
  display: flex;
  gap: 1.5rem;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    gap: 0.5rem;
  }

  .left-side {
    width: 22%;
    background-color: var(--theme-secondary);
    border: var(--theme-border);
    box-shadow: var(--theme-box-shadow);
    border-radius: 20px;
    padding: 0.8rem;
    display: flex;
    justify-content: center;
    gap: 1rem;

    @media only screen and (max-width: 850px) {
      width: 40%;
    }

    @media only screen and (max-width: 600px) {
      flex-wrap: wrap;
      width: 100%;
    }

    .btn {
      background: var(--theme-secondary);
      border: 2px solid var(--theme-fourth);
      box-shadow: var(--theme-box-shadow);
      padding: 3% 12%;
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

  .right-side {
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
