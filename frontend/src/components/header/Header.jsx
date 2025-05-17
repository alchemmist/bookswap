import "./Header.css";
import { Link } from "react-router";
import * as auth from "../../stores/auth";

function Header() {
  return (
    <nav className={!auth.isAuthorized() ? "disabled-link" : ""}>
      <div className="main-side">
        <Link to="/main">Главная</Link>
        <Link to="/favorites">Избранное</Link>
      </div>
      <div className="profile-side">
        <Link to="/profile">
          <img
            alt="Аватарка"
            src={localStorage.getItem("userAvatar") || "/src/assets/user.png"}
          />
          {auth.isAuthorized() && auth.getAuthLogin()}
        </Link>
      </div>
    </nav>
  );
}

export default Header;
