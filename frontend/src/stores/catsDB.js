export function getRawFavoriteIds() {
  const rawFavorites = localStorage.getItem("favorites");
  if (["", "[]", null, undefined].includes(rawFavorites)) {
    return [];
  }
  return JSON.parse(rawFavorites);
}

export function addFavorite(id) {
  let favorites = getRawFavoriteIds();
  favorites.push(id);
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

export function removeFavorite(id) {
  let favorites = getRawFavoriteIds();
  localStorage.setItem(
    "favorites",
    JSON.stringify(favorites.filter((elem) => elem !== id)),
  );
}

export function getFavoriteCats(cats) {
  return cats.length === 0
    ? []
    : getRawFavoriteIds().map((id) => cats.filter((cat) => cat.id === id)[0]);
}

export function isFavorite(catId) {
  return getRawFavoriteIds().includes(catId);
}
