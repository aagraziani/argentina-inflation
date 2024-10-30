let inflationButton = document.getElementById("inflationButton");
let clearButton = document.getElementById("clearButton");
let baseURL = `https://api.bcra.gob.ar/estadisticas/v2.0/DatosVariable/27/`;
let divResponseData = document.getElementById("responseData");
let inflationTable = document.getElementById("inflationTable");
let tableHead = document.getElementById("tableHead");
let tableBody = document.getElementById("tableBody");
let fromDate = document.getElementById("fromDate");
let toDate = document.getElementById("toDate");

// get the data from the BCRA API and validate the dates
function getData() {

    fromDate = document.getElementById("fromDate").value;
    toDate = document.getElementById("toDate").value;

    if (fromDate > toDate || fromDate == "" || toDate == "") {
        alert("Please enter valid dates");
        return;
    }
    
    fetch(`${baseURL}${fromDate}/${toDate}`)
        .then((data) => data.json())
        .then((data) => renderData(data))
        .catch((error) => console.log("Error: ", error));
}

// render the data, inflation table and accumulated inflation
function renderData(data) {
    
    let accumulatedInflation = 0;
   
    // create the table head and body
    let tableHead = document.createElement("tr");
    let tableElementDate = document.createElement("th");
    let tableElementValue = document.createElement("th");
    tableElementDate.textContent = "Date";
    tableElementValue.textContent = "Value";
    tableHead.appendChild(tableElementDate);
    tableHead.appendChild(tableElementValue);
    inflationTable.appendChild(tableHead);

    // creates the tbody and adds a tr and two td using a for loop for the array of data
    let tableBody = document.createElement("tbody");
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

    // appends the table body to the inflation table
    inflationTable.appendChild(tableBody);

    // appends the accumulated inflation to the div
    let accumulatedInflationElement = document.createElement("p");
    accumulatedInflationElement.textContent = `Accumulated inflation: ${accumulatedInflation.toFixed(2)}%`;
    divResponseData.appendChild(accumulatedInflationElement);

}

// clear the data and the inflation table
function clearData() {
    divResponseData.innerHTML = "";
    inflationTable.innerHTML = "";
    document.getElementById("fromDate").value = '';
    document.getElementById("toDate").value = '';
}