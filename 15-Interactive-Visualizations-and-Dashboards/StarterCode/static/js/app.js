//line 1 sample will be id num coming in
// back tick js is f string in python
function buildMetadata(sample) {
  d3.json(`/metadata/${sample}`).then((sampleObj) => {
  var selector = d3.select("#sample-metadata");
  selector.html("");
//use object.entries will return an array of arrays of keys and values of objects to display in
//metadata and after conversion can apply forEach loop. 
  Object.entries(sampleObj).forEach(([key, value]) => {
        selector.append("h6").text(`${key}: ${value}`);
        });
 });
}
  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`

    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
// }

function buildCharts(sample) {
    // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(`/samples/${sample}`).then((sampleData) => {
    const otu_ids = sampleData.otu_ids;
    const otu_labels = sampleData.otu_labels;
    const sample_values = sampleData.sample_values;
    console.log(otu_ids,otu_labels,sample_values); 

    // @TODO: Build a Bubble Chart using the sample data
    var bubbleData = [{
      x: otu_ids,
      y: sample_values,
      mode: 'markers',
      marker: {
        // color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
        // opacity: [1, 0.8, 0.6, 0.4],
        size: sample_values,
        color: otu_ids,
        colorscale: "Earth"
      }
    }
  ];
    var bubbleLayout = {
      margin: { t: 0 },
      hovermode: "closest",
      xaxis: { title: "OTU ID" }
    };
      // showlegend: true,
      // height: 600,
      // width: 600
    // };
    
    Plotly.plot("bubble", bubbleData, bubbleLayout);


    // @TODO: Build a Pie Chart
    var pieData = [{
      values: sample_values.slice(0,10),
      labels: otu_ids.slice(0,10),
      hovertext: otu_labels.slice(0, 10),
      hoverinfo: "hovertext",
      type: "pie"
    }];
  
    var pieLayout = {
      margin: { t: 0, l: 0 },
    };

  
    Plotly.plot("pie", pieData, pieLayout);
  // }
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
// }
});
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  //api call to communicate to back end d3.json
  // the reason js works for language of net is bc synchronus code means will execute 
  // one line of code at time left to right and will not move on to next line until line
  //above finished. asynchrous will read line by line but with api call will send request 
  // and move on.. wont wait for response. idea of restuarant one waiter per 5 tables
  // a single waiter per table. js works like 5 tables per waiter... while waiting request
  //from back end will serve other tables. 
  //certain code do not want to execute until get response from back end.... 
  // sampleNames represents list we are pulling... then makes it wait to execute until
  // after get response from back end
  // sample names is coming and switching from list to array with language change
  //foreach is specific to arrays
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
