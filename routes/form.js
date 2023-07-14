const express = require("express");
const router = express.Router();

router.post("/submit", (req, res) => {
  // Access the submitted form data using req.body
  const formData = req.body;

  // Process the form data as needed

  // Redirect to the desired page
  //res.json(formData);
  const jsonData = JSON.stringify(formData);
  res.redirect("./GenerateQR/QRgen.html?data=${jsonData}");
});

module.exports = router;
