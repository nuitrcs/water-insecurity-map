var site_search = []
var lat_search = []
var lng_search = []
var hwise_search = []
var Participants_search = []
var GNI_search = []
var Region_search = []
var Year_search = []
var id_search = []
var Partners_search = []
var Setting_search = [] 
var Sampling_search = []
var Climate_search = []
var Male_search = []
var Female_search = []
var Improved_search = []

document.getElementById("scrollable-dropdown-menu").addEventListener("keypress", function(event) {
  if (event.keyCode === 13) {
    for (var i = 0; i < site_search.length; i++) { 
        if (site_search[i]== $('.typeahead')[1].value) { 
            jun.map.flyTo({center : [lng_search[i],lat_search[i]], zoom:5})
            openDesc(i)
            $('.tt-menu').css('display','none');
            filter_list_ver2(i,1)
            }
        }
    }
});

$(document).on('click','.tt-suggestion', function(e){
    for (var i = 0; i < site_search.length; i++) { 
        if (site_search[i]== document.getElementsByClassName("typeahead")[1].value) { 
            console.log("yes")
            jun.map.flyTo({center : [lng_search[i],lat_search[i]], zoom:5})
            openDesc(i)
            $('.tt-menu').css('display','none');
            filter_list_ver2(i,1)
            }
        }
})

jun.map.on('click', 'points', function (e) {
    here_id  = e.features[0].properties.id_number
    var coordinates = e.features[0].geometry.coordinates.slice();
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    openDesc(here_id)
    filter_list_ver2(e.features[0].properties.id_number,1)
});


jun.map.on('mouseenter', 'points', function () {
    jun.map.getCanvas().style.cursor = 'pointer';
});

jun.map.on('mouseleave', 'points', function () {
    jun.map.getCanvas().style.cursor = '';
});
