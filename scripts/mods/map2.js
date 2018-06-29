jun_map.on('click', 'points', function (e) {
    var SiteName = e.features[0].properties.SiteName;
    var coordinates = e.features[0].geometry.coordinates.slice();
    var HWISE_Version = e.features[0].properties.HWISE_Version  
    var Participants = e.features[0].properties.Participants
    var GNI = e.features[0].properties.GNI
    var Region = e.features[0].properties.Region
    var lat = e.features[0].properties.Lat
    var lng = e.features[0].properties.Lng
    var Year = e.features[0].properties.Year
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    openDesc(SiteName, lat, lng, HWISE_Version, Participants, GNI, Region)
    filter_list_ver2(e.features[0].properties.id_number)






});

document.getElementById("gogogo").addEventListener("click",function(){
    for (var i = 0; i < regions_search.length; i++) { 
        if (regions_search[i]== $('.typeahead')[1].value) { 
            jun_map.flyTo({center : [lng_search[i],lat_search[i]], zoom:4})

            openDesc(regions_search[i], lat_search[i], lng_search[i], hwise_version_search[i], Participants_search[i], GNI_search[i], Region_search[i])

            $('.tt-menu').css('display','none');
            filter_list_ver2(i)
            }
    }
});
jun_map.on('mouseenter', 'points', function () {
    jun_map.getCanvas().style.cursor = 'pointer';
});


jun_map.on('mouseleave', 'points', function () {
    jun_map.getCanvas().style.cursor = '';
});