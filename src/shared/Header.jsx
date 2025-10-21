import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <nav className="navbar">
      <h2>Meal Explorer</h2>
      <div>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Favorites
        </NavLink>
      </div>
    </nav>
  );
}
