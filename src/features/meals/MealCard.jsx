export default function MealCard({ meal }) {
  const addFavorite = () => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!saved.find((m) => m.idMeal === meal.idMeal)) {
      localStorage.setItem("favorites", JSON.stringify([...saved, meal]));
      alert("Added to favorites!");
    }
  };

  return (
    <div className="meal-card">
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <h3>{meal.strMeal}</h3>
      <button onClick={addFavorite}>❤️ Save</button>
    </div>
  );
}
