//variable declaration___________________________________
//pushed station data goes into spots
var spots = [{}];
//parsed usgs json is pushed into my array
var myArr;
//spec is used to store the stations in the list view, it will be using model data once backend is set up
var spec = [];
//checkVar looks to make sure only streamflow data gets pulled
var checkVar;
//used for shorthand for 'myArr.value.timeSeries.length' in our USGS json for loop
var arrLength;
//*****This variable pulls the current state from the filter and plugs it into all following http reqs to usgs*****
var currentState = "co";
//these vars resets the map center at the new state center
var currentLat = 39.059811;
var currentLong = -105.311104;
//checks if filter is opened or closed
var dropFilter = false;
//filter http req pumps parse json into states Array
var states;
//the text that gets shown in the indicator box-sizing
var filterIndicator;

//add listeners to li dropdowns
var liListeners = document.getElementsByClassName("stateFilter");

//filter http request
var stateXhr = new XMLHttpRequest();
//map http request
var xhr = new XMLHttpRequest();
//list http request
var xmlhttp = new XMLHttpRequest();
//populates filter dropdown list
var filter = function filter(){
  if (dropFilter == false){
    dropFilter = true;
  } else if (true) {
    dropFilter = false;
  }
  if (dropFilter == true){
    document.getElementById("drop").style.display = "inline-block";
    document.getElementById("filterList").style.height = "50%";
  } else if (dropFilter == false){
    document.getElementById("drop").style.display = "none";
    document.getElementById("filterList").style.height = "20px";
  }
};

//http requests____________________________________________
//local state data request
stateXhr.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    states = JSON.parse(this.responseText);
    //add every states filter to the list
    states.forEach(function (item, index){drop.innerHTML += "<li class=\"stateFilter\">" + states[index].name + "</li>";});

    //display the list if the filter box is clicked, don't display it if clicked twice
    filter;
    //add event listeners to all dropdown li's in your filer
    for (var i = 0; i <= liListeners.length - 1; i++) {
      liListeners[i].addEventListener("click", function (){
        filterIndicator = this.innerHTML;
    //check states array for item that has a 'name' value that matches the innerHTML
    //if it does, pull the abbreviation and plug it into the query
        for (var j = 0; j <= states.length - 1; j++) {
          if (states[j].name == filterIndicator){
            currentState = states[j].abbr;
            currentLat = states[j].lat;
            currentLong = states[j].long;
            console.log(currentState);
          }
        }
        //recall the http request for the map
        initMap();
        document.getElementById("stateFilter").innerHTML = filterIndicator;
      });
    }
  }
}
stateXhr.open("GET", "https://raw.githubusercontent.com/Markweese/Check-The-Flows/master/data/states.json", true);
stateXhr.send();

//usgs server request
function loadList(spec){
  //document.getElementById("list").innerHTML="";
  xmlhttp.onreadystatechange = function() {
  if (this.readyState != 4){
    //if the data isn't loaded run the helix load display
    document.getElementById('helixBox').style.display = "block";
  }
  if (this.readyState == 4 && this.status == 200) {
      var myArr = JSON.parse(this.responseText);
      //if the data is loaded shut the helix load display
      document.getElementById('helixBox').style.display = "none";
      //clear spots and reload the updated query
      spots = [{}];
      //Array length
        arrLength = myArr.value.timeSeries.length;
      //loop through all returned stations
        for(var i = 0; i <= arrLength - 1 ; i++){
      //says which object to add property too;
        if (spots.length <= 0){
        pos = spots.length;
        } else {pos = spots.length - 1}
      //variable name
        checkVar = myArr.value.timeSeries[i].variable.variableName;
        checkSite = myArr.value.timeSeries[i].sourceInfo.siteName;
      //check if the JSON object is CFS
        if(checkVar == "Streamflow, ft&#179;/s" && myArr.value.timeSeries[i].values[0].value[0].value != -999999){
      //create a new object in the array
        spots.push({});
      //cfs, parsed into a float
        spots[pos].cfs = parseInt(myArr.value.timeSeries[i].values[0].value[0].value);
      //site name
        spots[pos].site = myArr.value.timeSeries[i].sourceInfo.siteName.toUpperCase();
      //site code
        spots[pos].code = myArr.value.timeSeries[i].sourceInfo.siteCode[0].value;
      //latitude
        spots[pos].lat = myArr.value.timeSeries[i].sourceInfo.geoLocation.geogLocation.latitude;
      //longitude
        spots[pos].long = myArr.value.timeSeries[i].sourceInfo.geoLocation.geogLocation.longitude;
        }
      }

      //print all present cfs readings to their own div
      function printList(item, index){
        if (item.site != undefined && spec.length > 0){
        document.getElementById("emptyNotice").style.display = "none";
        document.getElementById("list").innerHTML += "<div class=\"stationItem\"> <div class=\"station-name\">" + item.site + "</div> <div class=\"cfsLevel\">" + item.cfs + " CFS</div></div>";
      } else if (spec.length <= 0) {
          document.getElementById("list").style.display = "inline";
        }
      }
      spots.forEach(printList);
    }
  };
}

