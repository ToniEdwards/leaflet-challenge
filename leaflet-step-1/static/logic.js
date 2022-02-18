 //Base Layer
var base = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
//Mapbox
var myMap = L.map("map",{
center: [39.73, -104.99],
zoom: 2,
layers: [base]
});

function buildMarkers() {
  //Data source
  var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"
  //Retrieve data
  d3.json(url).then((data) => {
    // console.log(data.metadata);
    var element = data.features;
    element.forEach(feature => {
      var magnitude = feature.properties.mag;
      var place = feature.properties.place;
      var coordinates = feature.geometry.coordinates;
      var lng = coordinates[0];
      var lat = coordinates[1];
      var depth = coordinates[2]
      //create the marker and add to map
      L.marker([lat, lng]).bindPopup("Magnitude: " + magnitude + "<br>Location: " + place).addTo(myMap);
    });
  });
 };

 buildMarkers();




