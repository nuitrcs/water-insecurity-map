// "Dates of data collection" bar
jun.drawSlider = function() {
  function slideFunction(evt, value) {
      jun.slider_position = evt
      d3.select('#year_value').text(evt);
      center_changer()
  }
  var slider = d3.slider()
    .scale(d3.scalePoint().domain(jun.timelist).range([0, 1], 0.5))
    .axis(d3.axisBottom())
    .snap(true)
    .value(jun.slider_position)
    .slide(slideFunction)
  d3.select("#third_bar").call(slider)
}
jun.drawSlider()

jun.removeSlider = function() {
  d3.select('#third_bar .d3-slider').remove()
}

window.onresize = function(){jun.removeSlider(); jun.drawSlider(); console.log("hi")}

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

