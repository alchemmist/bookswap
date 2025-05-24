import React, { useState } from "react";
import "./ReviewForm.css";

function ReviewForm({ submintHandler }) {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(3);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (content.trim() === "") {
      alert("Пожалуйста, напишите отзыв.");
      return;
    }
    submintHandler({ content, rating });
    setContent("");
    document.getElementById("review-content-editor").value = "";
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <div className="form-group">
        <label htmlFor="review-content-editor">Ваш отзыв:</label>
        <textarea
          id="review-content-editor"
          style={{
            width: "100%",
            resize: "none",
            borderRadius: "10px",
            padding: "10px",
          }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Напишите ваш отзыв..."
          rows="5"
          required
        />
      </div>
      <div id="raiting-container">
        <label htmlFor="review-rating">Ваша оценка:</label>
        <input
          id="review-rating"
          type="range"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          step="1"
        />
        <span>{rating} из 5</span>
      </div>
      <button type="submit" className="base-button">
        Оставить отзыв
      </button>
    </form>
  );
}

export default ReviewForm;
