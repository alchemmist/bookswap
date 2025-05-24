import "./PlaceItem.css";

function PlaceItem({ id, title, fullAddress, removeHandler }) {
  return (
    <div className="place-item">
      <div id="item-circle" />
      <div className="place-info-container">
        <h2>{title}</h2>
        <span>{fullAddress}</span>
      </div>
      <button id="remove-place-button" onClick={() => removeHandler(id)}>
        <img src="/src/assets/bin.svg" width="15px" id="" />
      </button>
    </div>
  );
}

export default PlaceItem;
