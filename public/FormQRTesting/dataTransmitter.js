const form = document.getElementById("myForm");
const firstName = document.getElementById("name");
const lastName = document.getElementById("surname");
const venue = document.getElementById("venue");
const time = document.getElementById("time");
const date = document.getElementById("date");
const locationAdress = document.getElementById("location");
const uniqueID = document.getElementById("id");
const amountPaid = document.getElementById("amount");
const paymentMethod = document.getElementById("payment");
const transactionReferenceNum = document.getElementById("reference");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const firstNameValue = firstName.value;
  const lastNameValue = lastName.value;
  const venueValue = venue.value;
  const timeValue = time.value;
  const dateValue = date.value;
  const locationValue = locationAdress.value;
  const uniqueIDValue = uniqueID.value;
  const amountPaidValue = amountPaid.value;
  const paymentMethodValue = paymentMethod.value;
  const transactionReferenceNumValue = transactionReferenceNum.value;

  localStorage.setItem(
    "formDataObject",
    JSON.stringify([
      firstNameValue,
      lastNameValue,
      venueValue,
      timeValue,
      dateValue,
      locationValue,
      uniqueIDValue,
      amountPaidValue,
      paymentMethodValue,
      transactionReferenceNumValue,
    ])
  );
  window.location.href = "../GenerateQR/QRgen.html";
});
