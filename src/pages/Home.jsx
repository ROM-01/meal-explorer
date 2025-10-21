import { useState } from "react";
import MealCard from "../features/meals/MealCard";
import Loader from "../shared/Loader";
import styles from "./Home.module.css";

export default function Home() {
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchMeals(query) {
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await res.json();
      setMeals(data.meals || []);
    } catch (error) {
      console.error("Error fetching meals:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMeals(search);
  };

  return (
    <div className={styles.home}>
      <form className={styles.searchBar} onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search meals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* Show guide text only when nothing is searched */}
      {!search && (
        <section className={styles.infoSection}>
          <h2>🍽 Welcome to Meal Explorer</h2>
          <p>
            Discover delicious recipes from around the world! Enter a meal name
            in the search bar above to get started. Click any meal card to view
            its details, watch tutorials, and save your favorites ❤️
          </p>
          <p className={styles.hint}>
            👉 Enter a meal here to begin your search!
          </p>
        </section>
      )}

      {loading && <Loader />}

      {!loading && meals && meals.length > 0 && (
        <div className="grid">
          {meals.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}

      {!loading && search && meals.length === 0 && (
        <p className={styles.noResults}>No meals found. Try another name!</p>
      )}
    </div>
  );
}
