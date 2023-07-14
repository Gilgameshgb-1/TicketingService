const express = require("express");
const app = express();

// Serve static files from the 'public' directory
app.use(express.static("public"));
app.use(express.json());

// Define the route to handle the form submission
// Require the form route
const formRoute = require("./routes/form");
app.use(formRoute);

// Start the server
const port = 8081;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
