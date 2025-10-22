import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./MealCard.module.css";

export default function MealCard({ meal }) {
  const [favText, setFavText] = useState("🤍 Save");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    if (saved.find((m) => m.idMeal === meal.idMeal)) {
      setFavText("Favorited");
    }
  }, [meal.idMeal]);

  const addFavorite = (e) => {
    e.stopPropagation();
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    const isSaved = saved.find((m) => m.idMeal === meal.idMeal);
    if (!isSaved) {
      localStorage.setItem("favorites", JSON.stringify([...saved, meal]));
      setFavText("Favorited");
    } else {
      const updated = saved.filter((m) => m.idMeal !== meal.idMeal);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setFavText("🤍 Save");
    }
  };

  return (
    <div className={styles.card}>
      <Link
        to={`/meal/${meal.idMeal}`}
        state={{ from: `/search`, query: meal.strMeal }}
        className={styles.cardLink}
      >
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className={styles.mealImg}
        />
        <h3>{meal.strMeal}</h3>
      </Link>
      <button className={styles.favButton} onClick={addFavorite}>
        {favText}
      </button>
    </div>
  );
}
