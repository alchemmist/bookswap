import "./CatList.css";

function CatList({ children }) {
  return (
    <>
      <div className="cat-list-block">{children}</div>
    </>
  );
}

export default CatList;
