//setInterval(location.reload(),2000)
url = "data/samples.json"

// get data
d3.json(url).then(data => {
    samplesData = data.samples
    console.log("samplesData", samplesData)

    //input from html (test value)
    var id = "940"

    plotHBarChart(id, samplesData)
})

// Plot the bar chart
function plotHBarChart(id, samplesData){

    //return the data corresponding to the id
    var idData = []
    samplesData.forEach(row => {
        //console.log("row", row)
        if (row.id === id) {
            //console.log("row.otu_ids", row.otu_ids)
            row.otu_ids.forEach((otu_id, i) => {
                console.log("otu_id, i, row[i]", otu_id, i, row.otu_labels[i])
                idData[i] = {otu_id : String(otu_id), otu_label: row.otu_labels[i], sample_value : row.sample_values[i]}
            })
            //idData = row}
        }
    })
    //console.log("idData", idData)


    //sort by sample values
    idData.sort(function (firstEl, secondEl){
        return secondEl.sample_value - firstEl.sample_value
    })
    //console.log("filteredIdData", idData.map(row => row.sample_value))

    //select just first 10 values
    var dataToPlot = []
    for (let i = 0; i < 10; i++) {
        dataToPlot[i] = idData[i]
    }
    // sort data to plot
    dataToPlot.sort(function (firstEl, secondEl){
        return firstEl.sample_value - secondEl.sample_value
    })

    //console.log("dataToPlot",dataToPlot)
    console.log(dataToPlot.map(item => item.otu_id))

    var trace1 = {
        x: dataToPlot.map(item => item.sample_value),
        y: dataToPlot.map(item => "OTU ".concat(item.otu_id)),
        text: dataToPlot.map(item => item.otu_label),
        type: "bar",
        orientation: 'h'
    };
    
    var data = [trace1];
    var layout = {
        title: "'Bar' Chart",
        xaxis: { 
            title: "sample values",
        },
    };
    Plotly.newPlot("bar", data, layout);
}

//Horrisontal bar chart

// var trace1 = {
//     y: ["beer", "wine", "martini", "margarita",
//       "ice tea", "rum & coke", "mai tai", "gin & tonic"],
//     x: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
//     type: "bar", //switch to "line" to make it line chart
//     orientation: 'h'
//   };
//   var data = [trace1];
//   var layout = {
//     title: "'Bar' Chart",
//     xaxis: { title: "Drinks"},
//     yaxis: { title: "% of Drinks Ordered"}
//   };
//   Plotly.newPlot("bar", data, layout);

// function sortObjectsByValue(objectID) {
//     console.log(objectID)
// }
// var numArray = [1, 2, 3];
// numArray.sort(function compareFunction(firstNum, secondNum) {
//   // resulting order is (3, 2, 1)
//   return secondNum - firstNum;
// });

// sortObjectsByValue(samplesData)