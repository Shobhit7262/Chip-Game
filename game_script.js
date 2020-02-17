console.log("connected")

var h1 = $("h1")
var h2 = $("h2")
// h1.css("color","blue")
setInterval("changeHeaderColor()",500)


var playerOne = prompt("Player one Enter your name,you will be Blue!")
var playerOneColor = "rgb(86, 151, 255)";
var playerTwo = prompt("Player one Enter your name,you will be Red!")
var playerTwoColor = "rgb(237, 45, 73)";

var table = $("table");
var table_row = $("tr");



function colorChanger(rowIndex,coloumnIndex,color){
  return table_row.eq(rowIndex).find("td").eq(coloumnIndex).find("button").css("background-color" ,color);
}

function returnColor(rowIndex,coloumnIndex){
  return table_row.eq(rowIndex).find("td").eq(coloumnIndex).find("button").css("background-color");
}

function checkbottom(coloumnIndex){
  var check = returnColor(5,coloumnIndex);
  for (var row = 5; row > -1; row--){
    check = returnColor(row,coloumnIndex);
    if(check === "rgb(128, 128, 128)"){
      return row;
    }
  }
}

function colorMatchCheck(one,two,three,four){
  if(one === two && one === three && one === four && one !== "rgb(128, 128, 128)" && one !== undefined){
    return true;
  }
  else{
    return false;
  }
}

function horizontalWinChecks(){
  for(var row = 0; row < 6; row++){
    for(var col= 0; col < 4; col++){
      if(colorMatchCheck(returnColor(row,col),returnColor(row,col+1),returnColor(row,col+2),returnColor(row,col+3))){
        console.log("horizWin");
        return true;
      }
      else{
        continue;
      }
    }
  }
}

function verticalWinChecks(){
  for(var col = 0; col < 7; col++){
    for(var row= 0; row <3 ; row++){
      if(colorMatchCheck(returnColor(row,col),returnColor(row+1,col),returnColor(row+2,col),returnColor(row+3,col))){
        console.log("vertiWin");
        return true;
      }
      else{
        continue;
      }
    }
  }
}

function diagnolWinCheck(){
  for(var col = 0; col < 5; col++){
    for(var row = 0; row < 7; row++){
      if(colorMatchCheck(returnColor(row,col),returnColor(row+1,col+1),returnColor(row+2,col+2),returnColor(row+3,col+3))){
        console.log("diagWin");
        return true;
      }
      else if(colorMatchCheck(returnColor(row,col),returnColor(row-1,col+1),returnColor(row-2,col+2),returnColor(row-3,col+3))){
        console.log("diagWin");
        return true;
      }
    }
  }
}


function endGame(winningPlayer){
  for(var col = 0; col < 5; col++){
    for(var row = 0; row < 7; row++){
      $("h3").fadeOut("fast")
      $("h2").fadeOut("fast")
      $("h1").text(winningPlayer+": has Won! Refresh your Browser to play again")
    }
  }
}
function getRandomColor(){
  var letters = "0123456789ABCDEF";
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random()*16)];
  }
  return color
}
function changeHeaderColor(){
  colorInput = getRandomColor()
  h1.css("color" , colorInput)
}
function clicked(){
  document.location.reload();
}

h2.on("mouseenter",function(){
  h2.slideToggle(2000);
})
h2.on("mouseleave",function(){
  h2.slideToggle(2000);
})


var currentPlayer = 1;
var currentName = playerOne;
var currentColor = playerOneColor;

$("h3").text(playerOne+": its your turn");


$(".board button").on("click",function(){

  var col = $(this).closest("td").index();


  var availSlot = checkbottom(col);


  colorChanger(availSlot,col,currentColor);


  if(horizontalWinChecks() || verticalWinChecks() || diagnolWinCheck()){
    endGame(currentName);
  }
  currentPlayer = currentPlayer * -1;



  if (currentPlayer === 1) {
    currentName = playerOne;
    $("h3").text(currentName+" : it is your turn, please pick a coloumn to drop your blue chip");
    currentColor = playerOneColor;
  }
  else{
    currentName = playerTwo;
    $("h3").text(currentName+" : it is your turn, please pick a coloumn to drop your red chip");
    currentColor = playerTwoColor;
  }
})
