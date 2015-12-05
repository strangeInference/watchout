// start slingin' some d3 here.

//<image xlink:href="asteroid.png" x="0" y="0" height="50" width="50"/>

var width = 960,
    height = 500;

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
  var result = [];
  result.push(Math.floor(Math.random() * width));
  result.push(Math.floor(Math.random() * height));
  return result;
};

var randomVectors = function(numVectors) {
  var results = [];
  for (var i = 0; i < numVectors; i++) {
    results.push(randomVector());
  }
  //console.log(results);
  return results;
};

//create enemies
d3.select("svg").selectAll("image")
  .data(randomVectors(10)).enter()
  .append("image")
    .attr("xlink:href", "asteroid.png")
    .attr("x", function(d) { return d[0]; })
    .attr("y", function(d) { return d[1]; })
    .attr("height", "50")
    .attr("width", "50")

//change positions of enemies every second
setInterval(function() {
  d3.select("svg").selectAll("image")
    .data(randomVectors(10))
    .transition().duration(1000)
     .attr("x", function(d) { return d[0]; })
     .attr("y", function(d) { return d[1]; })
  }, 1000);

//create user circle, save to var
var user = d3.select("svg").selectAll("circle")
  .data([{x: width/2, y: height/2}]).enter()
  .append("circle")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", "10")

// var drag = d3.behavior.drag();
// user.call(drag);

// drag.on("dragstart", function() { console.log("dragging"); });


// var ourForce = d3.layout.force().start();
// user.call(ourForce.drag);

var drag = d3.behavior.drag()
  .origin(function(d) { return d; })
  .on("dragstart", function(d) {
    //d3.select(this).classed("dragging", true);
  })
  .on("drag", function(d) {
    // var origVal = this.attributes.cx.value;
    // origVal = parseInt(origVal);
    // origVal += 10;
    // origVal = origVal.toString()
    // this.attributes.cx.value = origVal;
    d3.select(this).attr("cx", d.x = d3.event.x)
                   .attr("cy", d.y = d3.event.y);
  })
  .on("dragend", function(d) {

  });
user.call(drag);