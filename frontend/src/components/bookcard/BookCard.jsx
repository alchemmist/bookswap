import "./BookCard.css";
import * as catsDB from "../../stores/catsDB";
import { useState } from "react";

function BookCard({ id, cover, title, author, reviews }) {
  const [isFavorite, setIsFavorite] = useState(catsDB.isFavorite(id));

  const handleCardClick = () => {
    console.log("click")
    if (catsDB.isFavorite(id)) {
      catsDB.removeFavorite(id);
      setIsFavorite(false);
    } else {
      catsDB.addFavorite(id);
      setIsFavorite(true);
    }
  };

  return (
    <>
      <div className="book-card" onClick={handleCardClick}>
        <img alt="книжка" src={cover} />
        <span className="book-title">{title}</span>
        <span className="book-author">{author}</span>
      </div>
    </>
  );
}

export default BookCard;
