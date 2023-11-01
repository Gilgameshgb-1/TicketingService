// set map container element

window.addEventListener("DOMContentLoaded", function () {
  const mapContainer = document.getElementById("map");
  console.log("map function entered");
  // create Leaflet map
  const map = L.map(mapContainer);

  // add OpenStreetMap tile layer to map
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // set map center and zoom level
  map.setView([43.871859259289316, 18.40950671364911], 15);

  var markerCoordinates = [43.871859259289316, 18.40950671364911];
  var marker = L.marker(markerCoordinates).addTo(map);
  marker.bindPopup("Dvorana Zetra").openPopup();

  // // add a marker to the map
  // L.marker([51.5, -0.09]).addTo(map);
});
