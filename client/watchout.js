// start slingin' some d3 here.

//<image xlink:href="asteroid.png" x="0" y="0" height="50" width="50"/>

//svg
var width = 960,
    height = 500;

var enemyRadius = 15;

var userRadius = 8;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(32," + (height / 2) + ")");

// d3.select("svg").append("image")
//     .attr("xlink:href", "asteroid.png")
//     .attr("x", "0")
//     .attr("y", "0")
//     .attr("height", "50")
//     .attr("width", "50")

var randomVector = function() {
  return [ Math.floor(Math.random() * width),
           Math.floor(Math.random() * height) ];
};

var randomVectors = function(numVectors) {
  var results = [];
  for (var i = 0; i < numVectors; i++) {
    results.push(randomVector());
  }
  return results;
};


//CREATE ENEMIES AND USER -------------------------------
//create enemies
d3.select("svg").selectAll("image")
  .data(randomVectors(10)).enter()
  .append("image")
    .attr("xlink:href", "shuriken.png")
    .attr("x", function(d) { return d[0]; })
    .attr("y", function(d) { return d[1]; })
    .attr("height", (enemyRadius*2).toString())
    .attr("width", (enemyRadius*2).toString())

//create user (after enemies so that it is shown above the enemies)
var user = d3.select("svg").selectAll("circle")
  .data([{x: width/2, y: height/2}]).enter()
  .append("circle")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", userRadius.toString())

//CHANGE ENEMY AND USER POSITIONS ------------------------
//automatically change positions of enemies every second
var moveEnemies = function() {
  d3.select("svg").selectAll("image")
    .data(randomVectors(10))
    .transition().duration(1000)
     .attr("x", function(d) { return d[0] - enemyRadius; })
     .attr("y", function(d) { return d[1] - enemyRadius; })
}
setInterval(moveEnemies, 1000);

//make user manually draggable
var drag = d3.behavior.drag()
  .origin(function(d) { return d; })
  .on("drag", function(d) {
    d3.select(this).attr("cx", d.x = Math.max(Math.min(d3.event.x, width), 0))
                   .attr("cy", d.y = Math.max(Math.min(d3.event.y, height), 0));
  })
user.call(drag);

//COLLISION AND SCORE RECORDING ------------------------
// detect collision with enemy
var checkCollision = function(){
  var collided = false;
  var userCx = d3.select("circle").attr("cx");
  var userCy = d3.select("circle").attr("cy");
  d3.selectAll('image').each(function(d,i) {
    var enemy = d3.select(this);
    var enemyCx = enemy.attr("x");
    var enemyCy = enemy.attr("y");
    var distance = Math.sqrt(Math.pow(userCx - enemyCx, 2) + Math.pow(userCy - enemyCy, 2));
    if (distance < parseInt(userRadius) + enemyRadius) {
      collided = true;
    }
  });
  return collided;
};

var highScore = 0;
var score = 0;
var collisions = 0;
var inCollision = false; //used to determine if we are starting a new collision

//increment score
var incrementScore = function() {
  d3.select(".current").text("Current score: " + score);
  score++;
};
setInterval(incrementScore, 50);

//update stats based on collisions
var updateStats = function() {
  if (!inCollision && checkCollision()) {
    if (score > highScore) {
      highScore = score;
      d3.select(".highscore").text("High score: " + highScore);
    }
    score = 0;
    collisions++;
    d3.select(".collisions").text("Collisions: " + collisions);
    inCollision = true;
  } 
  if (!checkCollision()) {
    inCollision = false;
  }
}
setInterval(updateStats, 10);