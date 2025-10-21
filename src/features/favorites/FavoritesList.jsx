import { useEffect, useState } from "react";
import FavoriteCard from "./FavoriteCard";
import styles from "./FavoritesList.module.css";

export default function FavoritesList() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter((m) => m.idMeal !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className={styles.favoritesList}>
      <h2>My Favorite Meals ❤️</h2>
      {favorites.length === 0 ? (
        <p className={styles.emptyMessage}>
          You haven’t added any favorites yet!
        </p>
      ) : (
        <div className={styles.favoritesGrid}>
          {favorites.map((meal) => (
            <FavoriteCard
              key={meal.idMeal}
              meal={meal}
              onRemove={removeFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
