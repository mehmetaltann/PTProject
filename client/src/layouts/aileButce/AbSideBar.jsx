import { menuItems } from "../../utils/abmenuitems";
import { signout } from "../../utils/abicons";
import styled from "styled-components";
import starwarsavatar from "../../assets/img/starwarsavatar.png";

const AbSideBar = ({ active, setActive }) => {
  return (
    <AbSidebarStyle>
      <div className="top">
        <div className="user-con">
          <img src={starwarsavatar} alt="avatar" className="avatar" />
          <div>
            <h2>Altan</h2>
            <p>Para Miktarı</p>
          </div>
        </div>
        <div className="menu-items">
          <ul>
            {menuItems.map(({ id, icon, title }) => (
              <li
                key={id}
                onClick={() => setActive(id)}
                className={active === id ? "menu-links active" : "menu-links"}
              >
                {icon}
                <span>{title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <li className="menu-links">{signout}Çıkış Yap</li>
      </div>
    </AbSidebarStyle>
  );
};

const AbSidebarStyle = styled.div`
  padding: 2rem 1.5rem;
  width: 24rem;
  height: 90%;
  background-color: var(--theme-secondary);
  border: 3px solid var(--theme-white);
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;

  .top {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .user-con {
    height: 6rem;
    display: flex;
    align-items: center;
    gap: 1rem;

    p {
      color: var(--theme-third);
      opacity: 0.8;
    }
  }

  .avatar {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    object-fit: cover;
    padding: 0.2rem;
    background-color: var(--theme-secondary);
    border: var(--theme-border);
    box-shadow: var(--theme-box-shadow);
  }

  ._menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .menu-links {
    display: grid;
    grid-template-columns: 2.5rem auto;
    grid-template-rows: 2.5rem auto;
    align-items: center;
    margin: 0.6rem 0;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.4s ease-in-out;
    padding-left: 1rem;
    position: relative;
    color: var(--theme-fourth);
    opacity: 0.9;
    i {
      color: var(--theme-fourth);
      font-size: 1.4rem;
      transition: all 0.2s ease-in-out;
    }
  }

  .active {
    font-weight: 900;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background-color: var(--theme-fourth);
      border-radius: 10px 10px 10px 10px;
    }
  }
`;

export default AbSideBar;
