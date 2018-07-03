var margin = {top:10, right: 30, bottom: 33, left: 50},
                  width = 260 - margin.left - margin.right,
                  height = 180 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var svg = d3.select("#mySidenav").insert("svg",':first-child')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Lasso functions to execute while lassoing
var lasso_start = function() {
  lasso.items()
    .attr("r",3.5) // reset size
    .style("fill",null) // clear all of the fills
    .classed({"not_possible":true,"selected":false}); // style as not possible
};

var lasso_draw = function() {
  // Style the possible dots
  lasso.items().filter(function(d) {return d.possible===true})
    .classed({"not_possible":false,"possible":true})
    .style("opacity","1");

  // Style the not possible dot
  lasso.items().filter(function(d) {return d.possible===false})
    .classed({"not_possible":true,"possible":false})
      .style("opacity","1");
};

var lasso_end = function() {
  // Reset the color of all dots
  lasso.items()
     .style("fill", function(d) { return color(d[jun.color_standard ]); })
     .style("opacity","1.0");

  // Style the selected dots
  lasso.items().filter(function(d) {return d.selected===true})
    .classed({"not_possible":false,"possible":false})
    .attr("r",7);

  // filter map markers 
  var id_list = []
  if (lasso.items().filter(function(d) {return d.selected===true})[0].length != 0){
      lasso.items().filter(function(d) {return d.selected===false})
                    .classed({"not_possible":false,"possible":false})
                    .attr("r",3.5)
                    .style("opacity","0.3");
    for (var i = 0; i < lasso.items().filter(function(d) {return d.selected===true})[0].length;i++){
      id_list.push(Number(lasso.items().filter(function(d) {return d.selected===true})[0][i].id))
    }
  }

  var lassoed = ["in", "SiteName"]
  if (id_list.length != 0){
    for (var j = 0; j < id_list.length; j++){
      lassoed.push(site_search[id_list[j]])
    }
  }
  else {
    for (var i = 0; i < lasso.items().filter(function(d) {return d.selected===false})[0].length;i++){
      id_list.push(Number(lasso.items().filter(function(d) {return d.selected===false})[0][i].id))
    }
    for (var j = 0; j < id_list.length; j++){
      lassoed.push(site_search[id_list[j]])
    }
  }

  if (id_list.length == 1){
    var position = id_list[0]
    openDesc(position)
    
    jun.map.flyTo({center : [lng_search[position],lat_search[position]], zoom:6})
  }
  else if (lasso.items().filter(function(d) {return d.selected===true})[0].length >= 1){
    var lat_lassoed=[]
    var lng_lassoed=[]

    for (var k = 0; k < id_list.length; k++){
      lat_lassoed.push(lat_search[id_list[k]])
      lng_lassoed.push(lng_search[id_list[k]])
    }
    jun.map.flyTo({center : [(Math.max(...lng_lassoed)+Math.min(...lng_lassoed))/2,(Math.max(...lat_lassoed)+Math.min(...lat_lassoed))/2],zoom:1.3})
  }

  document.getElementById("Lister").innerHTML = "<a class='closebtn' onclick='closeLister()''>&times;</a><h3> List of research sites </h3>"
  for (var i = 0 ; i < site_search.length; i ++){
      if (id_list.indexOf(i) >= 0) {
          document.getElementById('Lister').innerHTML += "<span class='list_element_yes' id='"+i+"_list' onclick='linklink("+i+")'>"+ site_search[i]+"</span><br>"
      }
      else {
          document.getElementById('Lister').innerHTML += "<span class='list_element_no' id='"+i+"_list' >"+ site_search[i]+"</span><br>"
      }
  }
  document.getElementById("Lister").innerHTML += "<br><input id = 'clear1' type='submit' value ='clear!' onclick = 'clearit()'>"
  jun.map.setFilter("points", lassoed)
}
 
// Create the area where the lasso event can be triggered
var lasso_area = svg.append("rect")
                      .attr("width",width)
                      .attr("height",height)
                      .style("opacity",0);

// Define the lasso
var lasso = d3.lasso()
      .closePathDistance(75) // max distance for the lasso loop to be closed
      .closePathSelect(true) // can items be selected by closing the path?
      .hoverSelect(true) // can items by selected by hovering over them?
      .area(lasso_area) // area where the lasso can be started
      .on("start",lasso_start) // lasso start function
      .on("draw",lasso_draw) // lasso draw function
      .on("end",lasso_end); // lasso end function

var tooltip = d3.select("#mySidenav").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

var xValue = function(d) { return d["GNI"];}
var yValue = function(d) { return d.Female;}

// Init the lasso on the svg:g that contains the dots
svg.call(lasso);

d3.json(jun.data_link, function(error, data) {

  x.domain([0, d3.max(data, xValue)+1]);
  y.domain([0, 100]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", 33)
      .style("text-anchor", "end")
      .text("GNI (1,000 USD)")
      .style("user-select","none");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Female (%)")
      .style("user-select","none");

  svg.selectAll(".dot")
      .data(data)
      .enter().append("circle")
      .attr("id",function(d,i) {return i;}) 
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", function(d) { return x(d.GNI); })
      .attr("cy", function(d) { return y(d.Female); })
      .style("fill", function(d) { return color(d[jun.color_standard ]); })
      .on("mouseover", function(d) {
        tooltip.transition()
             .duration(200)
             .style("opacity", .9);
        tooltip.html(d["Site Name"] + "<br/> (" + xValue(d)*1000 
          + " USD, " + yValue(d) + "%)")
             .style("left", (d3.event.pageX + 5) + "px")
             .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            tooltip.transition()
                 .duration(500)
                 .style("opacity", 0);
        })
        .on("click", function(d){
            var id_marker =d3.select(this)[0][0].id
            filter_list_ver2(id_marker)
            document.getElementById("Lister").innerHTML = "<a class='closebtn' onclick='closeLister()''>&times;</a><h3> List of research sites </h3><br>"
            for (var i = 0 ; i < site_search.length; i ++){
                if (i == id_marker) {
                    document.getElementById('Lister').innerHTML += "<span class='list_element_yes' id='"+i+"_list' onclick='linklink("+i+")'>"+ site_search[i]+"</span><br>"
                }
                else {
                    document.getElementById('Lister').innerHTML += "<span class='list_element_no' id='"+i+"_list' >"+ site_search[i]+"</span><br>"
                }
            }
            document.getElementById("Lister").innerHTML += "<input id = 'clear1' type='submit' value ='clear!' onclick = 'clearit()'>"
        })
  var legend = svg.selectAll(".legend")
      .data(color.domain())
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 18)
      .attr("y", height - 65)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", width - 22)
      .attr("y", height - 55)
      .attr("dy", ".18em")
      .style("text-anchor", "end")
      .text(function(d) { return d; })
      .style("user-select","none");
  lasso.items(d3.selectAll(".dot"));
});
