import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const data = [
  { title: "Anasayfa", link: "" },
  { title: "Yatırım İşlemleri", link: "yatirim-islemleri" },
  { title: "Yatırım Geçmişi", link: "yatirim-gecmisi" },
  { title: "Bütçe İşlemleri", link: "butce-kayit" },
];

const NavBar = React.memo(() => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <Fragment>
      <NavbarStyled>
        <div className="container">
          <Link to="/" className="logo">
            Mehmet Altan
          </Link>

          <ul className={click ? "menu menu--active" : "menu"}>
            {data.map(({ link, title }, index) => (
              <li className="items" key={index}>
                <Link to={`/${link}`} className="links" onClick={handleClick}>
                  {title}
                </Link>
              </li>
            ))}
            <li className="items">
              <Link to={`/`} className="links logout" onClick={handleLogOut}>
                Çıkış Yap
              </Link>
            </li>
          </ul>
          <div className="icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </NavbarStyled>
    </Fragment>
  );
});

export const NavbarStyled = styled.nav`
  background-color: var(--theme-fourth);
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  top: 0;
  z-index: 20;
  position: relative;

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    max-width: 1500px;
  }

  .logo {
    color: var(--theme-primary);
    align-items: center;
    margin-left: 20px;
    cursor: pointer;
    text-decoration: none;
    font-size: 2rem;
    flex-grow: 1;
  }

  .menu {
    display: flex;
    list-style: none;
    text-align: center;

    @media screen and (max-width: 960px) {
      flex-direction: column;
      width: 100%;
      border-top: 1px solid var(--theme-primary);
      position: absolute;
      top: 5rem;
      left: -110%;
      opacity: 0;
      transition: all 0.5s ease;
    }
  }

  .menu--active {
    @media screen and (max-width: 960px) {
      background-color: var(--theme-fourth);
      left: 0px;
      opacity: 1;
      transition: all 0.5s ease;
      z-index: 1;
    }
  }

  .links {
    color: var(--theme-primary);
    text-decoration: none;
    padding: 0.5rem 1rem;
    height: 100%;
    border-bottom: 3px solid transparent;

    @media screen and (max-width: 960px) {
      width: 100%;
      display: table;
    }
  }

  .logout {
    margin-right: 0;
    padding-right: 0;
  }

  .items {
    line-height: 2.5rem;
    margin-right: 1rem;
  }

  .items::after {
    content: "";
    display: block;
    height: 3px;
    width: 0;
    background: transparent;
    transition: width 0.7s ease, background-color 0.5s ease;
  }

  .items:hover::after {
    width: 100%;
    background-color: var(--theme-third);
  }

  .icon {
    display: none;

    @media screen and (max-width: 960px) {
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(-100%, 60%);
      font-size: 1.8rem;
      cursor: pointer;
      color: var(--theme-primary);
    }
  }
`;

export default NavBar;
