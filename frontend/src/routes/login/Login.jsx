import "./Login.css";
import { useEffect, useState } from "react";
import * as auth from "../../stores/auth";
import { useNavigate } from "react-router";
import Input from "../../components/input/Input";
import axios from "axios";

function login(username, password) {
  return axios.post("http://localhost:8081/login", {
    username,
    password,
  });
}

function register(username, password) {
  return axios.post("http://localhost:8081/register", {
    username,
    password,
  });
}

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("Авторизуйтесь, чтобы продолжить:");
  const [messageColor, setMessageColor] = useState("#000000");
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthorized()) {
      navigate("/");
    }
  }, []);

  const handleLogin = async (e) => {
    if (login === "") {
      return;
    }

    try {
      const response = await login(username, password);
      if (response.status == 200) {
        setMessage("Добро пожаловать!");
        auth.authorize(username);
        navigate("/");
        window.location.reload();
      } else {
        setMessage(response.data.message || "Ошибка аутентификации");
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            setMessage("Некорректный запрос");
            break;
          case 401:
            setMessage("Неверный логин или пароль");
            break;
          case 404:
            setMessage("Пользователь с таким логином не зарегестрирован");
            break;
          case 405:
            setMessage("Метод не поддерживается");
            break;
          case 500:
            setMessage("Ошибка сервера. Попробуйте позже");
            break;
          default:
            setMessage(`Ошибка ${error.response.status}`);
        }
      } else {
        setMessage("Сетевая ошибка или сервер недоступен");
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setMessage("Введите логин и пароль");
      return;
    }

    try {
      const response = await register(username, password);
      if (response.status === 201) {
        setMessage("Регистрация успешна! Теперь войдите");
        auth.authorize(username);
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      let errorMessage = "Ошибка соединения с сервером";

      if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage = error.response.data.message || "Некорректные данные";
            break;
          case 409:
            errorMessage = "Пользователь уже существует";
            break;
          case 500:
            errorMessage = "Ошибка сервера. Попробуйте позже";
            break;
          default:
            errorMessage = `Ошибка ${error.response.status}`;
        }
      }
      setMessage(errorMessage);
    }
  };

  return (
    <>
      <div className="hbox">
        <div className="box">
          <h1 id="login-title">Bookswap</h1>
          <span>Обмен текстами — фундамент цивилизации</span>
          <div className="login-input-form">
            <label
              id="auth-message"
              htmlFor="login-page-input"
              style={{ color: messageColor }}
            >
              {message}
            </label>
            <Input
              id="login-page-input"
              type="text"
              placeholder="Лонгин"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              id="login-page-input"
              type="text"
              placeholder="Пароль"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="auth-buttons">
            <button id="login-button" onClick={handleLogin}>
              Войти
            </button>
            <button id="register-button" onClick={handleRegister}>
              Зарегистрироваться
            </button>
          </div>
          <span className="copyright-block">
            &copy; Bookswap. Все права защищены.
          </span>
        </div>
      </div>
    </>
  );
}

export default Login;
