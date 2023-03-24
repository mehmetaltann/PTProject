import styled from "styled-components";
import { menuItems } from "../../utils/localData";
import { useGlobalContext } from "../../context/globalContext";

const ContentTitle = () => {
  const { activeType, setActiveType, capitalizedTitle } = useGlobalContext();
  return (
    <ContentTitleStyled>
      <div className="left-side">
        {menuItems.map(({ id, icon, title }) => (
          <button
            key={id}
            onClick={() => setActiveType(title)}
            className={activeType === title ? "btn active" : "btn"}
          >
            {icon}
            <span>{title.charAt(0).toUpperCase() + title.slice(1)}</span>
          </button>
        ))}
      </div>
      <div className="right-side">
        <h2>{capitalizedTitle}</h2>
      </div>
    </ContentTitleStyled>
  );
};

const ContentTitleStyled = styled.div`
  display: flex;
  gap: 1.5rem;

  @media only screen and (max-width: 700px) {
    margin-top:.5rem;
    flex-direction: column;
    gap: .5rem;

  }

  .left-side {
    width: 22%;
    height: 100%;
    background-color: var(--theme-secondary);
    border: var(--theme-border);
    box-shadow: var(--theme-box-shadow);
    border-radius: 20px;
    padding: 0.8rem;
    display: flex;
    justify-content: center;
    gap: 1.5rem;

    @media only screen and (max-width: 1400px) {
      width: 30%;
    }

    @media only screen and (max-width: 1400px) {
      width: 40%;
    }

    @media only screen and (max-width: 700px) {
      width: 100%;
      padding: 0.5rem;
    }

    .btn {
      background: var(--theme-secondary);
      border: 2px solid var(--theme-fourth);
      box-shadow: var(--theme-box-shadow);
      padding: 3% 10%;
      border-radius: 20px;
      color: var(--theme-fourth);
      font-size: 1.3rem;
      font-weight: 500;
      opacity: 0.8;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0.8;

      @media only screen and (max-width: 700px) {
        width: 100%;
        padding: 0.8rem;
      }

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

    @media only screen and (max-width: 700px) {
        width: 100%;
        padding: 0.5rem;
      }

    h2 {
      opacity: 0.8;
    }
  }
`;

export default ContentTitle;
