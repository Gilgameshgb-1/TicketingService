function signOut() {
  // Make an asynchronous request to the server-side logout endpoint
  fetch("/logout", {
    method: "POST", // Use the appropriate HTTP method
    credentials: "same-origin", // Include credentials (cookies) in the request
  })
    .then((response) => {
      if (response.ok) {
        // Logout was successful, update the UI or redirect the user
        alert("You've been logged out, redirecting to main page");
        setTimeout(function () {
          window.location.href = "../index.html"; //Redirection without warning back to index.html
        }, 2000);
      } else {
        // Handle error, maybe show a message to the user
        console.error("Logout failed");
      }
    })
    .catch((error) => {
      console.error("Error during logout:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  var isLoggedIn = false;
  var userLinksContainer = document.getElementById("userLinksContainer");
  const filePath = "../database/currentlogin.json";
  fetch(filePath)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // 'data' will be either true or false
      if (data.Username == "null" && data.Password == "null") {
        console.log("User is not logged in");
        flag = false;
        //alert("Please go back to home page and log in to purchase tickets!");
      } else {
        console.log("User is logged in!");
        flag = true;
      }
      if (flag === true) {
        //console.log("We are here");
        userLinksContainer.innerHTML =
          '<a href="#" onclick="signOut()">Sign Out</a>';
      } else {
        userLinksContainer.innerHTML = '<a href="login/login.html">Login</a>';
        userLinksContainer.innerHTML +=
          '<a href="Registration/signup.html">Register</a>';
      }
    });
});

function hello() {
  console.log("Hi");
}
