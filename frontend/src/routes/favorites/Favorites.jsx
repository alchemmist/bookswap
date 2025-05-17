import { useEffect, useState } from "react";
import CatCard from "../../components/catcard/CatCard";
import CatList from "../../components/catlist/CatList";
import { getFavoriteCats } from "../../stores/catsDB";
import "./Favorites.css";

function Favorites({ cats }) {
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
          <CatList>
            {favoriteCats.map((cat, index) => {
              return (
                <CatCard
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
          </CatList>
        )}
      </div>
    </>
  );
}

export default Favorites;
