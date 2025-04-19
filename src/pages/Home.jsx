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
  const renderSection = (title, items, type) => (
    <div className="mb-5">
      <h2 className="mb-3">{title}</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">
        {items.slice(0, 10).map(item => (
          <div className="col" key={item.uid}>
            <Card item={item} type={type} />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      {renderSection("Characters", characters, "people")}
      {renderSection("Vehicles", vehicles, "vehicles")}
      {renderSection("Planets", planets, "planets")}
    </div>
  );
}
 
export default Home;
