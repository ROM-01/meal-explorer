import { Link } from "react-router-dom";
import styles from "./FavoriteCard.module.css";

export default function FavoriteCard({ meal, onRemove }) {
  return (
    <div className={styles.favoriteCard}>
      <Link
        to={`/meal/${meal.idMeal}`}
        state={{ from: "/favorites" }}
        className={styles.cardLink}
      >
        <img src={meal.strMealThumb} alt={meal.strMeal} />
        <h3>{meal.strMeal}</h3>
      </Link>
      <button onClick={() => onRemove(meal.idMeal)}>Remove</button>
    </div>
  );
}
