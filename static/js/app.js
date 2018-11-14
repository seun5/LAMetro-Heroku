// Declare Global Variables
var map, bounds, infoWindow, markers;

// Metro_lane Model 
var Metro_Lane = function (data){
  //Ex) "Metro Blue Line (801)"
  //Since Metro is repetitive, and 801 is not useful to end-user, I parsed the information for cleaner display
  var sub = data.display_name.substring(6).match(/(.+)\s\(/)[1];
  this.title = sub;
  this.id = data.id
  this.color = id_color[data.id];


  //Kept this seperate from locations, because it needs to in a sequential order
  this.visualize = function(id) {
    var sequence_url = 'http://api.metro.net/agencies/lametro-rail/routes/' + id +'/sequence';
    if(metro_sequence[id] ===undefined) {

    $.ajax({
      url: sequence_url,
      dataType:'jsonp',
      error: function(){
        // If error in callback return message
      },
      complete: function(response, error){
        sequence = []
        ans = response.responseJSON.items
        for (var i =0; i<ans.length; i++){

          point = ans[i]
          position = new google.maps.LatLng(point.latitude, point.longitude);

          sequence.push(position);

        }
        metro_sequence[id] = sequence;
        var flightPath = new google.maps.Polyline({
          map: map,
          path: metro_sequence[id],
          strokeColor: id_color[id],
          strokeWeight: 5
        });
        
        } 
      })
    }
  }
}




// Location is an Observable 
var Location = function (data) {
  self = this
  this.title = data.title;
  this.lat = data.lat;
  this.long = data.lng;
  this.id = data.id;
  this.route_id = route_identifier(data.id)
  this.color = id_color[this.route_id];
  this.visible = ko.observable(true);


  var colored_icon = makeMarkerIcon(this.color);



  position = new google.maps.LatLng(data.lat, data.lng);
  this.marker = new google.maps.Marker({
   title: data.title,
   position: position,

   map: map,
   icon: colored_icon
  });
  markers.push(this.marker);




  this.marker.addListener('click', function() {
    smoothZoom(map, 17,map.zoom)
    // map.setZoom(17);
    map.panTo(this.position);
    populateInfoWindow(this, infoWindow, data.id);

  });
  bounds.extend(this.marker.position);



  map.fitBounds(bounds);


  this.show = function(Location) {
    google.maps.event.trigger(this.marker, 'click');

  };






};



var ViewModel = function(){
    

  var self = this;

  // Used dictionary function to identify duplicates and not include them in our Location model.
  var remove_duplicates = {}
  this.metros = ko.observableArray()
  for(var i =0; i<metros.length;i++ ){
    if(remove_duplicates[metros[i].id]===undefined) { 
      remove_duplicates[metros[i].id] = 1
      this.metros.push(new Location(metros[i]));
    }
  }
  
  this.lanes = ko.observableArray(lanes.map(function (lane) {
    return new Metro_Lane(lane);
  }));


  // Sort Metro by ID
  this.metros.sort(function (left, right) {
    return left.id == right.id ? 0 : (left.id < right.id ? -1 : 1)
  });


}







// Adapted from the Maps Tutorial in Udacity
// This function takes in a COLOR, and then creates a new marker
// icon of that color. The icon will be 21 px wide by 34 high, have an origin
// of 0, 0 and be anchored at 10, 34).
function makeMarkerIcon(markerColor) {
  // Need to remove the # from hex color string before puting it into MarkerImage function
  markerColor = markerColor.substring(1);
  var markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
    '|40|_|%E2%80%A2',
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(21,34));
  return markerImage;
}

//Used the Map Tutorial Example
function populateInfoWindow(marker, infowindow, id) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
      var route_URL = 'http://api.metro.net/agencies/lametro-rail/stops/' + id +'/routes';
      var ansString = ''
      //  AJAX calls to see which routes are available for the station, JSONP is required as CORS is not enabled
      $.ajax({
        url: route_URL,
        dataType:'jsonp',
        error: function(){
          // If error in callback return message
          ansString += '<span >Metro API had failed to load</span>'
        },
        success: function(response, error){
            ans = response.items
            ansString = '<span ><img id="lametro_logo" style="margin-right: 3px" src="static/logo.png"></img></span>'
            for(var i=0; i<ans.length; i++){
              route = ans[i].id;
              name =  ans[i].display_name.match(/(.+)\s\(/)[1];
              color = id_color[route]
              link = "'https://media.metro.net/riding_metro/bus_overview/images/"+ route + ".pdf'"
              ansString += '<span><a href='+link +'class="btn btn-sm infowindow" style='+'background-color:'+color +';>' + name + '</a></span>';
            }
            infowindow.marker = marker; 
            infowindow.setContent('<h4>' + marker.title + '</h4><hr>' + ansString);  
          }
      })
      infowindow.open(map, marker);

      // Make sure the marker property is cleared if the infowindow is closed. 
      infowindow.addListener('closeclick',function(){
        infowindow.setMarker = null;
        // When Info window is closed, goes back to whole map
        map.fitBounds(bounds);

      });

    }
  }

//https://stackoverflow.com/questions/4752340/how-to-zoom-in-smoothly-on-a-marker-in-google-maps
function smoothZoom (map, max, cnt) {
    if (cnt >= max) {
        return;
    }
    else {
        z = google.maps.event.addListener(map, 'zoom_changed', function(event){
            google.maps.event.removeListener(z);
            smoothZoom(map, max, cnt + 1);
        });
        setTimeout(function(){map.setZoom(cnt)}, 80); 
    }
}  




function initMap() {
  var LA = {
    lat: 34.0522,
    lng: -118.2437
  };
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: LA,
    mapTypeControl: false,
    styles: map_design
  });

  //If you change window size, adjust bounds
  google.maps.event.addDomListener(window, "resize", function() {
        map.fitBounds(bounds);
  });


  // If too zoomed out, do not make marker visible
  google.maps.event.addListener(map, 'zoom_changed', function() {
      var zoom = map.getZoom();
      for (i = 0; i < markers.length; i++) {
          markers[i].setVisible(zoom >= 10);
      }
  });


  infoWindow = new google.maps.InfoWindow();
  bounds = new google.maps.LatLngBounds();

  markers = []
  metro_sequence ={}




  ko.applyBindings(new ViewModel());
 }





