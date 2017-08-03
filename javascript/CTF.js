/*//xmlhttprequest
var xmlhttp, obj, basinData;
xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        obj = JSON.stringify(this.responseText);
        basinData = JSON.parse(obj);
    }
    console.log(basinData);
};
xmlhttp.open("GET", "https://raw.githubusercontent.com/Markweese/json-test/master/Json-test.json", true);
xmlhttp.send();*/

//for testing only
var basinData = [

[{"basinPicker":"basinTwo",
  "picker":"beckLake",
  "regArea":"Beck Lake, New Cody Reservoir, and Markham Reservoir in Park County",
  "boats":"No internal combustion engines"},
 {"picker":"bigHorn",
  "regArea":"Big Horn Lake downstream from Highway 14A in Big Horn County",
  "creel":"Trout: 5 per day or 10 in possession<br>\
  Bass: 10 per day or 20 in possession<br>\
  Walleye and Sauger: 6 per day or 12 in possession, no more than 3 can be Sauger<br>\
  Channel Catfish: 6 per day or in possession<br>Burbot(ling): 3 per day or in possession<br>\
  Shovelnose Sturgeon: 3 per day or in possession",
  "other":"All walleye and sauger to be kept whole until off water and done fishing."},
 {"picker":"bigHornWind",
  "regArea":"Bighorn and Wind River drainage lakes and streams\
  in Big Horn, Fremont, Hot Springs, Park, and Washakie counties",
  "other":"All walleye and sauger to be kept whole until off water and done fishing.\n\
  One inch piece of skin to be left for species identification while in transit or in the field"}
],

[{"basinPicker":"basinFive",
  "picker":"AM",
  "regArea":"A and M Reservoir in Sweetwater County",
  "boats":"No internal combustion engines"},
 {"picker":"alcovaRes",
  "regArea":"Alcova Reservoir in Natrona County",
  "creel":"12 Walleye per day or in possession, regulations on Walleye taken by spear gun not applicable"},
 {"picker":"alsopLake",
  "regArea":"Alsop Lake in Albany County",
  "creel":"2 Trout per day or in posession. All Trout less than 16\" to be released immediately",
  "tackle":"Artificial flies and lures only"},
 {"picker":"bryanStock",
  "regArea":"Bryan Stock Trail Pond In Natrona County",
  "boats":"No internal combustion engines"},
 {"picker":"bumpSullivan",
  "regArea":"Bump Sullivan Reservoir in Goshen County",
  "season":"November 1 - February 15"},
 {"picker":"drainage6",
  "regArea":"Crow Creek, Dale Creek, Horse Creek, Loedgepole Creek drainages on the Medicine Bow-Routt National Forest upstream from forest boundary in Albany County",
  "creel":"6 Brook Trout per day or in possession"},
 {"picker":"crystalRes",
  "regArea":"Crystal Reservoir in Laramie County",
  "boats":"No motors over 15 horsepower"
 }
]

]

//requesting Ids from Paths
var pathIds = document.getElementsByClassName("basin");
var regPoints = document.getElementsByClassName("regPoint");
var riverList;
var attribute;
var currentObj = "";
var text = "";

//river arrays
var basinOne = ["Snake", "Salt", "Greys", "Hoback", "Gros Ventre", "Buffalo Fork"];
var basinTwo = ["Wind", "Bighorn", "Shoshone", "Clarks Fork", "Yellowstone"];
var basinThree = ["Niobara", "Cheyenne", "Stockade-Beaver", "Sand", "Belle Fourche", "Little Missouri", "Little Powder", "Powder", "Tongue", "Little Bighorn"]
var basinFour = ["Green", "Little Snake", "Bear", "Great Divide"];
var basinFive = ["North Platte", "Sweetwater", "South Platte"];
var yellowstone = ["Lamar","Soda Butte","Slough","Yellowstone","Gallatin","Madison","Firehole","Gibbon","Gardner","Bechler","Falls","Snake","Lewis"];

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

//find a way to refer to images in a variable that responds to the current id.
function clickBasin(){
	  attribute = this.getAttribute("id");
		document.getElementById(attribute + "Pane").style.display = "inline-block";
		document.getElementById("closeOut").style.display = "inline-block";
}

/*this is all set, build out an array of arrays of objects in JSON*/
function regPointPopup(){
  console.log(basinData[20]);
  document.getElementById(attribute + "RiverAttributes").innerHTML = "";
	document.getElementById(attribute + "DataPane").style.display = "block";

	for (var i = 0; i < basinData.length; i++){
			if (basinData[i][0].basinPicker == attribute){
				for(var j = 0; j < basinData[i].length; j++){
					if(this.getAttribute("id") == basinData[i][j].picker){
						currentObj = basinData[i][j];
            for (x in currentObj) {
						  if(currentObj[x] != attribute && currentObj[x] != this.getAttribute("id") && currentObj[x] != "undefined"){
              document.getElementById(attribute + "RiverAttributes").innerHTML += currentObj[x] + "<br><hr><br>";
							}
					  }
				  }
			  }
		  }
	  }
}



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
