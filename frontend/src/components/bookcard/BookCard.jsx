import React, { useState } from "react";
import Hider from "../hider/Hider";
import ReviewForm from "../review-form/ReviewForm";
import ReviewsList from "../reviews-list/ReviewsList";
import { getAuthId } from "../../stores/auth";
import ReviewCard from "../review-card/ReviewCard";
import TransferCard from "../transfer-card/TransferCard";
import "./BookCard.css";

function BookCard({ id, cover, title, author }) {
  const [isUnfold, setIsUnfold] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [loadingTransfers, setLoadingTransfers] = useState(false);
  const [error, setError] = useState(null);

  const handleCardClick = async () => {
    setIsUnfold(true);
    setLoadingReviews(true);
    setLoadingTransfers(true);
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
      setLoadingReviews(false);
    }

    try {
      const res = await fetch(`/api/transfers/book/${id}`);
      if (!res.ok) {
        throw new Error(`Ошибка ${res.status}`);
      }
      const data = await res.json();
      setTransfers(data);
    } catch (err) {
      console.error(err);
      setError("Не удалось загрузить трансферы");
    } finally {
      setLoadingTransfers(false);
    }
  };

  const handleAddReview = async ({ content, rating }) => {
    try {
      const newReview = {
        content,
        stars: rating,
        reviewer: getAuthId(),
        book: id,
      };

      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
          <img
            alt="книжка"
            src={cover ? cover : "https://i.ibb.co/zTmTq8wv/Frame-11-1.png"}
          />
        </div>
        <span className="book-title">
          {title.length > 28 ? `${title.slice(0, 28)}...` : title}
        </span>
        <span className="book-author">{author}</span>
      </div>

      {isUnfold && (
        <div className="unfold-book-box">
          <Hider layout="all" />
          <div className="book-card-unfold">
            <button id="close-unfold-card" onClick={() => setIsUnfold(false)}>
              <img src="/src/assets/cross.svg" alt="close" width="45" />
            </button>

            <div className="book-left-column-container">
              <img
                alt="книжка"
                src={cover ? cover : "https://i.ibb.co/zTmTq8wv/Frame-11-1.png"}
                id="cover-full-preview"
              />

              <h2 id="unfolded-annotation">Трансферы:</h2>

              {loadingTransfers && <p>Загрузка трансферов…</p>}
              {error && <p className="error">{error}</p>}
              {!loadingTransfers && !error && transfers.length === 0 && (
                <p>Пока нет трансферов.</p>
              )}
              {!loadingTransfers && !error && transfers.length > 0 && (
                <div className="book-transfers-list">
                  {transfers.map((item) =>
                    !item.is_closed ? (
                      <TransferCard
                        key={item.id}
                        id={item.id}
                        sender={item.sender}
                        receiver={item.receiver}
                        placeId={item.place}
                        book={item.book}
                        createdAt={item.created_at}
                        closedAt={item.closed_at}
                      />
                    ) : null,
                  )}
                </div>
              )}
            </div>

            <div className="book-info-container">
              <h1 id="unfolded-title">{title}</h1>
              <h2 id="unfolded-author">
                <span id="unfolded-annotation">Автор: </span>
                {author}
              </h2>

              <ReviewForm submintHandler={handleAddReview} />

              <h2 id="unfolded-annotation">Отзывы:</h2>

              {loadingReviews && <p>Загрузка отзывов…</p>}
              {error && <p className="error">{error}</p>}
              {!loadingReviews && !error && reviews.length === 0 && (
                <p>Пока нет отзывов.</p>
              )}
              {!loadingReviews && !error && reviews.length > 0 && (
                <ReviewsList>
                  {reviews.map((item) => (
                    <ReviewCard
                      key={item.id}
                      id={item.id}
                      reviewerId={item.reviewer}
                      content={item.content}
                      stars={item.stars}
                    />
                  ))}
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
