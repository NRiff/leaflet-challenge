// Creating Map Layer
var apiKey = "pk.eyJ1IjoibnJpZmYiLCJhIjoiY2thNHJldGhhMGJleTNmbnNqdmVhYW45MSJ9.HYqHPmd1jKL2rcIsyloy7A";

var myMap = L.map("map", {
    center: [35.00, -97.00],
    zoom: 6
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: apiKey
}).addTo(myMap);

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Setting up Color scheme for Different Magnitudes
d3.json( url , function(data) {
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: selectColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 1.5
    };
  }
  // Setting colors for the Different Magnitudes using differnt HEX colors
  function selectColor(magnitude) {
    switch (true) {
    case magnitude >= 5:
      return "#17136A";
    case magnitude >= 4:
      return "#1C1782";
    case magnitude >= 3:
      return "#221C9C";
    case magnitude >= 2:
      return "#504BBB";
    case magnitude >= 1:
      return "#5987FF";
    default:
      return "#599CFF";
    }
  }
  // Setting Size of rings relavent to the Size of the Magnitude
  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;}
    return magnitude * 4;
  }
// adding Geo Json Layer to Map
  L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },
    style: styleInfo,
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
  }).addTo(map);

  // Addin Ledger to Map
  var legend = L.control({
    position: "bottomright"
  });

  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");

    var grades = [0, 1, 2, 3, 4, 5];
    var colors = [
      "#599CFF",
      "#5987FF",
      "#504BBB",
      "#221C9C",
      "#1C1782",
      "#17136A"
    ];
  };

  legend.addTo(map);
});
