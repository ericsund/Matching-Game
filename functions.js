var faceMax = 5;
var leftSide = document.getElementById("leftSide");  // it's not necessary to have your js vars named differently than the selectors in this case
var rightSide = document.getElementById('rightSide');
var body = document.getElementsByTagName("body")[0]; // good use of getElementsByTagName here since you'll only have one body tag
var leftSideImages;
var level = 1;  // we'd want to start on level 1, not level 0
// removed last_child var -- not used anywhere

//localStorage.setItem('highestlevel', 0);

window.onload = newBoard;  // perhaps newBoard may be a better name?

function newBoard() {
  var faceCount = 0;

    /* Generate faces */
    while(faceCount < faceMax) {

      // Creating image
      var image = document.createElement("IMG");
      image.setAttribute("src", "http://home.cse.ust.hk/~rossiter/mooc/matching_game/smile.png");

      // Setting up random top position
      var random_top = Math.random()*400;
      random_top = Math.floor(random_top);
      image.style.top = random_top+"px";

      // Setting up random left position
      var random_left = Math.floor(Math.random()*400);
      image.style.left = random_left+"px";

      leftSide.appendChild(image);
      faceCount++;
    }

    /* Duplicating the left side on top of the right side */
    leftSideImages = leftSide.cloneNode(true);
    var lastImage = leftSideImages.lastChild;
    //console.log(lastImage);
    lastImage.parentNode.removeChild(lastImage);
    rightSide.appendChild(leftSideImages);

    evaluateClick(leftSide);
    console.log(leftSide);
}

/* Evaluate whether the click is correct or incorrect */
// it's not necessary to pass in leftSide as a parameter since we can still access it in this scope
// although you can keep these three functions as-is, I recommend using classes to excercise inheritence: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
function evaluateClick() {
  console.log(leftSide.lastChild);

  body.onclick = gameOver;
  leftSide.lastChild.onclick = nextLevel;

  /* Add 5 faces and proceed to next level when correct image is clicked */
  function nextLevel(e) { // the js convention is usually to pass the event parameter in as 'e'
    e.stopPropagation();
    faceMax += 5;
    //Deleting all nodes
    alert(`Correct!  You've completed level ${level}.`);  // string interpolation is the way to go!  Concatenation can get messy...
    deleteNodes(leftSide,rightSide);
    newBoard();
    level++;
  }

  /* End the game, display the score and restart the game the user clicks anywhere else */
  // I'd recommend detecting clicks on the images themselves rather than the background for more accuracy    
  function gameOver() {
    alert("Game Over!");
    alert(`You have completed up to level ${level-1} reached level ${level}.`);

    var highestlevel = localStorage.getItem("highestlevel"); // not necessary to have different js and local storage variables
    if(level >= highestlevel) {
      localStorage.setItem('highestlevel', level);
      alert(`You have set a new highest level record with ${level}.`);
    }
    
    console.log(localStorage.highestlevel);
    alert("Starting a new game");
    location.reload();
  }

}

/* Delete all images */
function deleteNodes(leftSide,rightSide) {
  console.log("LeftSide firstChild:"+leftSide.firstChild);
  console.log("RighttSide firstChild:"+rightSide.firstChild);

  // deleting leftside children nodes
  while(leftSide.firstChild) {
    var node = leftSide.lastChild;
    node.parentNode.removeChild(node);
  }

  // deleting rightside children nodes
  while(rightSide.firstChild) {
    var node = rightSide.lastChild;
    node.parentNode.removeChild(node);
  }

  console.log("LeftSide firstChild:"+leftSide.firstChild);
  console.log("RighttSide firstChild:"+rightSide.firstChild);
}