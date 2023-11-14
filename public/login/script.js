document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  /*   if (form) {
    console.log("Form found:", form);
  } else {
    console.log("Form not found");
  } */

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission
    const formData = new FormData(form);
    const data = {};
    if (formData.has("Username") && formData.has("Password")) {
      formData.forEach((value, key) => {
        data[key] = value;
      });
      //console.log("The data is: ", jsonData);
    } else {
      console.log("Form data is empty. Please enter username and password.");
    }
    const jsonData = JSON.stringify(data, null, 2);
    console.log(jsonData);
    fetch("http://localhost:80/loginDataResp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    })
      .then((response) => {
        console.log(response.ok);
        if (response.ok === false) {
          //notificationDiv.innerText = "This email is already registered!";
        } else {
          //notificationDiv.innerText = "";
          alert(
            "Registration successful. You will now be redirected to the homepage."
          );
          setTimeout(function () {
            window.location.href = "../index.html"; //Redirection without warning back to index.html
          }, 2000);
        }
      })
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  });
});
