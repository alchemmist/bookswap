import React from "react";
import "./StarRaiting.css";

function StarRating({ count }) {
  const totalStars = 5;

  return (
    <div className="star-rating">
      {Array.from({ length: totalStars }, (_, index) =>
        index < count ? (
          <img src="/src/assets/star-on.svg" alt="рейтинг" width="15px" />
        ) : (
          <img src="/src/assets/star-off.svg" alt="рейтинг" width="15px" />
        ),
      )}
    </div>
  );
}

export default StarRating;
