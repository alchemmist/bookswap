import "./BookCard.css";
import { useState } from "react";
import Hider from "../hider/Hider";

function BookCard({ id, cover, title, author, reviews }) {
  const [isUnfold, setIsUnfold] = useState(false);

  const handleCardClick = () => {
    setIsUnfold(true);
  };

  return (
    <>
      <div className="book-card" onClick={handleCardClick}>
        <img alt="книжка" src={cover} />
        <span className="book-title">{title}</span>
        <span className="book-author">{author}</span>
      </div>
      {isUnfold && (
        <div className="unfold-book-box">
          <Hider layout="all" />
          <div className="book-card-unfold">
            <button
              id="close-unfold-card"
              onClick={() => {
                setIsUnfold(false);
              }}
            >
              <img src="/src/assets/cross.svg" alt="close" width="45px" />
            </button>
            <img alt="книжка" src={cover} id="cover-full-preview" />

            <div className="book-info-container">
              <h1 id="unfolded-title">{title}</h1>
              <h2 id="unfolded-author">
                <span id="unfolded-annotation">Автор: </span>
                {author}
              </h2>
              <h2 id="unfolded-author">
                <span id="unfolded-annotation">Отзывы: </span>
                {reviews}
              </h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BookCard;
