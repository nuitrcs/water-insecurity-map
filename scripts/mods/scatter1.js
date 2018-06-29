
var margin = {top: 20, right: 20, bottom: 30, left: 40},
width = 220 - margin.left - margin.right,
height = 200 - margin.top - margin.bottom;

// setup x 
var xValue = function(d) { return d["GNP"];}, // data -> value
xScale = d3.scale.linear().range([0, width]), // value -> display
xMap = function(d) { return xScale(xValue(d));}, // data -> display
xAxis = d3.svg.axis().scale(xScale).orient("bottom");

// setup y
var yValue = function(d) { return d.Participants;}, // data -> value
yScale = d3.scale.linear().range([height, 0]), // value -> display
yMap = function(d) { return yScale(yValue(d));}, // data -> display
yAxis = d3.svg.axis().scale(yScale).orient("left");

// setup fill color
var cValue = function(d) { return d["Site Name"];},
color = d3.scale.category10();




// add the graph canvas to the body of the webpage
var svg = d3.select("#mySidenav").insert("svg",':first-child')
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// add the tooltip area to the webpage
var tooltip = d3.select("#mySidenav").append("div")
.attr("class", "tooltip")
.style("opacity", 0);

// load data
d3.json('scripts/data/data.json',function(data) {

// change string (from CSV) into number format
data.forEach(function(d) {
d.GNP = +d.GNP;
d.Participants = +d.Participants;
// console.log(d);
});

// don't want dots overlapping axis, so add in buffer to data domain
xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);

// x-axis
svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis)
.append("text")
  .attr("class", "label")
  .attr("x", width)
  .attr("y", -6)
  .style("text-anchor", "end")
  .text("GNP");

// y-axis
svg.append("g")
  .attr("class", "y axis")
  .call(yAxis)
.append("text")
  .attr("class", "label")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .text("Participants");

// draw dots
svg.selectAll(".dot")
  .data(data)
.enter().append("circle")
  .attr("class", "dot")
  .attr("r", 3.5)
  .attr("cx", xMap)
  .attr("cy", yMap)
  .style("fill", function(d) { return color(cValue(d));}) 
  .on("mouseover", function(d) {
      tooltip.transition()
           .duration(200)
           .style("opacity", .9);
      tooltip.html(d["Site Name"] + "<br/> (" + xValue(d) 
        + ", " + yValue(d) + ")")
           .style("left", (d3.event.pageX + 5) + "px")
           .style("top", (d3.event.pageY - 28) + "px");
  })
  .on("mouseout", function(d) {
      tooltip.transition()
           .duration(500)
           .style("opacity", 0);
  }
  );
});
