import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function Detail() {
  const { type, uid } = useParams();
  const [detail, setDetail] = useState(null);

  // Definimos las rutas de imágenes según el tipo
  const imagePaths = {
    people: "characters",
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
      <Link to="/" className="btn btn-secondary mb-4">
        ⬅ Volver al listado
      </Link>
      <div className="row">
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
        <div className="col-md-6">
          <h2 className="mb-4">{detail.properties.name}</h2>
          <ul className="list-group">
            {type === "people" && (
              <>
                <li className="list-group-item"><strong>Altura:</strong> {detail.properties.height}</li>
                <li className="list-group-item"><strong>Género:</strong> {detail.properties.gender}</li>
                <li className="list-group-item"><strong>Color de ojos:</strong> {detail.properties.eye_color}</li>
                <li className="list-group-item"><strong>Año de nacimiento:</strong> {detail.properties.birth_year}</li>
              </>
            )}
            {type === "planets" && (
              <>
                <li className="list-group-item"><strong>Clima:</strong> {detail.properties.climate}</li>
                <li className="list-group-item"><strong>Gravedad:</strong> {detail.properties.gravity}</li>
                <li className="list-group-item"><strong>Terreno:</strong> {detail.properties.terrain}</li>
                <li className="list-group-item"><strong>Población:</strong> {detail.properties.population}</li>
              </>
            )}
            {type === "vehicles" && (
              <>
                <li className="list-group-item"><strong>Modelo:</strong> {detail.properties.model}</li>
                <li className="list-group-item"><strong>Fabricante:</strong> {detail.properties.manufacturer}</li>
                <li className="list-group-item"><strong>Capacidad:</strong> {detail.properties.passengers}</li>
                <li className="list-group-item"><strong>Velocidad:</strong> {detail.properties.max_atmosphering_speed}</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Detail;