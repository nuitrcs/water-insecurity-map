
//////////////////////////// setting access token //////////////////////////// 
mapboxgl.accessToken = map_key
var jun_map = new mapboxgl.Map({
    container: 'map', 
    style: 'mapbox://styles/mapbox/light-v9', 
  	zoom:1.3,
	center: [8.233028050000001, 11.853942649999999]
});


var regions_search = []
var lat_search = []
var lng_search = []
var hwise_version_search = []
var Participants_search = []
var GNI_search = []
var Region_search = []
var Year_search = []
//////////////////////////// executing //////////////////////////// 
d3.json('scripts/data/data2.json',function(finished_data) {
    jun.data = finished_data
    drawMarkers("Lat",latmin.innerText,latmax.innerText,"Lng", lngmin.innerText, latmax.innerText, "Region",region.innerText)
})

document.getElementById("search_box").addEventListener("keypress", function(event) {
  if (event.keyCode === 13) {
    document.getElementById("gogogo").click()
    }
});


