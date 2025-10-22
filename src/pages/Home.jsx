import { useState, useEffect } from "react";
import SearchBar from "../shared/SearchBar";
import MealCard from "../features/meals/MealCard";
import styles from "./Home.module.css";

export default function Home() {
  const [lastMeals, setLastMeals] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("lastSearch") || "";

    if (stored) {
      const fetchLastMeals = async () => {
        try {
          const res = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${stored}`
          );
          const data = await res.json();
          if (data.meals) {
            setLastMeals(data.meals); // save all meals
          }
        } catch (err) {
          console.error("Error fetching last searched meals:", err);
        }
      };
      fetchLastMeals();
    }
  }, []);

  return (
    <div className={styles.home}>
      <SearchBar />
      <section className={styles.infoSection}>
        <h2>Welcome to Meal Explorer 🍽</h2>
        <p>
          Discover delicious recipes from around the world! Enter a meal name in
          the search bar above to get started. Click any meal card to view its
          details, watch tutorials, and save your favorites. ❤️
        </p>
        <p className={styles.hint}>👉 Enter a meal to begin your search!</p>
      </section>

      {lastMeals.length > 0 && (
        <section className={styles.pastSearch}>
          <h4>Recent Meal Search:</h4>
          <div className={styles.mealGrid}>
            {lastMeals.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
