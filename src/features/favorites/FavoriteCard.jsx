import styles from "./FavoriteCard.module.css";

export default function FavoriteCard({ meal, onRemove }) {
  return (
    <div className={styles.favoriteCard}>
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <h3>{meal.strMeal}</h3>
      <button onClick={() => onRemove(meal.idMeal)}>Remove</button>
    </div>
  );
}
