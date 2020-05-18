//setInterval(location.reload(),2000)
url = "data/samples.json"

// get data
d3.json(url).then(data => {
    samplesData = data.samples
    console.log("data", data)
    //console.log("samplesData", samplesData)

    //initial chart display
    var id = "940"
    plotHBarChart(id, samplesData)

    idList = data.names
    //console.log("idList", idList)
    dropDownList(idList)
})

// Plot the bar chart
function plotHBarChart(id, samplesData){

    //return the data corresponding to the id
    var idData = []
    samplesData.forEach(row => {
        if (row.id === id) {
            row.otu_ids.forEach((otu_id, i) => {
                idData[i] = {otu_id : String(otu_id), otu_label: row.otu_labels[i], sample_value : row.sample_values[i]}
            })
        }
    })


    //sort by sample values
    idData.sort(function (firstEl, secondEl){
        return secondEl.sample_value - firstEl.sample_value
    })

    //select just first 10 values
    var dataToPlot = []
    for (let i = 0; i < 10; i++) {
        dataToPlot[i] = idData[i]
    }

    // sort data to plot in descending order
    dataToPlot.sort(function (firstEl, secondEl){
        return firstEl.sample_value - secondEl.sample_value
    })
    // Plot Bar Chart
    var trace1 = {
        x: dataToPlot.map(item => item.sample_value),
        y: dataToPlot.map(item => "OTU ".concat(item.otu_id)),
        text: dataToPlot.map(item => item.otu_label),
        type: "bar",
        orientation: 'h'
    };
    
    var data = [trace1];
    var layout = {
        //title: "'Bar' Chart",
        xaxis: { 
            title: "sample values",
        },
    };
    Plotly.newPlot("bar", data, layout);

    //plot bubble chart
    var trace1 = {
        y: idData.map(item => item.sample_value),
        x: idData.map(item => item.otu_id),
        text: dataToPlot.map(item => item.otu_label),
        mode: 'markers',
        marker: {
          size: idData.map(item => item.sample_value),
          color: idData.map(item => item.otu_id)
        }
      };
      
      var data = [trace1];
      
      var layout = {
        //title: 'Marker Size',
        showlegend: false,
        xaxis: { 
            title: "OTU ID",
        },
      };
      Plotly.newPlot('bubble', data, layout);
      
}

//populate dropdown list
function dropDownList(list) {
    var selection = d3.select("#selDataset")
        .selectAll("option")
        .data(list)

    //console.log("list", list)
    selection.enter()       
        .append("option")
        .text(function(d) {
            return d;
        });
  }




//return value from dropdown
d3.select("#selDataset").on("change", function(){console.log(this.value)})