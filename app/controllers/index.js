function doClick(e) {
    //alert($.label.text);
}
/////CURRENT LOCATION/////

var longitude;
var latitude;
 
Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
Titanium.Geolocation.distanceFilter = 10;
Titanium.Geolocation.getCurrentPosition(function(e)
{
    if (!e.success || e.error)
    {
        alert('error ' + JSON.stringify(e.error));
        return;
    }
    longitude = e.coords.longitude;
    latitude = e.coords.latitude;
    var altitude = e.coords.altitude;
    var heading = e.coords.heading;
    var accuracy = e.coords.accuracy;
    var speed = e.coords.speed;
    var timestamp = e.coords.timestamp;
    var altitudeAccuracy = e.coords.altitudeAccuracy;
});
 alert(longitude);
/*var locationCallback = function(e)
{
    if (!e.success || e.error)
    {
        return;
    }
 
    var longitude = e.coords.longitude;
    var latitude = e.coords.latitude;
    var altitude = e.coords.altitude;
    var heading = e.coords.heading;
    var accuracy = e.coords.accuracy;
    var speed = e.coords.speed;
    var timestamp = e.coords.timestamp;
    var altitudeAccuracy = e.coords.altitudeAccuracy;
 
    setTimeout(function()
    {
 
    },100);
 
    // reverse geo
    Titanium.Geolocation.reverseGeocoder(latitude,longitude,function(evt)
    {
        if (evt.success) {
            var places = evt.places;
            if (places && places.length) {
                //reverseGeo.text = places[0].address;
                var place = places[0].address;
                alert("Current location "+place);
            } else {
                //reverseGeo.text = "No address found";
                alert("No address found");
            }
            //Ti.API.debug("reverse geolocation result = "+JSON.stringify(evt));
        }
        else {              
        }
    });
 
};
Titanium.Geolocation.addEventListener('location', locationCallback);*/



//////API FOURSQUARE//////



 /*var url = "https://api.foursquare.com/v2/venues/search?client_id=Z31E0WEHAJPEOHJNZIG0F4KIPZUUZ2KL1MX4LABOPUMTATSA&client_secret=YLXHU52D5AGTRRPZ0VK0ZRMIIZAJ0MZSTOGGYE4LADQZ3FOO&v=20130815&ll=40.7,-74&query=sushi";
 var client = Ti.Network.createHTTPClient({
     // function called when the response data is available
     onload : function(e) {
         Ti.API.info("Received text: " + this.responseText);
         alert('success'+this.responseText);
     },
     // function called when an error occurs, including a timeout
     onerror : function(e) {
         Ti.API.debug(e.error);
         alert('error');
     },
     timeout : 5000  // in milliseconds
 });
 // Prepare the connection.
 client.open("GET", url);
 // Send the request.
 client.send();*/

$.index.open();
