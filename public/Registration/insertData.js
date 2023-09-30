const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost:3306",
  user: "root",
  password: "",
  database: "ticketingservice",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

function insertData(name, surname, email, password, phoneNumber) {
  console.log("Hey you entered insertData function");
  const query =
    "INSERT INTO registration (name, surname, email, password, phone_number) VALUES (?, ?, ?, ?, ?)";
  const values = [name, surname, email, password, phoneNumber];

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error("Error inserting data:", error);
    } else {
      console.log("Data inserted successfully");
    }
  });
}

const submitButton = document.getElementById("submit-button");

submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const surname = document.getElementById("surname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const phoneNumber = document.getElementById("phone").value;

  // Call the insertData function with the form values
  insertData(name, surname, email, password, phoneNumber);
});
