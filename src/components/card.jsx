import React, { useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const preferredKeys = {
  people: ["height", "gender", "birth_year"],
  vehicles: ["model", "manufacturer", "crew"],
  planets: ["climate", "population", "terrain"],
};

const imagePaths = {
  people: "characters",
  planets: "planets",
  vehicles: "vehicles",
};

function Card({ item, type }) {
  const { store, dispatch } = useGlobalReducer();
  const [expandedData, setExpandedData] = useState(null);
  const [loading, setLoading] = useState(false);

  const uid = item.uid || item.url.split("/").filter(Boolean).pop();
  const imageCategory = imagePaths[type] || "characters";
  const imageUrl = `https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/${imageCategory}/${uid}.jpg`;

  const isFavorite = store.favorites.some(
    (fav) => fav.uid === item.uid && fav.type === type
  );

  const toggleFavorite = () => {
    const payload = { ...item, type, uid };
    if (isFavorite) {
      dispatch({ type: "REMOVE_FAVORITE", payload });
    } else {
      dispatch({ type: "ADD_FAVORITE", payload });
    }
  };

  const handleTitleClick = async () => {
    console.log("Hiciste clic en:", item.name); // DEBE aparecer en la consola

    if (expandedData) {
      setExpandedData(null);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`https://www.swapi.tech/api/${type}/${uid}`);
      const data = await res.json();
      console.log("Datos recibidos:", data.result.properties); // DEBE aparecer
      setExpandedData(data.result.properties);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card m-2 h-100">
      <div className="card-body d-flex flex-column justify-content-between">
        <img
          className="img-fluid mb-2 rounded"
          alt={item.name}
          src={imageUrl}
          onError={(e) =>
            (e.target.src =
              "https://starwars-visualguide.com/assets/img/big-placeholder.jpg")
          }
        />

        {/* Título clickeable */}
        <h5
          className="card-title text-primary d-flex justify-content-between align-items-center"
          style={{ cursor: "pointer" }}
          onClick={handleTitleClick}
        >
          {item.name}
          <span>{expandedData ? "▲" : "▼"}</span>
        </h5>

        {/* Contenido expandido */}
        <div className={`expand-container ${expandedData ? "expanded" : ""}`}>
          {loading && <p>Cargando...</p>}
          {expandedData &&
            preferredKeys[type].map(
              (key) =>
                expandedData[key] && (
                  <p key={key}>
                    <strong>
                      {key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}:
                    </strong>{" "}
                    {expandedData[key]}
                  </p>
                )
            )}
        </div>

        {/* Botones */}
        <Link to={`/${type}/${uid}`} className="btn btn-primary me-2 mb-2">
          Learn more
        </Link>
        <button className="btn btn-outline-warning" onClick={toggleFavorite}>
          {isFavorite ? "💛" : "🤍"}
        </button>
      </div>
    </div>
  );
}

export default Card;
