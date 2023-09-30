//const fs = require("fs");

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const notificationDiv = document.getElementById("notification");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Convert to JSON and log to console
    const jsonData = JSON.stringify(data, null, 2);
    console.log(jsonData);

    // Send data to the server
    fetch("http://localhost:80/saveUserData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      //.then((response) => response.text())
      .then((response) => {
        console.log(response.ok);
        if (response.ok === false) {
          notificationDiv.innerText = "This email is already registered!";
        } else {
          notificationDiv.innerText = "";
        }
      })
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  });
});
