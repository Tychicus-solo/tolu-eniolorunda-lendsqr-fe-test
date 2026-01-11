import { useState, useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce"; 
import "./Navbar.scss";
import { Notifications, ChevronDown, Logo } from "../../assets/icons";
import Avatar from "../../assets/Avatar.png";
import Search from "../../assets/icons/search.svg";

interface NavbarProps {
  onMenuClick: () => void;
  onSearch: (searchTerm: string) => void; 
}

const Navbar = ({ onMenuClick, onSearch }: NavbarProps) => {
  const [inputValue, setInputValue] = useState("");
  const debouncedSearchTerm = useDebounce(inputValue, 500);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  return (
    <nav className="navbar">
      <div className="navbar__hamburger" onClick={onMenuClick}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <div className="navbar__logo">
        <img src={Logo} alt="lendsqr-logo" />
      </div>

      <div className="navbar__search">
        <div className="navbar__search-group">
          <input
            type="text"
            placeholder="Search for anything"
            className="navbar__search-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="navbar__search-button">
            <img src={Search} alt="search" />
          </button>
        </div>
      </div>

      <div className="navbar__profile">
        <a href="#docs" className="navbar__docs">
          Docs
        </a>
        <img
          src={Notifications}
          alt="notifications"
          className="navbar__notif"
        />
        <div className="navbar__user">
          <img src={Avatar} alt="user" className="navbar__avatar" />
          <span className="navbar__username">Adedeji</span>
          <img src={ChevronDown} alt="dropdown" className="navbar__chevron" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
