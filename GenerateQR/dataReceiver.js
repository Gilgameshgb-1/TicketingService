window.addEventListener("DOMContentLoaded", function () {
  var formData = localStorage.getItem("formData");
  if (formData) {
    var formObject = JSON.parse(formData);
    console.log(formObject); // Do something with the form data
  } else {
    console.log("No form data found");
  }

  localStorage.removeItem("formData"); // Optional: Clear the form data from localStorage
});
