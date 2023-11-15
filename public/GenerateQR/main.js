let btn = document.querySelector(".button");
let qr_code_element = document.querySelector(".qr-code-png");
let page_logo_brand = document.querySelector(".brand-logo");
let qr_proprietary = document.querySelector(".qr-code");
let userData = null;
let paymentData = null;
let finalData = null;

document.addEventListener("DOMContentLoaded", () => {
  //console.log(document.querySelector("#input_text").value);
  const fetchUserData = fetch("http://localhost:80/readUserData", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((user) => {
      //console.log(user);
      userData = JSON.stringify(user);
      //console.log(userData);
    });

  const fetchPaymentData = fetch("http://localhost:80/readPaymentData", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((payment) => {
      //console.log(payment);
      paymentData = JSON.stringify(payment);
      //console.log(paymentData);
    });

  //const user_input = JSON.stringify(localStorage.getItem("formDataObject")); //document.querySelector("#input_text");
  //const user_input = JSON.stringify()
  //console.log(user_input);
  // Step 1: Remove square brackets
  Promise.all([fetchUserData, fetchPaymentData]).then(() => {
    jsonUserData = JSON.parse(userData);
    userData = removeNthEntry(jsonUserData, 3);
    userData = JSON.stringify(userData);
    //console.log(userData);
    finalData = userData + "\n" + paymentData;
    //console.log("String final: ", finalData);

    const formattedData = finalData.slice(1, -1);
    //console.log(formattedData);

    // Step 2: Remove backslashes
    const formattedDataWithoutQuotes = formattedData.replace(/\\"/g, "");

    // Step 3: Replace commas with newlines
    const finalFormattedData = formattedDataWithoutQuotes.replace(/,/g, "\n");

    //console.log(finalFormattedData);

    if (finalData != "") {
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
});

function generate(finalData) {
  qr_code_element.style = "";

  var qrcode = new QRCode(qr_code_element, {
    text: `${finalData}`,
    width: 180, //128
    height: 180,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });

  let brandLogo = document.createElement("img");
  brandLogo.src = "brand-logo.svg";
  brandLogo.alt = "Brand Logo";
  brandLogo.classList.add("brand-logo");

  page_logo_brand.appendChild(brandLogo);

  let download = document.createElement("button");
  qr_proprietary.appendChild(download);

  let download_link = document.createElement("a");
  download.appendChild(download_link);
  download.style.marginBottom = "10px";
  download_link.setAttribute("download", "qr_code.png");
  download_link.style.color = "white";
  download_link.innerHTML = `Download QR code`;
  download.classList.add("download-button");

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
  downloadPdfButton.classList.add("download-button");
  qr_proprietary.appendChild(downloadPdfButton);

  downloadPdfButton.addEventListener("click", function () {
    //console.log("Not fully functional yet!");
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

    //const finalData = ; //document.querySelector("#input_text");
    //console.log();
    finalData = JSON.parse(JSON.stringify(finalData));
    let arrOfStrings = [];
    let tmpStr = "";
    for (let i = 0; i < finalData.length; i++) {
      if (finalData[i] != "\n") {
        tmpStr += finalData[i];
      } else {
        //console.log(tmpStr);
        arrOfStrings.push(tmpStr);
        tmpStr = "";
      }
    }

    let updatedArrOfStrings = [];
    for (let i = 0; i < arrOfStrings.length; i++) {
      let part = arrOfStrings[i].split(":");
      //console.log(part[1]);
      if (i === 3) {
        //part = part.replace("}", "");
      }
      updatedArrOfStrings.push(part[1]);
    }
    console.log(updatedArrOfStrings);

    arrOfInfo = [
      updatedArrOfStrings[0],
      updatedArrOfStrings[1],
      "TmpLocation",
      "TmpEventName",
      updatedArrOfStrings[5] + " " + updatedArrOfStrings[6],
      updatedArrOfStrings[8] + " " + updatedArrOfStrings[9],
      updatedArrOfStrings[11] + " " + updatedArrOfStrings[12],
    ];

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(12);

    const arrOfFields = [
      "Name: ",
      "Surname: ",
      "Location: ",
      "Event name: ",
      "Ticket type/Quantity: ",
      "Ticket type/Quantity: ",
      "Ticket type/Quantity: ",
    ];

    for (let i = 0; i < 7; i++) {
      console.log(arrOfFields[i] + arrOfInfo[i]);
      doc.text(arrOfFields[i] + arrOfInfo[i], 10, 100 + i * 5);
    }

    const name = doc.save("qr_code.pdf");
  });
}

function removeNthEntry(userData, n) {
  const userDataArray = Object.entries(userData);

  if (n >= 0 && n < userDataArray.length) {
    userDataArray.splice(n, 1);
  } else {
    console.error("Invalid index:", n);
    return userData; // Return the original userData if the index is invalid
  }

  return Object.fromEntries(userDataArray);
}
