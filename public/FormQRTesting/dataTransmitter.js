/* const form = document.getElementById("myForm"); // Replace with the actual form ID

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent default form submission

  const formData = new FormData(form); // Get form data

  try {
    const response = await fetch("/submit", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const jsonData = await response.json(); // Parse the JSON response
      // Redirect to the desired page
      window.location.href = "./GenerateQR/QRgen.html";
    }
  } catch (error) {
    console.error(error);
  }
});
 */
