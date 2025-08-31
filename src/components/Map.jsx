
import React from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const QuakeMap = ({ features }) => {
  // function to pick marker color based on magnitude
  const magColor = (m) => {
    if (m >= 6) return "#d73027"; // red
    if (m >= 5) return "#f46d43"; // orange
    if (m >= 3) return "#1a9850"; // green
    return "#4575b4"; // blue for smaller quakes
  };

  return (
    <div className="map-container">
      <MapContainer
        center={[20, 0]} // Center on Earth
        zoom={2}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        {/* Base map */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* Earthquake markers */}
        {features.map((eq, idx) => {
          const [lng, lat, depth] = eq.geometry.coordinates;
          const mag = eq.properties.mag ?? 0;
          return (
            <CircleMarker
              key={idx}
              center={[lat, lng]}
              radius={4 + mag * 2} // bigger circle for stronger earthquake
              fillOpacity={0.6}
              stroke={false}
              pathOptions={{ color: magColor(mag) }}
            >
              <Popup>
                <strong>{eq.properties.place}</strong>
                <br />
                Magnitude: {mag}
                <br />
                Depth: {depth} km
                <br />
                Time: {new Date(eq.properties.time).toLocaleString()}
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default QuakeMap;