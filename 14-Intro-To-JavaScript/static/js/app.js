// from data.js
var table = data;

//Select table body
// var table = d3.select("tbody")
var populateTable = (tableData) => {
    for (i = 0; i < tableData.length; i++) {
        //tbody is a tag do nothing. if do . is class. if do # asking for id
        var tbody = d3.select("tbody")
        var row = tbody.append("tr")
        if ('datetime' in tableData[i]) {
            row.append('td').text(tableData[i].datetime)
        }
        if ('city' in tableData[i]) {
            row.append('td').text(tableData[i].city)
        }
        if ('state' in tableData[i]) {
            row.append('td').text(tableData[i].state)
        }
        if ('country' in tableData[i]) {
            row.append('td').text(tableData[i].country)
        }
        if ('shape' in tableData[i]) {
            row.append('td').text(tableData[i].shape)
        }
        if ('durationMinutes' in tableData[i]) {
            row.append('td').text(tableData[i].durationMinutes)
        }
        if ('comments' in tableData[i]) {
            row.append('td').text(tableData[i].comments)
        }
    }
}

populateTable(table);

tableContents = d3.select("tbody");

function clearTable() {
    tableContents.html("<tr></tr>");
}

var button = d3.select("#filter-btn")
button.on('click', () => {
    d3.event.preventDefault()
    // var date = d3.select('#datetime').property('value')
    clearTable();
    var userInput = d3.select("#datetime");
    filterDate = userInput.property("value");
    var filteredTable = table.filter(obj => obj.datetime === filterDate);
    populateTable(filteredTable);
})