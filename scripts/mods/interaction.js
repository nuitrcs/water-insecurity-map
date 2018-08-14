// for search engine : when enter button is pressed in search engine, open description + map flies to that point + etc
document.getElementById("scrollable-dropdown-menu").addEventListener("keypress", function(event) {
  if (event.keyCode === 13) {
    for (var i = 0; i < Site_search.length; i++) { 
        if (Site_search[i].toLowerCase() == $('.typeahead')[1].value.toLowerCase()) {
            clearit() 
            jun.map.flyTo({center : [Lng_search[i],Lat_search[i]], zoom:5})
            openDesc(i)
            $('.tt-menu').css('display','none');
            _ = filter_list_ver2(i,1)
            }
        }
    }
});

// for search engine : when one of the hints is clicked, open description + map flies to that point + etc
$(document).on('click','.tt-suggestion', function(e){
    for (var i = 0; i < Site_search.length; i++) { 
        if (Site_search[i].toLowerCase() == document.getElementsByClassName("typeahead")[1].value.toLowerCase()) { 
            clearit() 
            jun.map.flyTo({center : [Lng_search[i],Lat_search[i]], zoom:5})
            openDesc(i)
            $('.tt-menu').css('display','none');
            _ = filter_list_ver2(i,1)
        }
    }
})

// for search engine : when enter button is pressed on one of the hint, open description + map flies to that point + etc
$('input.typeahead').on('typeahead:selected', function(event, selection) {
    for (var i = 0; i < Site_search.length; i++) { 
        if (Site_search[i].toLowerCase() == $('.typeahead')[1].value.toLowerCase()) {
            clearit() 
            jun.map.flyTo({center : [Lng_search[i],Lat_search[i]], zoom:5})
            openDesc(i)
            $('.tt-menu').css('display','none');
            _ = filter_list_ver2(i,1)
            }
        }
    }
);

// when escape button is pressed, close side bar 
$(document).keyup(function(e) {
    if (e.keyCode === 27) {
        document.getElementsByClassName("closebtn")[0].click()
        document.getElementsByClassName("closebtn")[1].click()
    }
});

// when specific marker on the map is clicked, open description + map flies to that point + etc
jun.map.on('click', 'points', function (e) {
    here_id  = e.features[0].properties.id_number
    var coordinates = e.features[0].geometry.coordinates.slice();
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    a= filter_list_ver2(e.features[0].properties.id_number,1)
});

// when cursor stays over markers, cursor shape changes
jun.map.on('mouseenter', 'points', function () {
    jun.map.getCanvas().style.cursor = 'pointer';
});
jun.map.on('mouseleave', 'points', function () {
    jun.map.getCanvas().style.cursor = '';
});

