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
  download_link.innerHTML = `Download QR code`;

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
  downloadPdfButton.innerHTML = `Download PDF`;
  qr_proprietary.appendChild(downloadPdfButton);

  downloadPdfButton.addEventListener("click", function () {
    console.log("Not fully functional yet!");
    window.jsPDF = window.jspdf.jsPDF;
    const doc = new jsPDF();

    doc.text("Events.ba", 10, 10);
    if (qr_code_img.getAttribute("src") == null) {
      doc.addImage(qr_code_canvas.toDataURL(), "PNG", 10, 20, 50, 50);
    } else {
      doc.addImage(qr_code_img.getAttribute("src"), "PNG", 10, 20, 50, 50);
    }

    const infoText = "Ticket information";
    /*     const infoDetails =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit."; */

    // Set the font and size for the information text
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(14);
    doc.text(infoText, 10, 90);

    // Picking up data, writing in .pdf ticket

    const user_input = JSON.parse(localStorage.getItem("formDataObject")); //document.querySelector("#input_text");

    arrOfInfo = [
      user_input[0],
      user_input[1],
      user_input[2],
      user_input[3] + " " + user_input[4],
      user_input[5],
      user_input[6],
      user_input[7],
      user_input[8],
      user_input[9],
    ];

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(12);

    const arrOfFields = [
      "Name: ",
      "Surname: ",
      "Location: ",
      "Time and Date: ",
      "Address: ",
      "User ID: ",
      "paidAmount: ",
      "paymentType: ",
      "transactionNumber: ",
    ];

    for (let i = 0; i < 9; i++) {
      doc.text(arrOfFields[i] + arrOfInfo[i], 10, 100 + i * 5);
    }

    // Set the font and size for the information details
    /*     doc.setFont("Helvetica", "normal");
    doc.setFontSize(12);
    doc.text(infoDetails, 10, 130); */

    const name = doc.save("qr_code.pdf");
  });
}
