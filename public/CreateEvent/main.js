window.addEventListener("DOMContentLoaded", function () {
  //Initial values make as empty
  for (let i = 1; i <= 3; i++) {
    const nameInput = document.getElementById(`ticketName${i}`);
    const quantityInput = document.getElementById(`ticketQuantity${i}`);
    const priceInput = document.getElementById(`ticketPrice${i}`);
    nameInput.value = "";
    quantityInput.value = 0;
    priceInput.value = 0;
  }

  //Update the elements dynamically
  function updateRefreshingElement() {
    let numOfTicketsVal = 0;
    let cumulativePriceVal = 0;
    
    for (let i = 1; i<=3; i++){
    	const quantityInput = document.getElementById(`ticketQuantity${i}`);
    	const priceInput = document.getElementById(`ticketPrice${i}`);
    	
    	numOfTicketsVal += parseInt(quantityInput.value, 10);
    	cumulativePriceVal += parseInt(quantityInput.value, 10) * parseFloat(priceInput.value);
    }
  
    const totalTickets = document.getElementById('totalTickets');
    totalTickets.textContent = numOfTicketsVal;
    const cumulativePrice = document.getElementById('cumulativePrice');
    cumulativePrice.textContent = cumulativePriceVal;
  }
  setInterval(updateRefreshingElement, 200);

  // Function to process the form data
  function processForm() {
    // Pickup checkbox value
    const checkbox = document.getElementById('acceptToS');
  
    // Create an array to store the ticket information
    const tickets = [];

    // Loop through the form elements (ticketName1, ticketQuantity1, ticketPrice1, etc.)
    for (let i = 1; i <= 3; i++) {
      const nameInput = document.getElementById(`ticketName${i}`);
      const quantityInput = document.getElementById(`ticketQuantity${i}`);
      const priceInput = document.getElementById(`ticketPrice${i}`);

      const name = nameInput.value;
      const quantity = parseInt(quantityInput.value, 10);
      const price = parseFloat(priceInput.value);

      // Validate the input
      if (name && !isNaN(quantity) && !isNaN(price)) {
        // Create an object to represent the ticket
        const ticket = {
          name: name,
          quantity: quantity,
          price: price,
        };

        // Add the ticket to the array
        tickets.push(ticket);
      }
    }

    // Process the collected ticket data (you can replace this with your own logic)
    if (tickets.length > 0 && checkbox.checked) {
      console.log('Collected Ticket Information:');
      console.log(tickets);
      // Perform your processing here, needs to be implemented to save data regarding event in the .json file
      // ----------------------------------------------------------------------------------------------------
      // Array of tickets unpack + write in .json
      // Pick up name, pick up address
      // Time and date, event description and image upload
      // ----------------------------------------------------------------------------------------------------
    } else if(!checkbox.checked){
      console.log('You must agree to the ToS first.');
    }else{
      console.log('No valid ticket information provided.');
    }
  }

  // Add an event listener to a button (or any element) to trigger the form processing
  const confirmButton = document.getElementById('confirmButton');
  if (confirmButton) {
    confirmButton.addEventListener('click', processForm);
  }
});
