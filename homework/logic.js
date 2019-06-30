var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl, (data) =>{
  console.log(data)
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

let createFeatures = (earthquakeData) => {
// function createFeatures(earthquakeData) {
  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  let onEachFeature = (feature,layer) => {
  // function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }

  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: pointToLayer
  });

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}

//Colors for circles and legends
function getColor(m) {
    console.log(m);
    if(m > 5) {
        return "#FF5000"
    } else if (m > 4 ) {
        return "#FF8700"
    } else if (m > 3) {
        return "#FFA700" 
    } else if (m > 2) {
        return "#FFD900" 
    } else if (m > 1) {
        return "#FFFF00"       
    } else {
        return "#8CC715"
    }
  }
  
  // Create Circles with a light gray circumferance line!
  function pointToLayer(feature,latlng) {
      return new L.circle(latlng, {
          stroke: true,
          color: "red",
          weight: .5,
          fillOpacity: .6,
          fillColor: getColor(feature.properties.mag),
          radius:  feature.properties.mag * 30000
      })
  }


function createMap(earthquakes) {

   
  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

//Original code from exercise  
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 4,
    layers: [streetmap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);


var legend = L.control({ position: 'bottomright'});
  legend.onAdd = function() {
    var div = L.DomUtil.create('div', 'info legend'),
        magnitude = [0,1,2,3,4,5]; 

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < magnitude.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(magnitude[i] + 1) + '"></i> ' +
            magnitude[i] + (magnitude[i + 1] ? '&ndash;' + magnitude[i + 1] + '<br>' : '+');
    }

    return div;
};

  // Adding legend to the map
  legend.addTo(myMap);

}

