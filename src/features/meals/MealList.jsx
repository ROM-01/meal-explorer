import { useState, useEffect } from "react";
import MealCard from "./MealCard";
import Loader from "../../shared/Loader";
import styles from "./MealList.module.css";

export default function MealList({ query }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchMeals = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
        );
        const data = await res.json();
        setMeals(data.meals || []);
      } catch (err) {
        console.error("Error fetching meals:", err);
        setMeals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [query]);

  if (loading) return <Loader />;
  if (!meals || meals.length === 0)
    return <p className={styles.noResults}>No meals found.</p>;

  return (
    <div className={styles.mealGrid}>
      {meals.map((meal) => (
        <MealCard key={meal.idMeal} meal={meal} />
      ))}
    </div>
  );
}
