let btn = document.querySelector(".button");
let qr_code_element = document.querySelector(".qr-code-png");
let qr_proprietary = document.querySelector(".qr-code");

document.addEventListener("DOMContentLoaded", () => {
  //console.log(document.querySelector("#input_text").value);
  const user_input = JSON.stringify(localStorage.getItem("formDataObject")); //document.querySelector("#input_text");
  console.log(user_input);
  // Step 1: Remove square brackets
  const formattedData = user_input.slice(1, -1);

  // Step 2: Remove backslashes
  const formattedDataWithoutQuotes = formattedData.replace(/\\"/g, "");

  // Step 3: Replace commas with newlines
  const finalFormattedData = formattedDataWithoutQuotes.replace(/,/g, "\n");

  console.log(finalFormattedData);

  if (user_input != "") {
    if (qr_code_element.childElementCount == 0) {
      generate(finalFormattedData);
    } else {
      qr_code_element.innerHTML = "";
      generate(finalFormattedData);
    }
  } else {
    console.log("not valid input");
    qr_code_element.style = "display: none";
  }
});

function generate(user_input) {
  qr_code_element.style = "";

  var qrcode = new QRCode(qr_code_element, {
    text: `${user_input}`,
    width: 180, //128
    height: 180,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });

  let brandLogo = document.createElement("img");
  brandLogo.src = "brand-logo.png";
  brandLogo.alt = "Brand Logo";
  brandLogo.classList.add("brand-logo");

  qr_proprietary.appendChild(brandLogo);

  let download = document.createElement("button");
  qr_proprietary.appendChild(download);

  let download_link = document.createElement("a");
  download.appendChild(download_link);
  download.style.marginBottom = "10px";
  console.log(download_link);
  download_link.setAttribute("download", "qr_code.png");
  download_link.innerHTML = `Download QR code <i class="fa-solid fa-download"></i>`;

  let qr_code_img = document.querySelector(".qr-code-png");
  let qr_code_canvas = document.querySelector("canvas");

  if (qr_code_img.getAttribute("src") == null) {
    setTimeout(() => {
      download_link.setAttribute("href", `${qr_code_canvas.toDataURL()}`);
    }, 300);
  } else {
    setTimeout(() => {
      download_link.setAttribute("href", `${qr_code_img.getAttribute("src")}`);
    }, 300);
  }

  let downloadPdfButton = document.createElement("button");
  downloadPdfButton.innerHTML = `Download PDF <i class="fa-solid fa-download"></i>`;
  qr_proprietary.appendChild(downloadPdfButton);

  downloadPdfButton.addEventListener("click", function () {
    let pdf = new jsPDF();
    pdf.text("QR Code", 10, 10);
    if (qr_code_img.getAttribute("src") == null) {
      pdf.addImage(qr_code_canvas.toDataURL(), "PNG", 10, 20, 180, 180);
    } else {
      pdf.addImage(qr_code_img.getAttribute("src"), "PNG", 10, 20, 180, 180);
    }
    pdf.save("qr_code.pdf");
  });
}

/* document.getElementById("downloadBtn").addEventListener("click", function () {
  // Retrieve the ticket data
  const ticketData = JSON.stringify(localStorage.getItem("formDataObject"));

  // Create a new jsPDF instance
  const doc = new jsPDF();

  // Set the content of the PDF
  doc.text("Ticket Data:", 10, 10);
  doc.text(ticketData, 10, 20);

  // Save the PDF as a file
  doc.save("ticket.pdf");
});
 */
