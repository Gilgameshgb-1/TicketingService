const urlParams = new URLSearchParams(window.location.search);
const jsonData = urlParams.get("data");

// Parse the JSON data
const formData = JSON.parse(jsonData);
