import "./Login.css";
import { useEffect, useState } from "react";
import * as auth from "../../stores/auth";
import { useNavigate } from "react-router";
import Input from "../../components/input/Input";

function Login() {
  const [login, setLogin] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthorized()) {
      navigate("/main");
    }
  }, []);

  const handleLogin = () => {
    if (login === "") {
      return;
    }
    auth.authorize(login);
    navigate("/main");
    window.location.reload();
  };

  return (
    <>
      <div className="hbox">
        <div className="box">
          <h1>Добро пожаловать на наш сайт с котиками!</h1>
          <span>Только смотреть, они такие красивые и милые!</span>
          <div className="login-input-form">
            <label htmlFor="login-page-input">
              Введите ваш логин, чтобы продолжить:
            </label>
            <Input
              id="login-page-input"
              type="text"
              placeholder="Ваш логин"
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>
          <button id="login-button" onClick={handleLogin}>
            Продолжить
          </button>
          <span className="copyright-block">
            &copy; 2023 Сайт с котиками. Все права защищены.
          </span>
        </div>
      </div>
    </>
  );
}

export default Login;
