var eventNumber;
var modifiedString;
var ticketType1;
var ticketTQuant1;
var ticketTPrice1;
var ticketType2;
var ticketTQuant2;
var ticketTPrice2;
var ticketType3;
var ticketTQuant3;
var ticketTPrice3;

// set timer duration in minutes
const timerDuration = 15;

// set timer interval in milliseconds
const timerInterval = 1000;

// set timer start time
let timerStartTime = Date.now();

// set timer end time
let timerEndTime = timerStartTime + timerDuration * 60 * 1000;

// set timer display element
const timerDisplay = document.getElementById("time");

// set progress bar element
const progressBar = document.getElementById("progress-bar");

// update timer display and progress bar
function updateTimer() {
  // get current time
  const currentTime = Date.now();

  // calculate time remaining in seconds
  let timeRemaining = Math.round((timerEndTime - currentTime) / 1000);

  // calculate minutes remaining
  const minutesRemaining = Math.floor(timeRemaining / 60);

  // calculate seconds remaining
  const secondsRemaining = timeRemaining % 60;

  // format time remaining string
  let timeRemainingString = "";
  if (minutesRemaining < 10) {
    timeRemainingString += "0";
  }
  timeRemainingString += minutesRemaining + ":";
  if (secondsRemaining < 10) {
    timeRemainingString += "0";
  }
  timeRemainingString += secondsRemaining;

  // update timer display
  timerDisplay.innerHTML = "Remaining time: " + timeRemainingString;

  // update progress bar width
  const progressBarWidth =
    ((timerEndTime - currentTime) / (timerEndTime - timerStartTime)) * 100;
  progressBar.style.width = progressBarWidth + "%";
}

// start timer
setInterval(updateTimer, timerInterval);

document.addEventListener("DOMContentLoaded", function () {
  // Get references to the popup and overlay elements
  const popup = document.getElementById("popup");
  const overlay = document.getElementById("overlay");

  // Get references to the open and close buttons
  const openButton = document.getElementById("open-popup");
  const closeButton = document.getElementById("close-popup");

  // Function to open the popup
  function openPopup() {
    popup.style.display = "block";
    overlay.style.display = "block";
  }

  // Function to close the popup
  function closePopup() {
    popup.style.display = "none";
    overlay.style.display = "none";
  }

  // Attach click event handlers to the open and close buttons
  openButton.addEventListener("click", openPopup);
  closeButton.addEventListener("click", closePopup);
});

