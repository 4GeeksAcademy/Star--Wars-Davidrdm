import React, { useEffect, useState } from "react";
import Card from "../components/card.jsx";

function Home() {
  const [characters, setCharacters] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [planets, setPlanets] = useState([]);

  const [details, setDetails] = useState({
    people: {},
    vehicles: {},
    planets: {},
  });

  const [expanded, setExpanded] = useState({
    people: false,
    vehicles: false,
    planets: false,
  });

  useEffect(() => {
    fetch("https://www.swapi.tech/api/people")
      .then((res) => res.json())
      .then((data) => setCharacters(data.results));

    fetch("https://www.swapi.tech/api/vehicles")
      .then((res) => res.json())
      .then((data) => setVehicles(data.results));

    fetch("https://www.swapi.tech/api/planets")
      .then((res) => res.json())
      .then((data) => setPlanets(data.results));
  }, []);

  const toggleExpand = async (type, items) => {
    const isNowExpanded = !expanded[type];

    if (isNowExpanded && Object.keys(details[type]).length === 0) {
      const newDetails = {};
      for (let item of items.slice(0, 10)) {
        try {
          const res = await fetch(`https://www.swapi.tech/api/${type}/${item.uid}`);
          const data = await res.json();
          newDetails[item.uid] = data.result.properties;
        } catch (err) {
          console.error(`Error loading ${type} ${item.uid}`, err);
        }
      }
      setDetails((prev) => ({
        ...prev,
        [type]: newDetails,
      }));
    } else if (!isNowExpanded) {
      // Clear data if collapsing
      setDetails((prev) => ({
        ...prev,
        [type]: {},
      }));
    }

    setExpanded((prev) => ({
      ...prev,
      [type]: isNowExpanded,
    }));
  };

  const renderSection = (title, items, type) => (
    <div className="mb-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{title}</h2>
       
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">
        {items.slice(0, 10).map((item) => (
          <div className="col" key={item.uid}>
            <Card item={item} type={type} expandedData={details[type][item.uid]} />
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
