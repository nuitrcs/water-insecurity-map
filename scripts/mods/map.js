
var Id_search = []
var Region_search = []
var Site_search = []
var Hwise_search = []
var Partners_search = []
var Setting_search = [] 
var Sampling_search = []
var Cognitive_search = []
var Participants_search = []
var Period_search = []
var Start_search = []
var Female_search = []
var Main_source_search = []
var Main_search = []
var Source_search = []
var Climate_search = []
var Lat_search = []
var Lng_search = []
var Improved_search = []

document.getElementById("scrollable-dropdown-menu").addEventListener("keypress", function(event) {
  if (event.keyCode === 13) {
    for (var i = 0; i < Site_search.length; i++) { 
        if (Site_search[i]== $('.typeahead')[1].value) {
            clearit() 
            jun.map.flyTo({center : [Lng_search[i],Lat_search[i]], zoom:6})
            openDesc(i)
            $('.tt-menu').css('display','none');
            _ = filter_list_ver2(i,1)
            }
        }
    }
});

$(document).on('click','.tt-suggestion', function(e){
    for (var i = 0; i < Site_search.length; i++) { 
        if (Site_search[i]== document.getElementsByClassName("typeahead")[1].value) { 
            clearit() 
            jun.map.flyTo({center : [Lng_search[i],Lat_search[i]], zoom:6})
            openDesc(i)
            $('.tt-menu').css('display','none');
            _ = filter_list_ver2(i,1)
            }
        }
})

$('input.typeahead').on('typeahead:selected', function(event, selection) {
        for (var i = 0; i < Site_search.length; i++) { 
            if (Site_search[i]== $('.typeahead')[1].value) {
                clearit() 
                jun.map.flyTo({center : [Lng_search[i],Lat_search[i]], zoom:6})
                openDesc(i)
                $('.tt-menu').css('display','none');
                _ = filter_list_ver2(i,1)
                }
            }
        }
);


jun.map.on('click', 'points', function (e) {
    here_id  = e.features[0].properties.id_number
    var coordinates = e.features[0].geometry.coordinates.slice();
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    a= filter_list_ver2(e.features[0].properties.id_number,1)
});

jun.map.on('mouseenter', 'points', function () {
    jun.map.getCanvas().style.cursor = 'pointer';
});

jun.map.on('mouseleave', 'points', function () {
    jun.map.getCanvas().style.cursor = '';
});

