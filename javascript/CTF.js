//requesting Ids from Paths
var pathIds = document.getElementsByClassName("basin");
var regPoints = document.getElementsByClassName("regPoint");
var riverList;
var attribute;
var currentObj = "";
var text = "";
var basinData = "";

//river arrays
var basinOne = ["Snake", "Salt", "Greys", "Hoback", "Gros Ventre", "Buffalo Fork"];
var basinTwo = ["Wind", "Bighorn", "Shoshone", "Clarks Fork", "Yellowstone"];
var basinThree = ["Niobara", "Cheyenne", "Stockade-Beaver", "Sand", "Belle Fourche", "Little Missouri", "Little Powder", "Powder", "Tongue", "Little Bighorn"]
var basinFour = ["Green", "Little Snake", "Bear", "Great Divide"];
var basinFive = ["North Platte", "Sweetwater", "South Platte"];
var yellowstone = ["Lamar","Soda Butte","Slough","Yellowstone","Gallatin","Madison","Firehole","Gibbon","Gardner","Bechler","Falls","Snake","Lewis"];

//load the json and put the contents in basinData
var ourRequest = new XMLHttpRequest();
  ourRequest.open('GET','https://raw.githubusercontent.com/Markweese/Check-The-Flows/master/javascript/pointData.json');
  ourRequest.onload = function(){
  basinData = JSON.parse(ourRequest.responseText);
  };
  ourRequest.send();

//adds event listeners to all basin paths
for (var i = 0; i < pathIds.length; i++) {
	pathIds[i].addEventListener("mouseover", mouseOverBasin);
	pathIds[i].addEventListener("mouseout", mouseOutBasin);
	pathIds[i].addEventListener("click", clickBasin);
}

//add event listeners to circles
for (var i = 0; i < regPoints.length; i++){
    	regPoints[i].addEventListener("click", regPointPopup);
}

//gets id attribute from last hovered path and finds associated array
function mouseOverBasin() {

   var id = this.getAttribute("id");

	 if (id == "basinOne"){
		 for (i = 0; i < basinOne.length; i++) {
		     text += basinOne[i] +  " River" + "<br>";
		 }
	 } else if (id == "basinTwo") {
			 for (i = 0; i < basinTwo.length; i++) {
			    text += basinTwo[i] +  " River" + "<br>";
			 }
		 } else if (id == "basinThree") {
			 for (i = 0; i < basinThree.length; i++) {
			    text += basinThree[i] +  " River" + "<br>";
			 }
		 } else if (id == "basinFour") {
				 for (i = 0; i < basinFour.length; i++) {
				    text += basinFour[i] +  " River" + "<br>";
				 }
		 } else if (id == "basinFive") {
			 for (i = 0; i < basinFive.length; i++) {
			    text += basinFive[i] +  " River" + "<br>";
			 }
		 } else if (id == "yellowstone") {
			 for (i = 0; i < yellowstone.length; i++) {
			    text += yellowstone[i] +  " River" + "<br>";
			 }
		 } else (text = "Special Regulation Area \
		  \nContact The Wind River Indian Reservation");
		 document.getElementById("rivers").innerHTML = text;
		 document.getElementById("riverDiv").style.display = "block";
	}


function mouseOutBasin() {

	document.getElementById("rivers").innerHTML = "";
	document.getElementById("riverDiv").style.display = "none";
	text = "";
}

function clickBasin(){
	  attribute = this.getAttribute("id");
		document.getElementById(attribute + "Pane").style.display = "inline-block";
		document.getElementById("closeOut").style.display = "inline-block";
}

/*this is all set, build out an array of arrays of objects in JSON*/
function regPointPopup(){
  document.getElementById(attribute + "RiverAttributes").innerHTML = "";
	document.getElementById(attribute + "DataPane").style.display = "block";

	for (var i = 0; i < basinData.length; i++){
//this if statement selects the array that corresponds to the attribute value passed by our basin click
			if (basinData[i][0].basinPicker == attribute){
				for(var j = 0; j < basinData[i].length; j++){
					if(this.getAttribute("id") == basinData[i][j].picker){
						currentObj = basinData[i][j];
//currentKey lets us know which key we are assigning attribute values to at this particular part of the loop
            var currentKey = Object.keys(currentObj);
            for (x in currentObj) {
              var currentKey = x;
              var header = "";
//this list of if statements alters the section header based on the current key
              if(currentKey == "boats"){
                header = "Boating Regulations";
              } else if(currentKey == "creel"){
                header = "Bag Limits";
              } else if(currentKey == "other"){
                header = "Additional Regulations";
              } else if(currentKey == "tackle"){
                header = "Fishing Tackle";
              } else if(currentKey == "season"){
                header = "Closures";
              } else{header == ""}
/*this final if statement stipulates that key value pairs that are not empty, or
containing data only needed for JS functions, should be printed out with it's corresponding header*/
						  if(currentObj[x] != attribute && currentObj[x] != this.getAttribute("id") && currentObj[x] != "undefined"){
              document.getElementById(attribute + "RiverAttributes").innerHTML += "<h2>" + header + "</h2>" + currentObj[x] + "<br><hr><br>";
							}
					  }
				  }
			  }
		  }
	  }
}


/*these functions close data panes and clear all variable to avoid
unwanted concatenation*/
function closeOut(){

	document.getElementById(attribute + "Pane").style.display = "none";
	document.getElementById("closeOut").style.display = "none";
	document.getElementById(attribute + "DataPane").style.display = "none";
	document.getElementById(attribute + "RiverAttributes").innerHTML = "";

}

function closeData(){
	document.getElementById(attribute + "DataPane").style.display = "none";
	document.getElementById(attribute + "RiverAttributes").innerHTML = "";
}