//google map constructor
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: currentLat, lng: currentLong},
    zoom: 6
  });

  xhr.onreadystatechange = function() {
    if (this.readyState != 4){
      //if the data isn't loaded run the helix load display
      document.getElementById('helixBox').style.display = "block";
    }
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        //if the data is loaded shut the helix load display
        document.getElementById('helixBox').style.display = "none";

        myArr.value.timeSeries.forEach(function (data){
          if(data.variable.variableName == "Streamflow, ft&#179;/s" && data.values[0].value[0].value != -999999){
          var latLng = new google.maps.LatLng(data.sourceInfo.geoLocation.geogLocation.latitude, data.sourceInfo.geoLocation.geogLocation.longitude);
          var marker = new google.maps.Marker({
           position: latLng,
           map: map,
           title: data.FIELD1
          });
          var details = "<h1>" + data.sourceInfo.siteName + "</h1> <h2> Running at: <b>" + data.values[0].value[0].value + " CFS</b></h2><button onclick=\"addToList(this)\" id=\"addRiver\" class=\"" + data.sourceInfo.siteCode[0].value + "\">Add To List</button>";
          bindInfoWindow(marker, map, new google.maps.InfoWindow(), details);
          }
        });

        function bindInfoWindow(marker, map, infowindow, strDescription) {
          google.maps.event.addListener(marker, 'click', function () {
          infowindow.setContent(strDescription);
          infowindow.open(map, marker);
          });
        }
      }
    }
    xhr.open("GET", "https://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=" + currentState + "&parameterCd=00060,00065&siteType=ST&siteStatus=active", true);
    xhr.send();
  }

//adds the map element to html
  function openMap() {
    var mapNode = document.createElement("div");
    var textNode = document.createTextNode("");
    document.getElementById("list").style.display = "none";
    xmlhttp.open("GET", "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=" + spec + "&parameterCd=00060,00065&siteType=ST&siteStatus=active", true);
    xmlhttp.send();
    document.getElementById("openMap").style.display = "none";
    document.getElementById("closeMap").style.display = "block";
    document.getElementById("filterList").style.display = "block";
    mapNode.appendChild(textNode);
    mapNode.id = "map";
    document.getElementById("dad").appendChild(mapNode);
    initMap();

  }

//removes the map element from html
  function shutMap(){
    var parent = document.getElementById("dad");
    var child = document.getElementById("map");
    document.getElementById("list").innerHTML = "";
    xmlhttp.open("GET", "https://waterservices.usgs.gov/nwis/iv/?format=json&sites=" + spec + "&parameterCd=00060,00065&siteType=ST&siteStatus=active", true);
    xmlhttp.send();
    document.getElementById("list").style.display = "inline";
    document.getElementById("openMap").style.display = "block";
    document.getElementById("closeMap").style.display = "none";
    document.getElementById("filterList").style.display = "none";
    parent.removeChild(child);
  }

  function addToList(obj){
    //the function(o) segment of this statement reads the array object 'code' values into their own array, then index of checks if
    //any of those values match the current station trying to be pushed into the query statement, if any of them do, we know the station
    //is already on the query spec. A similar statement is used when pushing objects into spots to avoid duplicates.
    var index = spots.map(function(o) { return o.code; }).indexOf(obj.className);
    //as soon as a station is selected, stop displaying the notice
    document.getElementById("emptyNotice").style.display = "none";
    //push into query to USGS, or don't if the station already exists
    if(index == -1){
      spec.push(obj.className);
      document.getElementById("list").innerHTML = "";
      loadList(spec);
      alert("Added To List");
    } else {
      alert("This station is already on your list.");
    }
  }
