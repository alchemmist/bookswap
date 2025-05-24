import "./ReviewsList.css";

function ReviewsList({ children }) {
  return (
    <>
      <div className="reviews-list-block">{children}</div>
    </>
  );
}

export default ReviewsList;
