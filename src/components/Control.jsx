
import React, { useState } from "react";

const Control = ({ onFilterChange = () => {} }) => {
  const [timeOption, setTimeOption] = useState("Past Day");
  const [mag, setMag] = useState(0);
  const [search, setSearch] = useState("");

  return (
    <div className="main">
      <h1 className="text-2xl font-bold mb-2">🌍 Earthquake Visualizer</h1>
      <p className="mb-4 text-gray-700">Filter and explore real-time earthquake data</p>

      <div className="filters">
        {/* Timeframe */}
        <div className="filter-item">
          <label className="block font-medium">Select Timeframe:</label>
          <select
            value={timeOption}
            onChange={(e) => {
              const val = e.target.value;
              setTimeOption(val);
              onFilterChange({ timeOption: val, mag, search });
            }}
            className="w-full p-2 rounded border border-gray-300 mt-1"
          >
            <option value="Past Hour">Past Hour</option>
            <option value="Past Day">Past Day</option>
            <option value="Past Week">Past Week</option>
            <option value="Past Month">Past Month</option>
            <option value="4.5+ Week">4.5+ Week</option>
          </select>
        </div>

        {/* Magnitude */}
        <div className="filter-item">
          <label className="block font-medium">Min Magnitude: {mag}</label>
          <input
            type="range"
            value={mag}
            min={0}
            max={7}
            step={1}
            onChange={(e) => {
              const val = Number(e.target.value);
              setMag(val);
              onFilterChange({ timeOption, mag: val, search });
            }}
            className="w-full mt-1"
          />
        </div>

        {/* Search */}
        <div className="filter-item">
          <label className="block font-medium">Search by Place:</label>
          <input
            type="text"
            value={search}
            placeholder="e.g., California"
            onChange={(e) => {
              const val = e.target.value;
              setSearch(val);
              onFilterChange({ timeOption, mag, search: val });
            }}
            className="p-2 rounded border border-gray-300 w-full mt-1"
          />
        </div>
      </div>
    </div>
  );
};

export default Control;