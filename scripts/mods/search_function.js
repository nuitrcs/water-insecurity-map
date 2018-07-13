// two bars
// d3.select('#first_bar').call(d3.slider().axis(false).min(-90).max(90).value( [-90, 90] ).on("slide", function(evt, value) {
//     d3.select('#latmin').text(Number(value[0]).toFixed(2));
//     d3.select('#latmax').text(Number(value[1]).toFixed(2));
//     filter_list(clicked =jun.clicked)
//     center_changer()
// }));
// d3.select('#second_bar').call(d3.slider().axis(false).value( [-180, 180] ).on("slide", function(evt, value) {
//     d3.select('#lngmin').text(Number(value[0]).toFixed(2));
//     d3.select('#lngmax').text(Number(value[1]).toFixed(2));
//     filter_list(clicked =jun.clicked)  
//     center_changer()
// }));

// bottom bar
d3.select("#third_bar").call(d3.slider().scale(d3.scale.ordinal().domain(jun.timelist).rangePoints([0, 1], 0.5)).axis( d3.svg.axis() ).snap(true).value("Gecko")
  .on("slide", function(evt, value){
    d3.select('#year_value').text(value);
    filter_list(clicked =jun.clicked)
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
  source: substringMatcher(site_search)
});

// region and version selection (multiple)
document.getElementById("select1").addEventListener("click",function(){
    filter_list(clicked =jun.clicked)
    center_changer()
})

