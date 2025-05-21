import "./BookCard.css";
import * as catsDB from "../../stores/catsDB";
import { useEffect, useState } from "react";

function BookCard({ id, cover, title, author, reviews }) {
  const [isFavorite, setIsFavorite] = useState(catsDB.isFavorite(id));

  useEffect(() => {
    setIsFavorite(catsDB.isFavorite(id));
  }, [isFavorite]);

  const toggleFavorite = () => {
    if (catsDB.isFavorite(id)) {
      catsDB.removeFavorite(id);
      setIsFavorite(false);
    } else {
      catsDB.addFavorite(id);
      setIsFavorite(true);
    }
    if (favoriteChanged !== null && setFavoriteChanged !== null) {
      setFavoriteChanged(!favoriteChanged);
    }
  };

  return (
    <>
      <div className="book-card">
        <img alt="книжка" src={cover} />
        <span className="book-title">{title}</span>
        <span className="tag-list">{author}</span>
        <button className="mark-favorite" onClick={toggleFavorite}>
          {isFavorite ? (
            <span>&#x2605; В избранном</span>
          ) : (
            <span>&#9734; В избранное</span>
          )}
        </button>
      </div>
    </>
  );
}

export default BookCard;
