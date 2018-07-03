// two bars
d3.select('#first_bar').call(d3.slider().axis(true).min(-90).max(90).value( [-90, 90] ).on("slide", function(evt, value) {
    d3.select('#latmin').text(Number(value[0]).toFixed(2));
    d3.select('#latmax').text(Number(value[1]).toFixed(2));
    filter_list()
    a=list_changer()
}));
d3.select('#second_bar').call(d3.slider().axis(true).value( [-180, 180] ).on("slide", function(evt, value) {
    d3.select('#lngmin').text(Number(value[0]).toFixed(2));
    d3.select('#lngmax').text(Number(value[1]).toFixed(2));
    filter_list()  
    a=list_changer()
}));

// bottom bar
d3.select("#third_bar").call(d3.slider().scale(d3.scale.ordinal().domain(["All",2000, 2001, 2002, 2003, 2004, 2005]).rangePoints([0, 1], 0.5)).axis( d3.svg.axis() ).snap(true).value("All").on("slide", function(evt, value){
    d3.select('#year_value').text(value);
    filter_list()
    a=list_changer()
}))

$('#search_box .typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'states',
  source: substringMatcher(site_search)
});

// region and version selection (multiple)
document.getElementById("select1").addEventListener("click",function(){
    filter_list()
    multiple_selected= list_changer()
    multiple_selected_lat = []
    multiple_selected_lng = []

    for (var k = 0; k < multiple_selected.length; k++){
      multiple_selected_lat.push(lat_search[multiple_selected[k]])
      multiple_selected_lng.push(lng_search[multiple_selected[k]])
    }
    jun.map.flyTo({center : [(Math.max(...multiple_selected_lng)+Math.min(...multiple_selected_lng))/2,(Math.max(...multiple_selected_lat)+Math.min(...multiple_selected_lat))/2],zoom:1.3})
})

