import React, { useState, useEffect } from "react";

import Input from "../../components/input/Input";
import BookCard from "../../components/bookcard/BookCard";
import "./Home.css";
import { useNavigate } from "react-router";
import BookList from "../../components/booklist/BookList";

function Home({ books }) {
  const [displayBooks, setDisplayBooks] = useState(books);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const applySearchSettings = () => {
    let updatedDisplayBooks = [];
    books.map((book, _) => {
      if (book.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        updatedDisplayBooks.push(book);
      }
    });
    setDisplayBooks(updatedDisplayBooks);
  };

  useEffect(applySearchSettings, [books, searchQuery]);
  useEffect(applySearchSettings, []);

  const handleAddBook = () => {
    navigate("/add-book");
  };

  return (
    <>
      <div className="main-box">
        <h1>Книги</h1>
        <div className="search-box">
          <Input
            id="search-input"
            type="text"
            autoFocus
            placeholder="Поиск по названию"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="base-button"
            id="add-book-button"
            onClick={handleAddBook}
          >
            Добавить книгу
          </button>
        </div>
      </div>
      <div className="books-box">
        <BookList>
          {displayBooks.map((item, index) => {
            return (
              <BookCard
                key={index}
                id={item.id}
                cover={item.cover}
                title={item.title}
                author={item.author}
                responsabile={item.responsabile}
                reviews={item.reviews}
              />
            );
          })}
        </BookList>
      </div>
    </>
  );
}

export default Home;
