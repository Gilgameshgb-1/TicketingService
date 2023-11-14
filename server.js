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

  //Check if email already exists
  const emailExists = users.some((user) => user.email === userData.email);

  console.log(emailExists);

  if (emailExists) {
    res.status(400).json({ success: false, message: "Email already exists." });
    //res.status(400).send("Email already exists."); // Send a bad request status and a message
  } else {
    // Push the new user data
    users.push(userData);

    // Write updated data back to the file
    fs.writeFileSync(
      "./public/database/users.json",
      JSON.stringify(users, null, 2)
    );

    res.send("Data saved successfully.");
  }
});

app.post("/loginDataResp", (req, res) => {
  const userData = req.body;
  console.log(userData);
  let users = [];
  if (fs.existsSync("./public/database/users.json")) {
    const existingData = fs.readFileSync("./public/database/users.json");
    users = JSON.parse(existingData);
  }

  //Verification
  let foundUser = null;

  users.forEach((user) => {
    if (
      user.email === userData.Username &&
      user.password === userData.Password
    ) {
      foundUser = user;
      return;
    }
  });

  if (foundUser) {
    console.log("User found:", foundUser);
  } else {
    console.log("User not found");
  }

  if (foundUser) {
    //Success, input current user
    fs.writeFileSync(
      "./public/database/currentlogin.json",
      JSON.stringify(userData, null, 2)
    );
    res.send("Data saved successfully.");
  } else {
    res.status(400).json({ success: false, message: "User isn't registered" });
  }
});

// Start the server
const port = 80;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
