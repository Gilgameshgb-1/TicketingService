// JavaScript to read and process the fragment identifier
window.addEventListener("DOMContentLoaded", function () {
  const mapContainer = document.getElementById("map");
  //("map function entered");
  // create Leaflet map
  const map = L.map(mapContainer);

  // add OpenStreetMap tile layer to map
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  var fragment = window.location.hash; // Get the fragment identifier
  if (fragment) {
    // Remove the leading '#' symbol
    fragment = fragment.substring(1);

    // The fragment now contains <numberOfEvent>
    var eventNumber = fragment;

    // You can use the value "eventName" as needed
    //console.log("Event Name: " + eventName);

    // Add image to dynamicImage tag in html ../database/Events/<EventIDName>.jpg
    //const imgUrl = "../database/Events/" + eventName + ".jpg";
    //const imgElement = document.getElementById("dynamicImage");

    //imgElement.src = imgUrl;
    // Specify the path to your JSON file
    const filePath = "../database/Events/events.json";

    fetch(filePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((jsonData) => {
        //console.log(jsonData.events[eventNumber]);
        const jsonDataParse = jsonData.events[eventNumber];
        //We update according to event .json

        //Update of image
        const imgUrl =
          "../database/Events/" + jsonDataParse.eventNumber + ".jpg";
        const imgElement = document.getElementById("dynamicImage");
        imgElement.src = imgUrl;

        //Update of event name
        const eventTitle = document.getElementById("eventTitle");
        eventTitle.textContent = jsonDataParse.concertName;

        //Update of map parameters
        const lat = jsonDataParse.location.latitude;
        const long = jsonDataParse.location.longitude;

        map.setView([lat, long], 15);

        var markerCoordinates = [lat, long];
        var marker = L.marker(markerCoordinates).addTo(map);
        marker.bindPopup(jsonDataParse.venueDetails.name).openPopup();
        //console.log(jsonDataParse.venueDetails.name);

        //Update of event description
        // Get the <p> element by its ID
        const paragraphElement = document.getElementById("eventDetails");

        // Set the text content
        paragraphElement.textContent = jsonDataParse.performerDetails;

        //Update of tickets
        // Get the <p> element by its ID
        const ticketType1 = document.getElementById("ticketType1");

        // Set the text content
        ticketType1.textContent = jsonDataParse.tickets[0].type;

        // Get the <p> element by its ID
        const ticketType2 = document.getElementById("ticketType2");

        // Set the text content
        ticketType2.textContent = jsonDataParse.tickets[1].type;

        // Get the <p> element by its ID
        const ticketType3 = document.getElementById("ticketType3");

        // Set the text content
        ticketType3.textContent = jsonDataParse.tickets[2].type;

        //Update of venue details
        const venueName = document.getElementById("venueName");
        const capacity = document.getElementById("capacity");
        const address = document.getElementById("address");
        const date = document.getElementById("date");
        const startTime = document.getElementById("startTime");

        venueName.textContent = jsonDataParse.venueDetails.name;
        capacity.textContent = jsonDataParse.venueDetails.capacity;
        address.textContent = jsonDataParse.venueDetails.address;
        date.textContent = jsonDataParse.date;
        startTime.textContent =
          jsonDataParse.startTime.hours +
          "h " +
          jsonDataParse.startTime.minutes +
          "m";
      })
      .catch((error) => {
        console.error("Error fetching JSON file:", error);
      });
  }
});

window.addEventListener("DOMContentLoaded", function () {
  const firstTTypeMinus = document.getElementById("firstTTypeMinus");
  const firstTTypeCnt = document.getElementById("firstTTypeCnt");
  const firstTTypePlus = document.getElementById("firstTTypePlus");

  const secondTTypeMinus = document.getElementById("secondTTypeMinus");
  const secondTTypeCnt = document.getElementById("secondTTypeCnt");
  const secondTTypePlus = document.getElementById("secondTTypePlus");

  const thirdTTypeMinus = document.getElementById("thirdTTypeMinus");
  const thirdTTypeCnt = document.getElementById("thirdTTypeCnt");
  const thirdTTypePlus = document.getElementById("thirdTTypePlus");

  firstTTypeMinus.addEventListener("click", function () {
    handleButtonClick("minus", firstTTypeCnt);
  });

  firstTTypePlus.addEventListener("click", function () {
    handleButtonClick("plus", firstTTypeCnt);
  });

  secondTTypeMinus.addEventListener("click", function () {
    handleButtonClick("minus", secondTTypeCnt);
  });

  secondTTypePlus.addEventListener("click", function () {
    handleButtonClick("plus", secondTTypeCnt);
  });

  thirdTTypeMinus.addEventListener("click", function () {
    handleButtonClick("minus", thirdTTypeCnt);
  });

  thirdTTypePlus.addEventListener("click", function () {
    handleButtonClick("plus", thirdTTypeCnt);
  });

  const goToPayment = document.getElementById("goto-payment-button");

  let priceTOne;
  let priceTTwo;
  let priceTThree;

  const filePath = "../database/Events/events.json";
  fetch(filePath)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((jsonData) => {
      var fragment = window.location.hash;
      fragment = fragment.substring(1);
      var eventNumber = fragment;
      priceTOne = jsonData.events[eventNumber].tickets[0].price;
      priceTTwo = jsonData.events[eventNumber].tickets[1].price;
      priceTThree = jsonData.events[eventNumber].tickets[2].price;
    });

  goToPayment.addEventListener("click", function () {
    const ttype1 = document.getElementById("ticketType1");
    const ttype2 = document.getElementById("ticketType2");
    const ttype3 = document.getElementById("ticketType3");
    console.log("Button clicked");
    var fragment = window.location.hash; // Get the fragment identifier
    fragment = fragment.substring(1);
    var eventNumber = fragment;

    window.location.href =
      "../Payment/Payment.html" +
      "#" +
      eventNumber +
      ttype1.textContent +
      firstTTypeCnt.textContent +
      " " +
      priceTOne +
      ttype2.textContent +
      secondTTypeCnt.textContent +
      " " +
      priceTTwo +
      ttype3.textContent +
      thirdTTypeCnt.textContent +
      " " +
      priceTThree;
  });
});

function handleButtonClick(action, element) {
  let count = parseInt(element.innerText, 10);

  if (action === "minus" && count > 0) {
    count--;
  } else if (action === "plus") {
    count++;
  }

  element.innerText = count;
}
