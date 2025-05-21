import Home from "./routes/home/Home";
import Login from "./routes/login/Login";
import Profile from "./routes/profile/Profile";
import Header from "./components/header/Header";
import React, { useState, useEffect } from "react";
import Favorites from "./routes/favorites/Favorites";
import MyBooks from "./routes/mybooks/MyBooks";
import AddBook from "./routes/addbook/AddBook";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router";
import AuthWrapper from "./components/authwrapper/AuthWrapper";
import axios from "axios"; // Добавляем импорт axios
import "./App.css";

function App() {
  const [tags, setTags] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Делаем запрос к вашему бэкенду
        const response = await axios.get("http://localhost:8080/api/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
        // Можно добавить обработку ошибок (например, показать уведомление)
      }
    };
    fetchData();
  }, []); // Пустой массив зависимостей = выполняется только при монтировании

  useEffect(() => {
    if (books.length === 0) return;

    // Обрабатываем теги только когда книги загружены
    const uniqueTags = books
      .flatMap((book) => book.tags || []) // Используем пустой массив если тегов нет
      .filter((tag, i, arr) => arr.indexOf(tag) === i);

    uniqueTags.unshift("-"); // Добавляем дефис как первичный вариант

    setTags(uniqueTags);
  }, [books]); // Этот эффект зависит от books

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/main"
          element={
            <AuthWrapper>
              <Home books={books} />
            </AuthWrapper>
          }
        />
        <Route
          path="/"
          element={
            <AuthWrapper>
              <Home books={books} />
            </AuthWrapper>
          }
        />
        <Route
          path="/shelf"
          element={
            <AuthWrapper>
              <Favorites books={books} />
            </AuthWrapper>
          }
        />
        <Route
          path="/my-books"
          element={
            <AuthWrapper>
              <MyBooks books={books} />
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
        <Route
          path="/add-book"
          element={
            <AuthWrapper>
              <AddBook />
            </AuthWrapper>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
