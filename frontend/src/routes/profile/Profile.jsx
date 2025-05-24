import React, { useState, useEffect } from "react";
import * as auth from "../../stores/auth";
import Input from "../../components/input/Input";
import { useNavigate } from "react-router";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const [login, setLogin] = useState(
    auth.isAuthorized() ? auth.getAuthLogin() : ""
  );

  const uploadPhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const preview = reader.result;
        localStorage.setItem("userAvatar", preview);

        document.getElementById("profile-photo").src = preview;
      };

      reader.readAsDataURL(file);
      window.location.reload();
    }
  };

  const handleLogin = () => {
    if (login === "") {
      return;
    }
    auth.changeAuthLogin(login);
    navigate("/profile");
    window.location.reload();
  };

  const handleLogout = () => {
    setLogin("");
    auth.logout();
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    const savedAvatar = localStorage.getItem("userAvatar");
    if (savedAvatar) {
      document.getElementById("profile-photo").src = savedAvatar;
    }
  }, []);

  return (
    <>
      <div className="profile-box">
        <h1>Профиль</h1>
        <div className="profile-card">
          <div className="photo-box">
            <img
              alt="Аватарка"
              src={localStorage.getItem("userAvatar") || "/src/assets/user.png"}
              id="profile-photo"
            />

            <button
              htmlFor="file-input"
              id="new-photo-button"
              onClick={uploadPhoto}
            >
              <label
                htmlFor="file-input"
                id="photo-label"
                className="new-photo-button"
              >
                Загрузить аватар
              </label>
            </button>

            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={uploadPhoto}
              style={{ display: "none" }}
            />
          </div>
          <div className="login-box">
            <h3>Логин:</h3>
            <Input
              id="login-input"
              type="text"
              autoFocus
              value={login}
              placeholder="Новый логин"
              onChange={(e) => setLogin(e.target.value)}
            />
            <div className="edit-login-buttons-box">
              <button id="save-login-button" onClick={handleLogin}>
                Сохранить
              </button>
              <button id="exit-button" onClick={handleLogout}>
                Выйти
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
