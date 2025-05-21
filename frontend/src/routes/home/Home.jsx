import React, { useState, useEffect } from "react";

import Input from "../../components/input/Input";
import Select from "../../components/select/Select";
import BookCard from "../../components/bookcard/BookCard";
import "./Home.css";
import { useNavigate } from "react-router";
import CatList from "../../components/catlist/CatList";

function Home({ books }) {
  const [displayBooks, setDisplayBooks] = useState(books);
  const [currentTag, setCurrentTag] = useState("-");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const applySearchSettings = () => {
    let updatedDisplayBooks = [];
    books.map((book, _) => {
      if (
        book.name.includes(searchQuery) &&
        (book.tags.includes(currentTag) || currentTag === "-")
      ) {
        updatedDisplayBooks.push(book);
      }
    });
    setDisplayBooks(updatedDisplayBooks);
  };

  useEffect(applySearchSettings, [books, currentTag, searchQuery]);
  useEffect(applySearchSettings, []);

  const handleAddBook = () => {
    navigate("/add-book")
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
      <div className="cats-box">
        <CatList>
          {displayBooks.map((item, index) => {
            return (
              <BookCard
                key={index}
                id={item.id}
                cover={item.cover}
                title={item.title}
                author={item.author}
                reviews={item.reviews}
              />
            );
          })}
        </CatList>
      </div>
    </>
  );
}

export default Home;