document.addEventListener("DOMContentLoaded", function () {
  const cardNumberInput = document.getElementById("card-number");

  function formatCardNumber(input) {
    let value = input.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (value.length > 16) {
      value = value.slice(0, 16); // Limit to 16 digits
    }
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1-"); // Insert dashes every 4 digits
    input.value = formattedValue;
  }

  cardNumberInput.addEventListener("input", function () {
    formatCardNumber(cardNumberInput);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const expirationDateInput = document.getElementById("expiration-date");

  // Function to validate the expiration date format
  function validateExpirationDate(input) {
    const value = input.value;
    const regex = /^(0[1-9]|1[0-2])\/\d{4}$/; // MM/YYYY format
    if (!regex.test(value)) {
      input.setCustomValidity(
        "Please enter a valid expiration date (MM/YYYY)."
      );
    } else {
      input.setCustomValidity(""); // Reset custom validation message
    }
  }

  expirationDateInput.addEventListener("input", function () {
    validateExpirationDate(expirationDateInput);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const addCardContainer = document.getElementById("add-card-container");
  const cardInfo = document.getElementById("card-info");
  const savedCardNumber = document.getElementById("saved-card-number");
  const savedCardholderName = document.getElementById("saved-cardholder-name");
  const savedExpirationDate = document.getElementById("saved-expiration-date");
  const completePurchaseButton = document.getElementById(
    "complete-purchase-button"
  );

  // Function to open the popup
  function openPopup() {
    document.getElementById("popup").style.display = "block";
    document.getElementById("overlay").style.display = "block";
  }

  // Function to close the popup
  function closePopup() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
  }

  // Function to hash and display the card number as "Card ending in: <last 4 digits>"
  function hashCardNumber(cardNumber) {
    const lastFourDigits = cardNumber.slice(-4);
    return "Card ending in: " + lastFourDigits;
  }

  // Function to handle the form submission
  function saveCardDetails(event) {
    event.preventDefault();

    // Get the input values from the form
    const cardNumber = document.getElementById("card-number").value;
    const cardholderName = document.getElementById("cardholder-name").value;
    const expirationDate = document.getElementById("expiration-date").value;

    // Update the card info elements
    savedCardNumber.textContent = hashCardNumber(cardNumber);
    savedCardholderName.textContent = cardholderName;
    savedExpirationDate.textContent = expirationDate;

    // Hide the add card container and show the card info
    addCardContainer.style.display = "none";
    cardInfo.style.display = "block";

    closePopup();
  }

  // Function to add ticket information to the list
  function addTicketInfo(type, quantity, price) {
    const listItem = document.createElement("li");
    listItem.textContent = `${type} ${quantity} ${price}`;
    ticketList.appendChild(listItem);
  }

  // Function to calculate the total amount and update the display
  function calculateTotal() {
    const items = ticketList.querySelectorAll("li");
    let total = 0;

    items.forEach((item) => {
      const parts = item.textContent.split(" ");
      if (parts.length === 4 && parts[3].startsWith("$")) {
        const quantity = parseInt(parts[2]);
        const price = parseFloat(parts[3].substring(1));
        total += quantity * price;
      }
    });

    totalAmount.textContent = `$${total.toFixed(2)}`;
  }

  // Add sample ticket information to the list
  //addTicketInfo("General Admission", 2, "$40.00");
  //addTicketInfo("VIP Pass", 1, "$75.00");

  //calculateTotal();

  // Attach click event handlers
  document.getElementById("open-popup").addEventListener("click", openPopup);
  document.getElementById("close-popup").addEventListener("click", closePopup);
  document
    .getElementById("card-form")
    .addEventListener("submit", saveCardDetails);

  function completePurchase() {
    // Check if card information has been inputted
    if (savedCardNumber.textContent.trim() !== "") {
      //Data needed
      /*       const url = window.location.href;
      const hashPart = url.split("#")[1];

      var match = hashPart.match(/^(\d+)/);

      //Parser for URL
      //---------------------------------------------------------------
      var eventNumber = match ? match[0] : "";
      var modifiedString = hashPart.replace(/^\d+/, "");
      [ticketType1, modifiedString] = separateTicketName(modifiedString);
      [ticketTQuant1, modifiedString] = separateTicketQuantity(modifiedString);
      [ticketTPrice1, modifiedString] = separateTicketPrice(modifiedString);
      [ticketType2, modifiedString] = separateTicketName(modifiedString);
      [ticketTQuant2, modifiedString] = separateTicketQuantity(modifiedString);
      [ticketTPrice2, modifiedString] = separateTicketPrice(modifiedString);
      [ticketType3, modifiedString] = separateTicketName(modifiedString);
      [ticketTQuant3, modifiedString] = separateTicketQuantity(modifiedString);
      ticketTPrice3 = separateLastTicketPrice(modifiedString); */

      //console.log(hashPart);

      fetch("http://localhost:80/finishPurchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventNumber: eventNumber,
          ticketT1: ticketType1,
          ticketTQ1: ticketTQuant1,
          ticketTP1: ticketTPrice1,
          ticketT2: ticketType2,
          ticketTQ2: ticketTQuant2,
          ticketTP2: ticketTPrice2,
          ticketT3: ticketType3,
          ticketTQ3: ticketTQuant3,
          ticketTP3: ticketTPrice3,
        }),
      })
        .then((response) => {
          //console.log(response.ok);
          if (response.ok === false) {
          } else {
            alert();
            //"Purchase successful. You will now be redirected to the reedem page for your tickets."
            setTimeout(function () {
              window.location.href = "../GenerateQR/QRgen.html"; //Redirection without warning back to index.html
            }, 2000);
          }
        })
        //        .then((data) => console.log(data))
        .catch((error) => console.error("Error:", error));
    } else {
      alert("Please enter card information first.");
    }
  }
  completePurchaseButton.addEventListener("click", completePurchase);
});

