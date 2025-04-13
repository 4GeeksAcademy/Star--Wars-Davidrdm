import React, { useEffect, useState } from "react";
import Card from "../components/card.jsx";

function Home() {
  const [characters, setCharacters] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    fetch("https://www.swapi.tech/api/people")
      .then(res => res.json())
      .then(data => setCharacters(data.results));

    fetch("https://www.swapi.tech/api/vehicles")
      .then(res => res.json())
      .then(data => setVehicles(data.results));

    fetch("https://www.swapi.tech/api/planets")
      .then(res => res.json())
      .then(data => setPlanets(data.results));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Characters</h2>
      <div className="d-flex overflow-auto">
        {characters.slice(0, 5).map(item => (
          <Card key={item.uid} item={item} type="people" />
        ))}
      </div>

      <h2 className="mt-4">Vehicles</h2>
      <div className="d-flex overflow-auto">
        {vehicles.slice(0, 5).map(item => (
          <Card key={item.uid} item={item} type="vehicles" />
        ))}
      </div>

      <h2 className="mt-4">Planets</h2>
      <div className="d-flex overflow-auto">
        {planets.slice(0, 5).map(item => (
          <Card key={item.uid} item={item} type="planets" />
        ))}
      </div>
    </div>
  );
}

export default Home;
