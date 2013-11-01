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
	 
	var url = "https://api.foursquare.com/v2/venues/search?&client_id=Z31E0WEHAJPEOHJNZIG0F4KIPZUUZ2KL1MX4LABOPUMTATSA&client_secret=YLXHU52D5AGTRRPZ0VK0ZRMIIZAJ0MZSTOGGYE4LADQZ3FOO&v=20131016&ll="+ latitude;
	url+= "," + longitude + "&radius=80&limit=5";
	
	//If error occurs
	xhrLocationCode.onerror = function(e) {
		//TODO: code to handle error
		Ti.API.debug("hola>"+e.error);
	   	alert('error2'+JSON.stringify(e.error));
	};
	 
	//On Success
	xhrLocationCode.onload = function(e) {
	 
		//Get the response
		Ti.API.info("Received text: " + this.responseText);
	    //alert('success1->'+this.responseText);
	    /*for(var i=0;i<this.responseText.length;i+=20){
	    	alert(this.responseText.substring(i,i+20));
	    }*/
	    var venues=JSON.parse(this.responseText).response.venues;
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
	};
	
	xhrLocationCode.open("GET", url);
	 
	//Define the content type
	xhrLocationCode.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
	 
	//Send request
	xhrLocationCode.send();
};
Titanium.Geolocation.addEventListener('location', locationCallback);

$.index.open();
