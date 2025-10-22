import { useParams, useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Loader from "../../shared/Loader";
import styles from "./MealDetail.module.css";

export default function MealDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favText, setFavText] = useState("❤️ Save");

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await res.json();
        setMeal(data.meals?.[0] || null);
      } catch (err) {
        console.error("Error fetching meal:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMeal();
  }, [id]);

  useEffect(() => {
    if (!meal) return;
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavText(
      saved.some((m) => m.idMeal === meal.idMeal) ? "Favorited" : "❤️ Save"
    );
  }, [meal]);

  const toggleFavorite = () => {
    if (!meal) return;
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    const exists = saved.some((m) => m.idMeal === meal.idMeal);
    const updated = exists
      ? saved.filter((m) => m.idMeal !== meal.idMeal)
      : [...saved, meal];

    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavText(exists ? "❤️ Save" : "Favorited");
  };

  const handleBack = () => {
    // navigate back to the previous page or default to home
    const prevPage = location.state?.from || "/";
    navigate(prevPage);
  };

  if (loading) return <Loader />;
  if (!meal) return <p>Meal not found.</p>;

  return (
    <div className={styles.mealDetailBox}>
      <button className={styles.backBtn} onClick={handleBack}>
        ⬅ Back
      </button>

      <div className={styles.detailImgWrapper}>
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className={styles.detailImg}
        />
      </div>

      <h1>{meal.strMeal}</h1>
      <p>
        <strong>Category:</strong> {meal.strCategory}
      </p>
      <p>
        <strong>Area:</strong> {meal.strArea}
      </p>

      <h3>Instructions:</h3>
      <div className={styles.scrollBox}>{meal.strInstructions}</div>

      <div className={styles.buttonGroup}>
        {meal.strYoutube && (
          <a href={meal.strYoutube} target="_blank" rel="noreferrer">
            ▶ Watch Tutorial
          </a>
        )}
        <button className={styles.favButton} onClick={toggleFavorite}>
          {favText}
        </button>
      </div>
    </div>
  );
}
