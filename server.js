const express = require("express");
const app = express();
const fs = require("fs");

// Serve static files from the 'public' directory
app.use(express.static("public"));
app.use(express.json());

// Define the route to handle the form submission
// Require the form route
const formRoute = require("./routes/form");
app.use(formRoute);

app.post("/saveUserData", (req, res) => {
  const userData = req.body;

  let users = [];
  if (fs.existsSync("./public/database/users.json")) {
    const existingData = fs.readFileSync("./public/database/users.json");
    users = JSON.parse(existingData);
  }
  console.log(users);
  // Ensure users is an array
  if (!Array.isArray(users)) {
    users = [];
    console.log("UH OH THIS HAPPENED");
  }

  // Push the new user data
  users.push(userData);

  // Write updated data back to the file
  fs.writeFileSync(
    "./public/database/users.json",
    JSON.stringify(users, null, 2)
  );

  res.send("Data saved successfully.");
});

// Start the server
const port = 80;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
