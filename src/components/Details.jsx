import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { type, uid } = useParams();
  const [detail, setDetail] = useState(null);

  // Definimos las rutas de imágenes según el tipo
  const imagePaths = {
    characters: "characters",
    planets: "planets",
    vehicles: "vehicles",
  };

  const imageCategory = imagePaths[type] || "characters";

  const imageUrl = `https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/${imageCategory}/${uid}.jpg`;

  useEffect(() => {
   fetch(`https://www.swapi.tech/api/${type}/${uid}`)
      .then(res => res.json())
      .then(data => setDetail(data.result))
      .catch(err => console.error("Fetch error:", err));
  }, [type, uid]);

  if (!detail || !detail.properties) {
    return <div className="container mt-4"><p>Loading...</p></div>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Imagen */}
        <div className="col-md-6">
          <img
            src={imageUrl}
            alt={detail.properties.name}
            className="img-fluid"
            onError={(e) =>
              (e.target.src =
                "https://starwars-visualguide.com/assets/img/big-placeholder.jpg")
            }
          />
        </div>

        {/* Información */}
        <div className="col-md-6">
          <h2 className="mb-4">{detail.properties.name}</h2>
          <ul className="list-group">
            {Object.entries(detail.properties).map(([key, value]) => (
              <li key={key} className="list-group-item">
                <strong>{key.replace("_", " ").toUpperCase()}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Detail;


