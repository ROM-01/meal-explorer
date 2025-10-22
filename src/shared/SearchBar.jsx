import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../pages/Home.module.css";

export default function SearchBar({ initialQuery = "" }) {
  const [search, setSearch] = useState(initialQuery);
  const [diceLoading, setDiceLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      if (!search.trim()) return;
      localStorage.setItem("lastSearch", search);
      navigate("/search", { state: { query: search } });
    },
    [search, navigate]
  );

  const handleRandom = async () => {
    setDiceLoading(true);
    try {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const data = await res.json();
      const mealName = data.meals?.[0]?.strMeal;
      if (mealName) {
        localStorage.setItem("lastSearch", mealName);
        navigate("/search", { state: { query: mealName } });
      }
    } catch (error) {
      console.error("Error fetching random meal:", error);
    } finally {
      setDiceLoading(false);
    }
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search meals..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" disabled={!search.trim()}>
        Search
      </button>
      <button
        type="button"
        className={`${styles.randomBtn} ${diceLoading ? styles.spinning : ""}`}
        onClick={handleRandom}
        disabled={diceLoading}
      >
        🎲
        {!diceLoading && (
          <span className={styles.tooltip}>Generate a random meal!</span>
        )}
      </button>
    </form>
  );
}
