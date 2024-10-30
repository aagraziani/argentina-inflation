const inflationButton = document.getElementById("inflationButton");
const baseURL = `https://api.bcra.gob.ar/estadisticas/v2.0/DatosVariable/27/`;
const divResponseData = document.getElementById("responseData");


inflationButton.addEventListener("click", () => {
  getData();
  showInfo();
});

function getData() {
  let fromDate = document.getElementById("fromDate").value;
  let toDate = document.getElementById("toDate").value;

  if (fromDate > toDate || fromDate == "" || toDate == "") {
    alert("Please enter valid dates");
    return;
  }

  fetch(`${baseURL}${fromDate}/${toDate}`)
    .then((data) => data.json())
    .then((data) => showInfo(data))
    .catch((error) => console.log("Error: ", error));
}

function showInfo(data) {
  divResponseData.innerHTML = "";
  let accumulatedInflation = 0;
  let tableHead = document.getElementById("tableHead");
  let tableBody = document.getElementById("tableBody");

  tableHead.createElement("tr");
  let tableElementDate = document.createElement("th");
  let tableElementValue = document.createElement("th");
  tableElementDate.textContent = "Date";
  tableElementValue.textContent = "Value";

  for (let i = 0; i < data.results.length; i++) {
    let date = data.results[i].fecha;
    let value = data.results[i].valor;
    date.textContent = date;
    value.textContent = value;

    accumulatedInflation += value;

    let tableRow = document.createElement("tr");
    let tableElementDate = document.createElement("td");
    let tableElementValue = document.createElement("td");

    tableElementDate.textContent = date;
    tableElementValue.textContent = value;

    tableRow.appendChild(tableElementDate);
    tableRow.appendChild(tableElementValue);
    tableBody.appendChild(tableRow);
  }

  let result = document.createElement("p");
  result.textContent = accumulatedInflation.toFixed(2);

  document.getElementById("responseData").appendChild(tableBody);
  document.getElementById("responseData").appendChild(result);
}
