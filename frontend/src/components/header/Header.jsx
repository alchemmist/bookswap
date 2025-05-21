import "./Header.css";
import { Link } from "react-router";

function Header() {
  return (
    <nav className="header">
      <div className="main-side">
        <Link to="/main">
          <button className="tab">Главная</button>
        </Link>
        <Link to="/favorites">
          <button className="tab">Избранное</button>
        </Link>
      </div>
      <div className="profile-side">
        <Link to="/profile">
          <button className="tab profile-button">
            Профиль
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
