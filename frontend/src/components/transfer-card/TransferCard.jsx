import { useEffect, useState } from "react";
import "./TransferCard.css";

function TransferCard({ id, sender, receiver, placeId, bookId }) {
  const [placeTitle, setPlaceTitle] = useState("Загрузка...");
  const [placeFullAddress, setPlaceFullAddress] = useState("Загрузка...");

  useEffect(() => {
    fetch(`/api/places/${placeId}`)
      .then((res) => res.json())
      .then((data) => {
        setPlaceTitle(data.title);
        setPlaceFullAddress(data.full_address);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [placeId]);

  return (
    <div className="transfer-card">
      <div className="transfer-info-container">
        <img src="/src/assets/avatar.svg" alt="аватар" width="45px" />
        <h3>{placeTitle}</h3>
        <span id="place-full-address">{placeFullAddress}</span>
      </div>
    </div>
  );
}

export default TransferCard;
