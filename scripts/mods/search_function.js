// "Dates of data collection" bar
d3.select("#third_bar").call(d3.slider().scale(d3.scale.ordinal().domain(jun.timelist).rangePoints([0, 1], 0.5)).axis(d3.svg.axis()).snap(true).value("All")
  .on("slide", function(evt, value){
    d3.select('#year_value').text(value);
    center_changer()
}))

$('#scrollable-dropdown-menu .typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 0
},
{
  name: 'states',
  limit :30, 
  source: substringMatcher(Site_search)
});

// region and version selection (multiple)
document.getElementById("select1").addEventListener("click",function(){
    center_changer()
})

