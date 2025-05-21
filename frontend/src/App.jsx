import Home from "./routes/home/Home";
import Login from "./routes/login/Login";
import Profile from "./routes/profile/Profile";
import Header from "./components/header/Header";
import React, { useState, useEffect } from "react";
import Favorites from "./routes/favorites/Favorites";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router";
import AuthWrapper from "./components/authwrapper/AuthWrapper";

function App() {
  const [tags, setTags] = useState([]);
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/cats.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();

        setCats(jsonData);

        const tags = jsonData
          .flatMap((cat) => cat.tags)
          .filter((tag, i, arr) => arr.indexOf(tag) === i);
        setTags(tags);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (cats.length === 0) return;

    const uniqueTags = cats
      .flatMap((cat) => cat.tags)
      .filter((tag, i, arr) => arr.indexOf(tag) === i);
    uniqueTags.unshift("-");

    setTags(uniqueTags);
  }, [cats]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/main"
          element={
            <AuthWrapper>
              <Home cats={cats} tags={tags} />
            </AuthWrapper>
          }
        />
        <Route
          path="/"
          element={
            <AuthWrapper>
              <Home cats={cats} tags={tags} />
            </AuthWrapper>
          }
        />
        <Route
          path="/favorites"
          element={
            <AuthWrapper>
              <Favorites cats={cats} />
            </AuthWrapper>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthWrapper>
              <Profile />
            </AuthWrapper>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
