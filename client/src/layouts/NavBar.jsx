import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const data = [
  { title: "Anasayfa", link: "" },
  { title: "Yatırım", link: "yatirim" },
  { title: "Bireysel Emeklilik", link: "bireysel_emeklilik" },
  { title: "Aile Bütçesi", link: "butce" },
  { title: "İstatistik", link: "istatistik" },
];

const NavBar = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <Fragment>
      <nav className="navbar">
        <div className="navbar__container">
          <Link to="/" className="navbar__logo">
            Mehmet Altan
          </Link>

          <ul className={click ? "navbar__menu navbar__menu--active" : "navbar__menu"}>
            {data.map(({ link, title }, index) => (
              <li className="navbar__items" key={index}>
                <Link to={`/${link}`} className="navbar__links" onClick={handleClick}>
                  {title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="navbar__icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default NavBar;
