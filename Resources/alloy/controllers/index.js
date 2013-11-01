function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    var __alloyId1 = [];
    $.__views.mountainView = Ti.Map.createAnnotation({
        latitude: 0,
        longitude: -82.081651,
        id: "mountainView",
        title: "Appcelerator Headquarters",
        subtitle: "Mountain View, CA",
        pincolor: Titanium.Map.ANNOTATION_RED,
        leftButton: "/images/appcelerator_small.png",
        myid: "1"
    });
    __alloyId1.push($.__views.mountainView);
    $.__views.mapview = Ti.Map.createView({
        annotations: __alloyId1,
        id: "mapview",
        ns: Ti.Map,
        animate: "true",
        regionFit: "true",
        userLocation: "true",
        mapType: Ti.Map.STANDARD_TYPE
    });
    $.__views.index.add($.__views.mapview);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var longitude;
    var latitude;
    Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
    Titanium.Geolocation.distanceFilter = 10;
    Titanium.Geolocation.getCurrentPosition(function(e) {
        if (!e.success || e.error) {
            alert("error " + JSON.stringify(e.error));
            return;
        }
        longitude = e.coords.longitude;
        latitude = e.coords.latitude;
        e.coords.altitude;
        e.coords.heading;
        e.coords.accuracy;
        e.coords.speed;
        e.coords.timestamp;
        e.coords.altitudeAccuracy;
    });
    var locationCallback = function(e) {
        if (!e.success || e.error) return;
        var longitude = e.coords.longitude;
        var latitude = e.coords.latitude;
        e.coords.altitude;
        e.coords.heading;
        e.coords.accuracy;
        e.coords.speed;
        e.coords.timestamp;
        e.coords.altitudeAccuracy;
        setTimeout(function() {}, 100);
        var xhrLocationCode = Ti.Network.createHTTPClient();
        xhrLocationCode.setTimeout(12e4);
        var url = "https://api.foursquare.com/v2/venues/search?&client_id=Z31E0WEHAJPEOHJNZIG0F4KIPZUUZ2KL1MX4LABOPUMTATSA&client_secret=YLXHU52D5AGTRRPZ0VK0ZRMIIZAJ0MZSTOGGYE4LADQZ3FOO&v=20131016&ll=" + latitude;
        url += "," + longitude + "&radius=80&limit=5";
        xhrLocationCode.onerror = function(e) {
            Ti.API.debug("hola>" + e.error);
            alert("error2" + JSON.stringify(e.error));
        };
        xhrLocationCode.onload = function() {
            Ti.API.info("Received text: " + this.responseText);
            alert("success1->" + this.responseText);
            var venues = JSON.parse(this.responseText).response.venues;
            for (var i = 0; venues.length > i; i++) {
                var objLocationAnnotation = Titanium.Map.createAnnotation({
                    latitude: venues[i].location.lat,
                    longitude: venues[i].location.lng,
                    pincolor: Titanium.Map.ANNOTATION_GREEN
                });
                $.mapview.addAnnotation(objLocationAnnotation);
            }
        };
        xhrLocationCode.open("GET", url);
        xhrLocationCode.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xhrLocationCode.send();
    };
    Titanium.Geolocation.addEventListener("location", locationCallback);
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;