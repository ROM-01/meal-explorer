import { useState, useEffect } from "react";
import FavoritesList from "../features/favorites/FavoritesList";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  return (
    <div className="container">
      <h1>❤️ Your Favorites</h1>
      <FavoritesList favorites={favorites} />
    </div>
  );
}