document.addEventListener("DOMContentLoaded", function () {
  const url = window.location.href;
  const hashPart = url.split("#")[1];

  var match = hashPart.match(/^(\d+)/);

  //Parser for URL
  eventNumber = match ? match[0] : "";
  var modifiedString = hashPart.replace(/^\d+/, "");
  [ticketType1, modifiedString] = separateTicketName(modifiedString);
  [ticketTQuant1, modifiedString] = separateTicketQuantity(modifiedString);
  [ticketTPrice1, modifiedString] = separateTicketPrice(modifiedString);
  [ticketType2, modifiedString] = separateTicketName(modifiedString);
  [ticketTQuant2, modifiedString] = separateTicketQuantity(modifiedString);
  [ticketTPrice2, modifiedString] = separateTicketPrice(modifiedString);
  [ticketType3, modifiedString] = separateTicketName(modifiedString);
  [ticketTQuant3, modifiedString] = separateTicketQuantity(modifiedString);
  ticketTPrice3 = separateLastTicketPrice(modifiedString);
  //---------------------------------------------------------------
  const eventNum = eventNumber;
  const ticketOne = ticketType1;
  const ticketTwo = ticketType2;
  const ticketThree = ticketType3;

  addTicketInfo(ticketOne, ticketTQuant1, ticketTPrice1);
  addTicketInfo(ticketTwo, ticketTQuant2, ticketTPrice2);
  addTicketInfo(ticketThree, ticketTQuant3, ticketTPrice3);
  //console.log(eventNum);

  //Dynamic update of all info needs to be made
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
      const imgUrl = "../database/Events/" + jsonDataParse.eventNumber + ".jpg";
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

      //Update of date, time and venue name
      const eventDetails = document.getElementById("eventDetails");
      const venueName = jsonDataParse.venueDetails.name;
      const dateOfEvent = jsonDataParse.date;
      const timeOfEvent =
        jsonDataParse.startTime.hours +
        ":" +
        jsonDataParse.startTime.minutes +
        "h";
      eventDetails.textContent =
        dateOfEvent + ", " + timeOfEvent + ", " + venueName;
    });

  calculateTotal();
});

const ticketList = document.getElementById("ticket-list");
const totalAmount = document.getElementById("total-amount");

// Function to add ticket information to the list
function addTicketInfo(type, quantity, price) {
  const listItem = document.createElement("li");
  listItem.textContent = `${type} ${quantity} ${price}`;
  ticketList.appendChild(listItem);
}

// Function to calculate the total amount and update the display
function calculateTotal() {
  //console.log("Calculate Total function entered");
  const items = ticketList.querySelectorAll("li");
  let total = 0;

  items.forEach((item) => {
    const parts = item.textContent.split(" ");
    //console.log(parts);
    if (parts.length == 4) {
      total += parts[2] * parts[3];
    } else if (parts.length == 6) {
      total += parts[4] * parts[5];
    } else if (parts.length == 5) {
      total += parts[3] * parts[4];
    } else {
      total += parts[1] * parts[2];
    }
  });

  totalAmount.textContent = `$${total.toFixed(2)}`;
}

function separateTicketName(modifiedString) {
  let ticketType1 = "";
  let slice = -1;

  for (let i = 0; i < modifiedString.length; i++) {
    if (
      modifiedString[i] == "%" &&
      modifiedString[i + 1] == "2" &&
      modifiedString[i + 2] == "0"
    ) {
    } else if (
      modifiedString[i - 1] == "%" &&
      modifiedString[i] == "2" &&
      modifiedString[i + 1] == "0"
    ) {
    } else if (
      modifiedString[i - 2] == "%" &&
      modifiedString[i - 1] == "2" &&
      modifiedString[i] == "0"
    ) {
      ticketType1 += " ";
    } else if (modifiedString[i] >= 0) {
      slice = i;
      break;
    } else {
      ticketType1 += modifiedString[i];
    }
  }
  slicedString = modifiedString.slice(slice);
  //console.log(slicedString);
  return [ticketType1, slicedString];
}

function separateTicketQuantity(inputString) {
  // Use regular expression to match the first number before 'g' and capture the index of 'g'
  const regex = /(\d+)g/;
  const match = inputString.match(regex);

  // Extract the number and index from the match
  const numberBeforeG = match ? match[1] : null;
  const indexOfG = match ? match.index + numberBeforeG.length : null;

  slicedString = inputString.slice(indexOfG);

  return [numberBeforeG, slicedString];
}

function isCharNumber(char) {
  // Use parseFloat for decimal numbers, parseInt for integers
  return !isNaN(parseFloat(char)) && isFinite(char);
}

function separateTicketPrice(inputString) {
  let ticketPrice1 = 0;
  let slice = -1;
  for (let i = 0; i < inputString.length; i++) {
    if (inputString[i] == "g") {
    } else if (!isCharNumber(inputString[i])) {
      slice = i;
      break;
    } else {
      ticketPrice1 = ticketPrice1 * 10 + parseInt(inputString[i]);
    }
  }

  slicedString = inputString.slice(slice);
  //console.log(ticketPrice1);
  return [ticketPrice1, slicedString];
}

function separateLastTicketPrice(inputString) {
  inputString = inputString.slice(1);
  return parseInt(inputString);
}
