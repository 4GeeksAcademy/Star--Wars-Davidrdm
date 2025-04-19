import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

function Navbar() {
  const { store, dispatch } = useGlobalReducer();
  const favorites = store?.favorites || [];

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <Link to="/" className="navbar-brand">🌌 Star Wars</Link>
      <div className="dropdown">
        <button className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
          ⭐ Favoritos ({favorites.length})
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
          {favorites.length === 0 ? (
            <li className="dropdown-item">No hay favoritos</li>
          ) : (
            favorites.map((item, idx) => (
              <li key={idx}>
                <Link className="dropdown-item" to={`/${item.type}/${item.uid}`}>
                  {item.name}
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
