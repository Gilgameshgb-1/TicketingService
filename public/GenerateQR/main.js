let btn = document.querySelector(".button");
let qr_code_element = document.querySelector(".qr-code");

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

  let download = document.createElement("button");
  qr_code_element.appendChild(download);

  let download_link = document.createElement("a");
  download_link.setAttribute("download", "qr_code.png");
  download_link.innerHTML = `Download <i class="fa-solid fa-download"></i>`;

  download.appendChild(download_link);

  let qr_code_img = document.querySelector(".qr-code img");
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
}
