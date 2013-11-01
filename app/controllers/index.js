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

var locationCallback = function(e)
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
    
    
    
    //////API FOURSQUARE//////
    
    //Define a httpclient
	var xhrLocationCode = Ti.Network.createHTTPClient();
	xhrLocationCode.setTimeout(120000);
	 
	//var requestUrl = "http://maps.google.com/maps/api/geocode/json?address=" + txtAddress.value.replace(' ', '+');
	//requestUrl += "&sensor=" + (Ti.Geolocation.locationServicesEnabled == true);
	var url = "https://api.foursquare.com/v2/venues/search?&client_id=Z31E0WEHAJPEOHJNZIG0F4KIPZUUZ2KL1MX4LABOPUMTATSA&client_secret=YLXHU52D5AGTRRPZ0VK0ZRMIIZAJ0MZSTOGGYE4LADQZ3FOO&v=20131016&ll="+ latitude;
	url+= "," + longitude + "&radius=80";
	
	//If error occurs
	xhrLocationCode.onerror = function(e) {
		//TODO: code to handle error
		Ti.API.debug(e.error);
	   	alert('error2'+JSON.stringify(e.error));
	};
	 
	//On Success
	xhrLocationCode.onload = function(e) {
	 
		//Get the response
		Ti.API.info("Received text: " + this.responseText);
	    //alert('success1->'+JSON.stringify(this));
	    var venues=this.responseText.response.venues;
         for(var i=0;i<venues.length;i++){
         	//Define annotation to show location
			var objLocationAnnotation = Titanium.Map.createAnnotation({
				latitude: venues[i].location.lat,
				longitude: venues[i].location.lng,
				//title: txtAddress.value,
				//subtitle: 'My Place',
				//animate:true,
				//id: 1,
				pincolor: Titanium.Map.ANNOTATION_GREEN
			});
			
         	$.mapview.addAnnotation(objLocationAnnotation);
         }
		/*var response = JSON.parse(this.responseText);
		 
		//Check the response
		if (response.status == 'OK' && response.results != undefined && response.results.length > 0) {
		 
		//Define annotation to show location
		var objLocationAnnotation = Titanium.Map.createAnnotation({
		latitude: response.results[0].geometry.location.lat,
		longitude: response.results[0].geometry.location.lng,
		title: txtAddress.value,
		subtitle: 'My Place',
		animate:true,
		id: 1,
		pincolor: Titanium.Map.ANNOTATION_GREEN
		});
		mapview.addAnnotation(objLocationAnnotation);
		 
		objLocationAnnotation = null;
		}
		response = null;*/
	};
	
	xhrLocationCode.open("GET", url);
	 
	//Define the content type
	xhrLocationCode.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
	 
	//Send request
	xhrLocationCode.send();
	 
	 
    
	 
	 /*var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	         Ti.API.info("Received text: " + this.responseText);
	         alert('success1->'+JSON.stringify(this));
	         var venues=this.responseText.response.venues;
	         for(var i=0;i<venues.length;i++){
	         	//Define annotation to show location
				var objLocationAnnotation = Titanium.Map.createAnnotation({
					latitude: venues[i].location.lat,
					longitude: venues[i].location.lng,
					//title: txtAddress.value,
					//subtitle: 'My Place',
					//animate:true,
					//id: 1,
					pincolor: Titanium.Map.ANNOTATION_GREEN
				});
				
	         	$.mapview.addAnnotation(objLocationAnnotation);
	         }
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	         Ti.API.debug(e.error);
	         //alert('error2'+JSON.stringify(e.error));
	     },
	     timeout : 5000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("GET", url);
	 // Send the request.
	 client.send();*/
 
};
Titanium.Geolocation.addEventListener('location', locationCallback);

//$.index.open();
