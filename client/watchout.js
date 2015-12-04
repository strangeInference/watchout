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
  console.log(results);
  return results;
};

d3.select("svg").selectAll("image")
  .data(randomVectors(10)).enter()
  .append("image")
    .attr("xlink:href", "asteroid.png")
    .attr("x", function(d) { return d[0]; })
    .attr("y", function(d) { return d[1]; })
    .attr("height", "50")
    .attr("width", "50")

setInterval(function() {
  d3.select("svg").selectAll("image")
    .data(randomVectors(10))
     .attr("xlink:href", "asteroid.png")
     .attr("x", function(d) { return d[0]; })
     .attr("y", function(d) { return d[1]; })
     .attr("height", "50")
     .attr("width", "50")
  }, 1000);