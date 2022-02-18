// default map layer

let map = L.map("map", {
  layers: MQ.mapLayer(),
  center: [41.3111391, 69.2795927],
  zoom: 14,
});

function runDirections(start, end) {
    
  //recreating new map layer
  map = L.map("map", {
    layers: MQ.mapLayer(),
    center: [41.3111391, 69.2795927],
    zoom: 14,
  });

  let dir = MQ.routing.directions();

  dir.route({
    locations: [start, end],
  });

  CustomRouteLayer = MQ.Routing.RouteLayer.extend({
    createStartMarker: (location) => {
      var custom_icon;
      var marker;

      custom_icon = L.icon({
        iconUrl: "./img/mark.jpg",
        iconSize: [20, 29],
        iconAnchor: [10, 29],
        popupAnchor: [0, -29],
      });

      marker = L.marker(location.latLng, { icon: custom_icon }).addTo(map);

      return marker;
    },

    createEndMarker: (location) => {
      var custom_icon;
      var marker;

      custom_icon = L.icon({
        iconUrl: "./img/blue.png",
        iconSize: [20, 29],
        iconAnchor: [10, 29],
        popupAnchor: [0, -29],
      });

      marker = L.marker(location.latLng, { icon: custom_icon }).addTo(map);

      return marker;
    },
  });

  map.addLayer(
    new CustomRouteLayer({
      directions: dir,
      fitBounds: true,
    })
  );
}

//Function that runs when form submited
function submitForm(event) {
  event.preventDefault();

  // delete current map layer
  map.remove();

  //getting form data
  start = document.getElementById("start").value;
  end = document.getElementById("destination").value;

  //run directions function
  runDirections(start, end);

  //reset form
  document.getElementById("form").reset();
}

// asign the form to a form variable
const form = document.getElementById("form");

// call the submitForm function when submitting the form
form.addEventListener("submit", submitForm);
