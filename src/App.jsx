
import React, { useState, useEffect } from "react";
import Control from "./components/Control";
import QuakeMap from "./components/Map";

const App = () => {
  const [filters, setFilters] = useState({
    timeOption: "Past Day",
    mag: 0,
    search: "",
  });
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // decide API URL based on filters.timeOption
  const getApiUrl = () => {
    switch (filters.timeOption) {
      case "Past Hour":
        return "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";
      case "Past Day":
        return "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
      case "Past Week":
        return "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
      case "Past Month":
        return "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";
      case "4.5+ Week":
        return "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
      default:
        return "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
    }
  };
  // fetch data whenever timeframe changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(getApiUrl());
        const data = await res.json();
        setEarthquakes(data.features || []);
      } catch (err) {
        setError("Failed to fetch earthquake data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filters.timeOption]);

  // apply magnitude + search filters
  const filteredFeatures = earthquakes.filter((eq) => {
    // Round down both values so 5 includes 5.0–5.9
    const magOk = Math.floor(eq.properties.mag) === Number(filters.mag);
    const searchOk = eq.properties.place
      ?.toLowerCase()
      .includes(filters.search.toLowerCase());
    return magOk && searchOk;
  });
  
  const strongestQuake =
    filteredFeatures.length > 0
      ? filteredFeatures.reduce((max, eq) =>
          eq.properties.mag > max.properties.mag ? eq : max
        )
      : null;
      
  return (
    <div className="app-container">
      <Control onFilterChange={setFilters} />
      <div className="content-container">
        {loading && <p className="loading">Loading data...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && (
          <>
            <p className="data">
              {filteredFeatures.length} Earthquakes found
            </p>
            {strongestQuake && (
              <div className="strongest">
                <h2>⚡ Recent Strongest Quake</h2>
                <p><strong>Location:</strong> {strongestQuake.properties.place}</p>
                <p><strong>Magnitude:</strong> {strongestQuake.properties.mag}</p>
                <p><strong>Time:</strong> {new Date(strongestQuake.properties.time).toLocaleString()}</p>
              </div>
            )}
            <div className="map-wrapper">
              <QuakeMap features={filteredFeatures} />
            </div>
          </>
        )}
        {!loading && !error && filteredFeatures.length === 0 && (
          <p className="no-results">No earthquakes match your filters.</p>
        )}
      </div>
    </div>
  );
};

export default App;