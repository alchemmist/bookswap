import { useEffect, useState } from "react";
import BookCard from "../../components/bookcard/BookCard";
import BookList from "../../components/booklist/BookList";
import { getFavoriteCats } from "../../stores/catsDB";

function MyBooks({ cats }) {
  const [favoriteCats, setFavoriteCats] = useState(getFavoriteCats(cats));
  const [favoriteChanged, setFavoriteChanged] = useState(false);

  useEffect(() => {
    setFavoriteCats(getFavoriteCats(cats));
    console.log(favoriteChanged);
  }, [cats, favoriteChanged]);

  return (
    <>
      <div className="favorites-block">
        <h1>Избранное</h1>
        {favoriteCats.length === 0 ? (
          <span className="no-favorites-note">
            У вас пока нет избранных картинок.
          </span>
        ) : (
          <BookList>
            {favoriteCats.map((cat, index) => {
              return (
                <BookCard
                  key={index}
                  id={cat.id}
                  imageSrc={"/src/assets/" + cat.image}
                  catName={cat.name}
                  tagList={cat.tags}
                  isFavorite={true}
                  favoriteChanged={favoriteChanged}
                  setFavoriteChanged={setFavoriteChanged}
                />
              );
            })}
          </BookList>
        )}
      </div>
    </>
  );
}

export default MyBooks;
