// JavaScript to read and process the fragment identifier
window.addEventListener("DOMContentLoaded", function () {
  var fragment = window.location.hash; // Get the fragment identifier
  if (fragment) {
    // Remove the leading '#' symbol
    fragment = fragment.substring(1);

    // The fragment now contains "event1"
    var eventName = fragment;

    // You can use the value "eventName" as needed
    console.log("Event Name: " + eventName);

    // Add image to dynamicImage tag in html ../database/Events/<EventIDName>.jpg
    const imgUrl = "../database/Events/" + eventName + ".jpg";
    const imgElement = document.getElementById("dynamicImage");

    imgElement.src = imgUrl;
  }
});
