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
    .style("fill", jun.grey);

var foreground = meter.append("path")
    .attr("class", "foreground");

var percentComplete = meter.append("text")
    .attr("text-anchor", "middle")
    .attr("class", "percent-complete")
    .attr("dy", "3px");