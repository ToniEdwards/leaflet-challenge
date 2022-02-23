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
//Build Markers function
function buildMarkers() { 
    //Data source
    var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"
    //Retrieve data
    d3.json(url).then((data) => {
    //   console.log(data);
    //Radius conditionals
    function getRadius(magnitude) {
        switch(true) {
          case magnitude > 15:
            return 80;
          case magnitude > 10:
            return 40;
          case magnitude > 5:
            return 20;
          case magnitude >= 0:
            return 10;
        }
       };
    //Color conditionals
    function getColor(depth) {
        switch(true) {
            case depth > 100:
                return "#bd0026";
            case depth > 50:
                return "#fd8d3c";
            case depth > 10:
                return "#fecc5c";
            case depth >= 0:
                return "#ffffb2";
            default:
              return "#a8ddb5";
        }
      };
    L.geoJson(data, {
        // We turn each feature into a circleMarker on the map.
        pointToLayer: function(feature, latlng) {
          return L.circleMarker(latlng, {
              stroke: false, 
              weight: 1,
              fill: true, 
              opacity: 1, 
              fillopacity: 1, 
              color: getColor(feature.geometry.coordinates[2]),
              radius: getRadius(feature.properties.mag)
            });
        },
        // We create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
        onEachFeature: function(feature, layer) {
          layer.bindPopup("Magnitude: "+ feature.properties.mag+ "<br>Depth: "+ feature.geometry.coordinates[2]+ "<br>Location: "+ feature.properties.place);
        }
      }).addTo(myMap);
    });
    var legend = L.control({
      position: "topright"
    });
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "earthquakes legend");
      var grades = [0, 10, 50, 100];
      var colors = [
        "#ffffb2",
        "#fecc5c",
        "#fd8d3c",
        "#bd0026"
      ];
      div.innerHTML = "<h4>Depth (km) of EarthQuake</h4>"
      for (var i = 0; i < grades.length; i++) {
        div.innerHTML += "<row style='background-color:" + colors[i] + "'/>"
        + grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
      }
      return div;
    };
    legend.addTo(myMap);
};
//Initiate buildMarkers function
buildMarkers();