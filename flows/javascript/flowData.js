var spots = [{}];
var spec = "co";
var checkVar;
var arrLength;
var myArr;
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
      var myArr = JSON.parse(this.responseText);
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
      //check if the JSON object is CFS
        if(checkVar == "Streamflow, ft&#179;/s" && myArr.value.timeSeries[i].values[0].value[0].value != -999999){
      //create a new object in the array
        spots.push({});
      //cfs, parsed into a float
        spots[pos].cfs = parseInt(myArr.value.timeSeries[i].values[0].value[0].value);
      //site name
        spots[pos].site = myArr.value.timeSeries[i].sourceInfo.siteName;
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
        if (item.site != undefined){
        document.getElementById("list").innerHTML = document.getElementById("list").innerHTML + "<div class=\"stationItem\"> <div class=\"station-name\">" + item.site + "</div> <div class=\"cfsLevel\">" + item.cfs + " CFS</div></div>";
        }
      }
      spots.forEach(printList);
    }
};
//xmlhttp.open("GET", "https://waterservices.usgs.gov/nwis/dv/?format=json&sites=09037500,09080400,06700000,09132500,09046490,06620000,06730200,06741510,06751490&siteType=ST&siteStatus=active", true);
xmlhttp.open("GET", "https://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=" + spec + "&parameterCd=00060,00065&siteType=ST&siteStatus=active", true);
xmlhttp.send();
