// Function to handle form submission
function handleFormSubmission(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Get form data
  var formData = new FormData(event.target);

  // Convert form data to JSON object
  var formObject = {};
  formData.forEach(function (value, key) {
    formObject[key] = value;
  });

  // Save form data to localStorage
  localStorage.setItem("formData", JSON.stringify(formObject));

  // Redirect to the other page
  window.location.href = "../GenerateQR/QRGen.html";
  console.log("Redirection code executed");
}

function isLocalStorageEnabled() {
  try {
    var testKey = "test";
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

// Add form submission event listener
var form = document.getElementById("myForm");
form.addEventListener("submit", handleFormSubmission);
