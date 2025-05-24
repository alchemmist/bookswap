import { useState } from "react";
import Hider from "../hider/Hider";
import ReviewForm from "../review-form/ReviewForm";
import ReviewsList from "../reviews-list/ReviewsList";
import { getAuthId } from "../../stores/auth";
import ReviewCard from "../review-card/ReviewCard";
import "./BookCard.css";

function BookCard({ id, cover, title, author }) {
  const [isUnfold, setIsUnfold] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCardClick = async () => {
    setIsUnfold(true);
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/reviews?bookId=${id}`);
      if (!res.ok) {
        throw new Error(`Ошибка ${res.status}`);
      }
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error(err);
      setError("Не удалось загрузить отзывы");
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = async ({ content, rating }) => {
    try {
      const newReview = {
        content: content,
        stars: rating,
        reviewer: getAuthId(),
        book: id,
      };

      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReview),
      });

      if (!res.ok) {
        throw new Error(`Ошибка при создании отзыва: ${res.status}`);
      }

      setReviews((prev) => [newReview, ...prev]);
    } catch (err) {
      console.error(err);
      alert("Не удалось отправить отзыв.");
    }
  };

  return (
    <>
      <div className="book-card" onClick={handleCardClick}>
        <div className="image-wrapper">
          {cover ? (
            <img alt="книжка" src={cover} />
          ) : (
            <img alt="книжка" src="https://i.ibb.co/zTmTq8wv/Frame-11-1.png" />
          )}
        </div>
        <span className="book-title">
          {title.length > 10 ? `${title.slice(0, 28)}...` : title}
        </span>
        <span className="book-author">{author}</span>
      </div>

      {isUnfold && (
        <div className="unfold-book-box">
          <Hider layout="all" />
          <div className="book-card-unfold">
            <button id="close-unfold-card" onClick={() => setIsUnfold(false)}>
              <img src="/src/assets/cross.svg" alt="close" width="45px" />
            </button>

            <div className="book-left-column-container">
              {cover ? (
                <img alt="книжка" src={cover} id="cover-full-preview" />
              ) : (
                <img
                  alt="книжка"
                  src="https://i.ibb.co/zTmTq8wv/Frame-11-1.png"
                  id="cover-full-preview"
                />
              )}
              <div className="book-places-list">asdf</div>
            </div>

            <div className="book-info-container">
              <h1 id="unfolded-title">{title}</h1>
              <h2 id="unfolded-author">
                <span id="unfolded-annotation">Автор: </span>
                {author}
              </h2>

              <ReviewForm submintHandler={handleAddReview} />

              <h2 id="unfolded-annotation">Отзывы:</h2>

              {loading && <p>Загрузка отзывов…</p>}
              {error && <p className="error">{error}</p>}
              {!loading && !error && reviews.length === 0 && (
                <p>Пока нет отзывов.</p>
              )}
              {!loading && !error && reviews.length > 0 && (
                <ReviewsList>
                  {reviews.map((item, index) => {
                    return (
                      <ReviewCard
                        key={index}
                        id={item.id}
                        reviewerId={item.reviewer}
                        content={item.content}
                        stars={item.stars}
                      />
                    );
                  })}
                </ReviewsList>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BookCard;
