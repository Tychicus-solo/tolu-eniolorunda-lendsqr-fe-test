import { NavLink } from "react-router-dom";
import { sidebarLinks } from "../../constants/sidebar";
import { ChevronOutline } from "../../assets/icons";
import "./Sidebar.scss";

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="sidebar__section">
        <div className="sidebar__item sidebar__item--switch">
          <img src={sidebarLinks[0]?.icon} alt="" className="sidebar__icon" />
          <span className="sidebar__text">{sidebarLinks[0]?.title}</span>
          <img src={ChevronOutline} alt="" className="sidebar__chevron" />
        </div>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `sidebar__item ${isActive ? "sidebar__item--active" : ""}`
          }
        >
          <img src={sidebarLinks[1].icon} alt="" className="sidebar__icon" />
          <span className="sidebar__text">Dashboard</span>
        </NavLink>
      </div>

      <div className="sidebar__menu">
        {sidebarLinks.slice(2).map((link, index) =>
          link.header ? (
            <h3 key={`header-${index}`} className="sidebar__header">
              {link.title}
            </h3>
          ) : (
            <NavLink
              key={link.title}
              to={link.path || "#"}
              className={({ isActive }) =>
                `sidebar__item ${isActive ? "sidebar__item--active" : ""}`
              }
            >
              <img src={link.icon} alt="" className="sidebar__icon" />
              <span className="sidebar__text">{link?.title}</span>
            </NavLink>
          )
        )}
      </div>
    </nav>
  );
};

export default Sidebar;
