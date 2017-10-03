var myIndex = 0;
var list = "";
var currentMenu;
var position;
var listItems = [];
var categoryBlocks = document.getElementsByClassName("categoryBlock");
var labelId;
var dropOpen = false;
var timer = window.setInterval(carousel, 4000);
//Accompanying photos for featured stories/galleries
var gallery = [{"img":"bank.jpg", "desc":"BOX CANYON OF THE HENRYS FORK"},{"img":"jackson.jpg","desc":"JACKSON LAKE AT THE FOOT OF THE GRAND TETONS"},{"img":"deckers.jpg", "desc":"COLORADO'S SOUTH PLATTE RIVER AT ITS FINEST"},{"img":"pebble.jpg", "desc":"STONY SHORES OF COLORADO'S FRASER RIVER"}];
//gallery buttons
document.getElementById("arrowRight").addEventListener("click", forward);
document.getElementById("arrowLeft").addEventListener("click",back);
//mobile dropdown button
document.getElementById("mediaDrop").addEventListener("click", dropMobile);

//mobile dropdown button
function dropMobile(){
  if(dropOpen == false){
  document.getElementById("mediaDrop").src = "../photos/mobileDropped.png";
  dropOpen = true;
} else if(dropOpen == true){
  document.getElementById("mediaDrop").src = "../photos/mobileDrop.png";
  dropOpen = false;
}
}
//category buttons
for (var i = 0; i <= categoryBlocks.length - 1; i++){
  categoryBlocks[i].addEventListener("mouseover", removeText);
  categoryBlocks[i].addEventListener("mouseout", addText);
}
//remove button text
function removeText(){
  labelId = this.getAttribute('id');
  document.getElementById(labelId + "Label").style.display = "none";
  document.getElementById(labelId + "Img").style.opacity = "1";
}
//add button text
function addText(){
  document.getElementById(labelId + "Label").style.display = "inline-block";
  document.getElementById(labelId + "Img").style.opacity = ".5";
}

//populates the gallery to start and points toward the current array position
window.onload = function (){
  myIndex++;
  document.getElementById("homeImages").style.backgroundImage = "url(\"../photos/" + gallery[0].img + "\")" ;
  document.getElementById("contentDesc").innerHTML = gallery[0].desc;
  document.getElementById("pos0").style.backgroundColor = "#4B8BF7";
}

//adds position indicators to match the same number of photos in the array
for (var i = 0; i <= gallery.length - 1; i++){
  list += "<li id=\"pos" + i + "\"></li>";
  document.getElementById("posList").innerHTML = list;
}

//get all the elements we just added and their ids
for (var i = 0; i <= gallery.length - 1; i++){
  listItems.push(document.getElementsByTagName("LI")[i].getAttribute("id"));
}

//start the clock on the slide show
timer;

function forward(){
//iterate one step forward in array
  myIndex++;
//if the iterator goes over the end of the array, jump to front
  if (myIndex > gallery.length) {myIndex = 1}
//jump to the corresponding slot in our listItems array
  var currentIndex = listItems[myIndex - 1];
//get the bg image and desc from the current array object
  document.getElementById("homeImages").style.backgroundImage = "url(\"../photos/" + gallery[myIndex - 1].img + "\")" ;
  document.getElementById("contentDesc").innerHTML = gallery[myIndex - 1].desc;
//color the box corresponding to our gallery position
  document.getElementById(currentIndex).style.backgroundColor = "#4B8BF7";
//find any lis that don't match the gallery position and color them white
  for (var i = 0; i <= listItems.length - 1; i++){
    var position = listItems[i];
    if(currentIndex != position){
      document.getElementById(position).style.backgroundColor = "white";
    }
  }
//reset the timer
    window.clearInterval(timer);
    timer = window.setInterval(carousel, 4000);
}

function back(){
//iterate one step backward in array
  myIndex--;
//if the iterator goes over the end of the array, jump to back
  if (myIndex == 0) {myIndex = gallery.length}
//jump to the corresponding slot in our listItems array
  var currentIndex = listItems[myIndex - 1];
//get the bg image and desc from the current array object
  document.getElementById("homeImages").style.backgroundImage = "url(\"../photos/" + gallery[myIndex - 1].img + "\")" ;
  document.getElementById("contentDesc").innerHTML = gallery[myIndex - 1].desc;
//color the box corresponding to our gallery position
  document.getElementById(currentIndex).style.backgroundColor = "#4B8BF7";
//find any lis that don't match the gallery position and color them white
  for (var i = 0; i <= listItems.length - 1; i++){
    var position = listItems[i];
    if(currentIndex != position){
      document.getElementById(position).style.backgroundColor = "white";
    }
  }
//reset the timer
  window.clearInterval(timer);
  timer = window.setInterval(carousel, 4000);
}

function carousel() {
  //jump to next picture in the array
    myIndex++;
//jump to front of array if we go over the end
    if (myIndex > gallery.length) {myIndex = 1}
//jump to the corresponding slot in our listItems array
    var currentIndex = listItems[myIndex - 1];
    document.getElementById("homeImages").style.backgroundImage = "url(\"../photos/" + gallery[myIndex - 1].img + "\")" ;
    console.log("url(\"../photos/" + gallery[myIndex - 1].img + "\")");
    document.getElementById("contentDesc").innerHTML = gallery[myIndex - 1].desc;
//color the box corresponding to our gallery position
    document.getElementById(currentIndex).style.backgroundColor = "#4B8BF7";
//find any lis that don't match the gallery position and color them white
    for (var i = 0; i <= listItems.length - 1; i++){
      var position = listItems[i];
      if(currentIndex != position){
        document.getElementById(position).style.backgroundColor = "white";
      }
    }
}
