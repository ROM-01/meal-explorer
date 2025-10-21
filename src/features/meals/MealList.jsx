import MealCard from "./MealCard";

export default function MealList({ meals }) {
  if (meals.length === 0) return <p>No meals found.</p>;
  return (
    <div className="meal-grid">
      {meals.map((meal) => (
        <MealCard key={meal.idMeal} meal={meal} />
      ))}
    </div>
  );
}
