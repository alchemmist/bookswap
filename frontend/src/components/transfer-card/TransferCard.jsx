import { useEffect, useState } from "react";
import "./TransferCard.css";
import axios from "axios";

function TransferCard({ id, sender, receiver, placeId, bookId, anihilator }) {
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

  const handleCloseTransfer = () => {
    axios.patch(`/api/transfers/${id}/close`);
    anihilator(id);
  };

  return (
    <div className="transfer-card">
      <div className="transfer-info-container">
        <img src="/src/assets/avatar.svg" alt="аватар" width="45px" />
        <div id="place-in-transfer-info">
          <h3>{placeTitle}</h3>
          <span id="place-full-address">{placeFullAddress}</span>
        </div>
      </div>
      <button
        className="base-button"
        id="close-transfer-button"
        onClick={handleCloseTransfer}
      >
        <img src="/src/assets/check.svg" width="27px" />
      </button>
    </div>
  );
}

export default TransferCard;
