import "./BookList.css";

function BookList({ children }) {
  return (
    <>
      <div className="book-list-block">{children}</div>
    </>
  );
}

export default BookList;
