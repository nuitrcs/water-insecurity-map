var width = jun.animation_size,
    height = jun.animation_size,
    twoPi = 2 * Math.PI,
    progress = 0,
    allocated = 45.5,
    total = 60,
    formatPercent = d3.format(".1f");

var arc = d3.arc()
    .startAngle(0)
    .innerRadius((jun.animation_size/2))
    .outerRadius((jun.animation_size/2)-(0.1*jun.animation_size));

var svg = d3.select("#third_column").insert("svg","#line_title2")
    .attr("id", "circlemeter")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox","0 0 " + jun.animation_size.toString() + " "+ jun.animation_size.toString())
    .attr("preserveAspectRatio", "xMinYMin meet")
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var meter = svg.append("g")
    .attr("class", "funds-allocated-meter");

meter.append("path")
    .attr("class", "background")
    .attr("d", arc.endAngle(twoPi))
    .style("fill","#E3E3E3");

var foreground = meter.append("path")
    .attr("class", "foreground");

var percentComplete = meter.append("text")
    .attr("text-anchor", "middle")
    .attr("class", "percent-complete")
    .attr("dy", "0em");

var description = meter.append("text")
    .attr("text-anchor", "middle")
    .attr("class", "description")
    .attr("dy", "0.9em")
    .text("hrs")
    .style("font-size", "28px");

var i = d3.interpolate(progress, allocated / total);

d3.transition().duration(1000).tween("progress", function() {
  return function(t) {
    progress = i(t);
    foreground.attr("d", arc.endAngle(twoPi * progress));
    percentComplete.text(formatPercent(progress*100));
  };
})













