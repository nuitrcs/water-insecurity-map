// two bars
d3.select('#first_bar').call(d3.slider().axis(true).min(-90).max(90).value( [-90, 90] ).on("slide", function(evt, value) {
    d3.select('#latmin').text(Number(value[0]).toFixed(2));
    d3.select('#latmax').text(Number(value[1]).toFixed(2));
    filter_list()
}));
d3.select('#second_bar').call(d3.slider().axis(true).value( [-180, 180] ).on("slide", function(evt, value) {
    d3.select('#lngmin').text(Number(value[0]).toFixed(2));
    d3.select('#lngmax').text(Number(value[1]).toFixed(2));
    filter_list()  
}));

// bottom bar
d3.select("#third_bar").call(d3.slider().scale(d3.scale.ordinal().domain(["All",2000, 2001, 2002, 2003, 2004, 2005]).rangePoints([0, 1], 0.5)).axis( d3.svg.axis() ).snap(true).value("All").on("slide", function(evt, value){
    d3.select('#region').text(value);
    filter_list()
}))


$('#search_box .typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'states',
  source: substringMatcher(regions_search)
});


// region and version selection (multiple)
document.getElementById("select1").addEventListener("click",function(){
    filter_list()
})

// top reset function
// document.getElementById("reset").addEventListener("click",function(){
//   filter_list()
//   lasso.items().style("opacity","1.0").attr("r",3.5)
// })

// bottom clear button 
document.getElementById("clear").addEventListener("click",function(){
    jun_map.setFilter("points", null)
    $('#region_select').multipleSelect("checkAll");
    $('#Version_select').multipleSelect("checkAll");  
    lasso.items(d3.selectAll(".dot"));
    lasso.items().style("fill", function(d) { return color(d["Site Name"]); }).style("opacity","1.0").attr("r",3.5);
    jun_map.flyTo({center : [8.233028050000001, 11.853942649999999],zoom:1.3})

    document.getElementById('third_bar').click();

    // $("#first_bar").slider("value", $("#first_bar").slider("option", "min") );
    // d3.select('#first_bar').call(d3.slider().axis(true).min(-90).max(90).value( [-90, 90] ))
})

















