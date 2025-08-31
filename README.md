🌍 Earthquake Visualizer

An interactive web application to explore real-time earthquake activity worldwide using the USGS Earthquake API and Leaflet maps.

✨ Features

🔎 Search by Place (e.g., “California”)

⏱ Filter by Timeframe: Past Hour, Past Day, Past Week, 4.5+ Week

🌡 Filter by Magnitude (slider sets minimum magnitude threshold)

🗺 Interactive Map (powered by React-Leaflet)

Circle markers sized & color-coded by magnitude

Popup details: Location, Magnitude, Depth, Time

⚡ Real-Time Data from USGS Earthquake API

📱 Responsive UI (works on desktop and mobile)

🛡 Error Handling (loading state, API errors, no matches message)


🚀 Tech Stack

React (frontend framework)

React-Leaflet (map rendering)

TailwindCSS (styling)

USGS Earthquake GeoJSON API (data source)

📂 Project Structure
src/
 ├── components/
 │   ├── Control.jsx      # Filter controls (time, mag, search)
 │   └── Map.jsx          # Map rendering with markers & popups
 ├── App.jsx              # Main app logic (fetch + filtering)
 └── index.js             # Entry point

⚡ How to Run Locally

Clone this repo:

git clone https://github.com/Ishasheoran/Earthquake-visualizer.git
cd Earthquake-visualizer


Install dependencies:
npm install

Start the development server:
npm start

🌐 Deployment

This project is deployed on Vercel.
👉 Live Demo: https://earthquake-visualizer-1nc5.vercel.app/


👩‍💻 Author
Built by Isha as part of a UI Internship Take-Home Challenge.
