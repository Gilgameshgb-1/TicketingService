// set map container element
const mapContainer = document.getElementById("map");

// create Leaflet map
const map = L.map(mapContainer);

// add OpenStreetMap tile layer to map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// set map center and zoom level
map.setView([51.505, -0.09], 13);

// // add a marker to the map
// L.marker([51.5, -0.09]).addTo(map);
