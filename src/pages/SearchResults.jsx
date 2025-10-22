import { useLocation } from "react-router-dom";
import MealList from "../features/meals/MealList";
import SearchBar from "../shared/SearchBar";
import styles from "./SearchResults.module.css";

export default function SearchResults() {
  const location = useLocation();
  const query =
    location.state?.query || localStorage.getItem("lastSearch") || "";

  return (
    <div className={styles.searchResults}>
      <SearchBar initialQuery={query} />
      {query ? (
        <MealList query={query} />
      ) : (
        <p className={styles.noResults}>Search for a meal to get started!</p>
      )}
    </div>
  );
}
