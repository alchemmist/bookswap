import { useEffect, useState } from "react";
import StarRating from "../star-raiting/StarRaiting";
import "./ReviewCard.css";

function ReviewCard({ reviewerId, content, stars }) {
  const [username, setUsername] = useState("Загрузка...");

  useEffect(() => {
    fetch(`/api/users/${reviewerId}`)
      .then((res) => res.json())
      .then((data) => {
        setUsername(data.username);
      })
      .catch((err) => {
        console.log(reviewerId);
        console.log(err);
        setUsername("Неизвестный пользователь");
      });
  }, [reviewerId]);

  return (
    <div className="review-card">
      <div id="review-top-containter">
        <div className="reviewer-container">
          <img src="/src/assets/avatar.svg" alt="аватар" width="45px" />
          <h3>{username}</h3>
        </div>
        <StarRating count={stars} />
      </div>
      <span id="review-content">{content}</span>
    </div>
  );
}

export default ReviewCard;
