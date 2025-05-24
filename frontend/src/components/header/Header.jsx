import "./Header.css";
import { Link } from "react-router";

function Header() {
  return (
    <nav className="header">
      <div className="main-side">
        <Link to="/home">
          <button className="tab">Книги</button>
        </Link>
        <Link to="/my-books">
          <button className="tab">Мои книги</button>
        </Link>
      </div>
      <div className="profile-side">
        <Link to="/profile">
          <button className="tab profile-button">Профиль</button>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
