import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "../shared/Loader";
import styles from "./MealDetail.module.css";

export default function MealDetail() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMeal() {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await res.json();
        setMeal(data.meals[0]);
      } catch (error) {
        console.error("Error fetching meal:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMeal();
  }, [id]);

  if (loading) return <Loader />;
  if (!meal) return <p>Meal not found.</p>;

  return (
    <div className={styles.mealDetail}>
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className={styles.mealImg}
      />
      <h1>{meal.strMeal}</h1>
      <p>
        <strong>Category:</strong> {meal.strCategory}
      </p>
      <p>
        <strong>Area:</strong> {meal.strArea}
      </p>
      <h3>Instructions:</h3>
      <p>{meal.strInstructions}</p>
      <a href={meal.strYoutube} target="_blank" rel="noreferrer">
        ▶ Watch Tutorial
      </a>
      <br />
      <Link to="/">⬅ Back to Home</Link>
    </div>
  );
}
