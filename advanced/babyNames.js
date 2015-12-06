//console.dir(rawData.data[0]);

//filter to only get top ten ranked names of each gender/race
//will contain repeats due to original data
var topTen = _.filter(rawData.data, function(element) {
  return Number(element[element.length-1]) < 11;
});

var processedData = {};
_.each(topTen, function(element) {
  var gender = element[9];
  var race = element[10];
  var name = element[11];
  var count = element[12];
  processedData[race] = processedData[race] || {};
  processedData[race][gender] = processedData[race][gender] || {};
  processedData[race][gender][name] = processedData[race][gender][name] || {};
  processedData[race][gender][name].name = name;
  processedData[race][gender][name].count = count;
});

var d3Data = [];
_.each(processedData["HISPANIC"]["FEMALE"], function(nameCountObj) {
  d3Data.push(nameCountObj);
});

var rand = function(n) { return Math.floor(Math.random * n); };
var randX = function() { return rand(500) + 'px'; };
var randY = function() { return rand(500) + 'px'; };

var board = d3.select("body").style('position', 'relative');
d3.select("body").selectAll("div")
  .data(d3Data)
  .enter()
  .append("div")
  .text(function(d) { return d.name; })
  .style({
    width: function(d) { return d.count + 'px'; },
    height: function(d) { return d.count + 'px'; },
    'text-align': 'center',
    'line-height': function(d) { return d.count + 'px'; },
    top: randY,
    left: randX,
    'background-color': '#ff0000',
    position: 'absolute',
    'border-radius': function(d) { return d.count/2 + 'px'; }
  });

console.dir(d3Data);