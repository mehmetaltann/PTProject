import { menuItems } from "../../utils/abmenuitems";
import { signout } from "../../utils/abicons";
import starwarsavatar from "../../assets/img/starwarsavatar.png";

const AbSideBar = ({ active, setActive }) => {
  return (
    <div className="abSidebar">
      <div className="abSidebar__user-con">
        <img src={starwarsavatar} alt="avatar" className="abSidebar__avatar" />
        <div className="abSidebar__text">
          <h2>Altan</h2>
          <p>Para Miktarı</p>
        </div>
      </div>
      <ul className="abSidebar__menu-items">
        {menuItems.map(({ id, icon, title }) => (
          <li
            key={id}
            onClick={() => setActive(id)}
            className={
              active === id
                ? "abSidebar__menu-links abSidebar__menu-links--active"
                : "abSidebar__menu-links"
            }
          >
            {icon}
            <span>{title}</span>
          </li>
        ))}
      </ul>
      <div className="abSidebar__bottom">
        <li className="abSidebar__menu-links">{signout}Çıkış Yap</li>
      </div>
    </div>
  );
};

export default AbSideBar;
