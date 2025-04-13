import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const imagePaths = {
  people: "characters",
  planets: "planets",
  vehicles: "vehicles",
};

function Card({ item, type }) {
  const { store, dispatch } = useGlobalReducer();
  const isFavorite = store.favorites.some(fav => fav.uid === item.uid && fav.type === type);

  const toggleFavorite = (item) => {
    if (isFavorite) {
      dispatch({ type: "REMOVE_FAVORITE", payload: item });
    } else {
      dispatch({ type: "ADD_FAVORITE", payload: item });
    }
  };

  const imageCategory = imagePaths[type] || "characters";
  const imageUrl = `https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/${imageCategory}/${item.uid}.jpg`;

  
  const renderExtraInfo = () => {
    switch (type) {
      case "people":
        return (
          <>
            <p><strong>Gender:</strong> {item.gender}</p>
            <p><strong>Height:</strong> {item.height}</p>
          </>
        );
      case "planets":
        return (
          <>
            <p><strong>Climate:</strong> {item.climate}</p>
            <p><strong>Terrain:</strong> {item.terrain}</p>
          </>
        );
      case "vehicles":
        return (
          <>
            <p><strong>Model:</strong> {item.model}</p>
            <p><strong>Manufacturer:</strong> {item.manufacturer}</p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="card m-2" style={{ minWidth: "250px" }}>
      <div className="card-body">
        <img
          className="img-fluid mb-2"
          alt={item.name}
          src={imageUrl}
          onError={(e) =>
            (e.target.src =
              "https://starwars-visualguide.com/assets/img/big-placeholder.jpg")
          }
        />
        <h5 className="card-title">{item.name}</h5>
        {renderExtraInfo()}
        <Link to={`/${type}/${item.uid}`} className="btn btn-primary me-2">
          Learn more
        </Link>
        <button
          className="btn btn-outline-warning"
          onClick={() => toggleFavorite({ ...item, type })}
        >
          {isFavorite ? "💛" : "🤍"}
        </button>
      </div>
    </div>
  );
}

export default Card;
