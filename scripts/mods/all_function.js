function drawMarkers(criteria1, left_end1, right_end1, criteria2, left_end2, right_end2) { 
    left_end1 = Number(left_end1)
    right_end1 = Number(right_end1)
    left_end2 = Number(left_end2)
    right_end2 = Number(right_end2)
    var index_point = 0
    var filtered=[]
    for (var i = 0; i < jun.data.length; i++) {
        if (jun.data[i]["HWISE Version"]==1){
            filtered[index_point] = {
                "type" : "Feature", 
                "properties": { 
                    "SiteName": jun.data[i]["Site Name"],
                    "HWISE_Version": jun.data[i]["HWISE Version"],
                    "GNI": jun.data[i]["GNI"],
                    "Region": jun.data[i]["Region"],
                    "Lat" : jun.data[i]["Lat"],
                    "Lng" : jun.data[i]["Lng"],
                    "Year" : jun.data[i]["Year"] ,
                    "id_number" : jun.data[i]["id_number"],
                    "Setting" : jun.data[i]["Setting"],
                    "icon" :"custom-marker"
                },
                "geometry" : {
                    "type" : "Point",
                    "coordinates": [jun.data[i]["Lng"],jun.data[i]["Lat"]]
                }
            }
        }
        else {
            filtered[index_point] = {
                "type" : "Feature", 
                "properties": { 
                    "SiteName": jun.data[i]["Site Name"],
                    "HWISE_Version": jun.data[i]["HWISE Version"],
                    "GNI": jun.data[i]["GNI"],
                    "Region": jun.data[i]["Region"],
                    "Lat" : jun.data[i]["Lat"],
                    "Lng" : jun.data[i]["Lng"],
                    "Year" : jun.data[i]["Year"] ,
                    "id_number" : jun.data[i]["id_number"],
                    "Setting" : jun.data[i]["Setting"],
                    "icon" :"custom-marker1"
                },
                "geometry" : {
                    "type" : "Point",
                    "coordinates": [jun.data[i]["Lng"],jun.data[i]["Lat"]]
                }
            }
        }
        index_point += 1 
        site_search.push(jun.data[i]["Site Name"])
        hwise_search.push(jun.data[i]["HWISE Version"])
        Participants_search.push(jun.data[i]["Participants"])
        GNI_search.push(jun.data[i]["GNI"])
        Region_search.push(jun.data[i]["Region"])
        lat_search.push(jun.data[i]["Lat"])
        lng_search.push(jun.data[i]["Lng"])
        Year_search.push(jun.data[i]["Year"])
        id_search.push(jun.data[i]["id_number"])
        Partners_search.push(jun.data[i]["Partners"])
        Setting_search.push(jun.data[i]["Setting"])
        Sampling_search.push(jun.data[i]["Sampling"])
        Climate_search.push(jun.data[i]["Climate"])
        Female_search.push(jun.data[i]["Female"])
        Improved_search.push(jun.data[i]["Improved_water"])
    }
    jun.map.on('load', function () {
        jun.map.loadImage(jun.image1_link, function(error, image) {
            jun.map.loadImage(jun.image2_link, function(error, image1) {
                jun.map.addImage("custom-marker", image);
                jun.map.addImage("custom-marker1", image1)
                jun.map.addSource("source1", {
                                    "type": "geojson",
                                    "data": {
                                            "type": "FeatureCollection",
                                            "features": filtered}})
                jun.map.addLayer({
                    "id": "points",
                    "type": "symbol",
                    "source": "source1",
                    "layout": {
                        "icon-image": "{icon}",
                        "icon-allow-overlap": true,
                        "icon-anchor":"bottom",
                        "icon-size" : 0.2,
                        "text-field": "{SiteName}",
                        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                        "text-size" : 13,
                        "text-offset": [0,-0.4],
                        "text-anchor": "top",  
                        "text-optional" : true,
                        "text-max-width" : 8,
                        "text-line-height" : 0.9
                        },
                    "paint" :{
                        "icon-opacity" : 0.95
                    }
                    })
                })
            }
        )
    })
    
}

// filter_list : for slide bars : change lassoable items and map markers
function filter_list(clicked="") {    
    region_filter=["in", "Region"]
    if ($(region_select).val()){
        for (var i = 0; i < $(region_select).val().length;i++){
            region_filter.push( $(region_select).val()[i])
        }
    }
    version_filter =["in", "HWISE_Version"]
    if ($(Version_select).val()){
        for (var j = 0; j < $(Version_select).val().length;j++){
            version_filter.push( Number($(Version_select).val()[j]))
        }
    }
    if (clicked == "") { 
        filter_combined = ["all", [">=", "Lat", Number(latmin.innerText)], ["<=", "Lat", Number(latmax.innerText) ],
                    [">=", "Lng", Number(lngmin.innerText) ], ["<=", "Lng", Number(lngmax.innerText)]]    
    }
    else {
        filter_combined = ["all", [">=", "Lat", Number(latmin.innerText)], ["<=", "Lat", Number(latmax.innerText) ],
                            [">=", "Lng", Number(lngmin.innerText) ], ["<=", "Lng", Number(lngmax.innerText)],
                            ["==", "Setting", clicked]]
    }

    if (year_value.innerText != "All") {
        filter_combined.push(["==","Year",Number(year_value.innerText)])
    }

    if (version_filter[2]){
        if (region_filter[2]) {
            filter_combined.push(region_filter)
            filter_combined.push(version_filter)
        }
        else { 
            filter_combined.push(["in", "HWISE_Version",100])
        }
    }
    else {
        filter_combined.push(["in", "HWISE_Version",100])
    }
    jun.map.setFilter("points", filter_combined)
    lasso.items(d3.selectAll(".dot"));
    lasso.items().style("fill", "#c8c8c8").style("opacity","0.3").attr("r",3.5);
    if (clicked =="") { 
        if (version_filter[2]){
            if (region_filter[2]) {
                if (year_value.innerText != "All"){
                    lasso.items(d3.selectAll(".dot").filter(function(d) {return (region_filter.indexOf(d.Region) >= 0) 
                        && (version_filter.indexOf(d["HWISE Version"]) >= 0)
                        && (d.Lat >= Number(latmin.innerText))
                        && (d.Lat <= Number(latmax.innerText))
                        && (d.Lng >= Number(lngmin.innerText))
                        && (d.Lng <= Number(lngmax.innerText))
                        && (d.Year == Number(year_value.innerText)) 
                     }))}
                else {
                     lasso.items(d3.selectAll(".dot").filter(function(d) {return (region_filter.indexOf(d.Region) >= 0) 
                        && (version_filter.indexOf(d["HWISE Version"]) >= 0)
                        && (d.Lat >= Number(latmin.innerText))
                        && (d.Lat <= Number(latmax.innerText))
                        && (d.Lng >= Number(lngmin.innerText))
                        && (d.Lng <= Number(lngmax.innerText))
                     }))
                }
            }
            else {
                lasso.items(d3.selectAll(".dot").filter(function(d) {return (version_filter.indexOf(d["HWISE Version"]) == 100)}))
            }
        }
        else {
            lasso.items(d3.selectAll(".dot").filter(function(d) {return (version_filter.indexOf(d["HWISE Version"]) == 100)}))
        }
    }
    else {
        if (version_filter[2]){
            if (region_filter[2]) {
                if (year_value.innerText != "All"){
                    lasso.items(d3.selectAll(".dot").filter(function(d) {return (region_filter.indexOf(d.Region) >= 0) 
                        && (version_filter.indexOf(d["HWISE Version"]) >= 0)
                        && (d.Lat >= Number(latmin.innerText))
                        && (d.Lat <= Number(latmax.innerText))
                        && (d.Lng >= Number(lngmin.innerText))
                        && (d.Lng <= Number(lngmax.innerText))
                        && (d.Year == Number(year_value.innerText)
                        && (d.Setting == clicked)) 
                     }))}
                else {
                     lasso.items(d3.selectAll(".dot").filter(function(d) {return (region_filter.indexOf(d.Region) >= 0) 
                        && (version_filter.indexOf(d["HWISE Version"]) >= 0)
                        && (d.Lat >= Number(latmin.innerText))
                        && (d.Lat <= Number(latmax.innerText))
                        && (d.Lng >= Number(lngmin.innerText))
                        && (d.Lng <= Number(lngmax.innerText))
                        && (d.Setting == clicked)
                     }))}
            }
            else {
                lasso.items(d3.selectAll(".dot").filter(function(d) {return (version_filter.indexOf(d["HWISE Version"]) == 100)}))
            }
        }

        else {
            lasso.items(d3.selectAll(".dot").filter(function(d) {return (version_filter.indexOf(d["HWISE Version"]) == 100)}))
        }
    }
    lasso.items().style("fill", function(d) { return color(d[jun.color_standard]); }).style("opacity","1.0").attr("r",3.5);
}

// filter_list_ver2 : when specific marker is chosen : change lasso items and map markers
function filter_list_ver2(id_marker,option ) {    
    region_filter=["in", "Region"]
    if ($(region_select).val()){
        for (var i = 0; i < $(region_select).val().length;i++){
            region_filter.push( $(region_select).val()[i])
        }
    }
    version_filter =["in", "HWISE_Version"]
    if ($(Version_select).val()){
        for (var j = 0; j < $(Version_select).val().length;j++){
            version_filter.push( Number($(Version_select).val()[j]))
        }
    }
    lasso.items(d3.selectAll(".dot"));
    lasso.items().style("fill", "#c8c8c8").style("opacity","0.3").attr("r",3.5);
    if (version_filter[2]){
        if (region_filter[2]){
            if (year_value.innerText != "All"){
                if ((region_filter.indexOf(Region_search[id_marker]) >= 0) 
                    && (version_filter.indexOf(hwise_search[id_marker]) >= 0)
                    && (lat_search[id_marker] >= Number(latmin.innerText))
                    && (lat_search[id_marker] <= Number(latmax.innerText))
                    && (lng_search[id_marker] >= Number(lngmin.innerText))
                    && (lng_search[id_marker] <= Number(lngmax.innerText))
                    && (Year_search[id_marker] == Number(year_value.innerText)) 
                    ){
                        jun.map.flyTo({center : [lng_search[id_marker],lat_search[id_marker]], zoom:4.7})
                        openDesc(id_marker,option)
                        lasso.items(d3.selectAll(".dot").filter(function(d) {return (d.id_number == id_marker)
                            && (region_filter.indexOf(d.Region) >= 0) 
                            && (version_filter.indexOf(d["HWISE Version"]) >= 0)
                            && (d.Lat >= Number(latmin.innerText))
                            && (d.Lat <= Number(latmax.innerText))
                            && (d.Lng >= Number(lngmin.innerText))
                            && (d.Lng <= Number(lngmax.innerText))
                            && (d.Year == Number(year_value.innerText)) 
                         }))
                        lasso.items().style("fill", function(d) { return color(d[jun.color_standard ]); }).style("opacity","1.0").attr("r",7);
                   
                        lasso.items(d3.selectAll(".dot").filter(function(d) {return (region_filter.indexOf(d.Region) >= 0) 
                            && (version_filter.indexOf(d["HWISE Version"]) >= 0)
                            && (d.Lat >= Number(latmin.innerText))
                            && (d.Lat <= Number(latmax.innerText))
                            && (d.Lng >= Number(lngmin.innerText))
                            && (d.Lng <= Number(lngmax.innerText))
                            && (d.Year == Number(year_value.innerText)) 
                         }))

                        filter_combined = ["all", [">=", "Lat", Number(latmin.innerText)], ["<=", "Lat", Number(latmax.innerText)],
                            [">=", "Lng", Number(lngmin.innerText) ], ["<=", "Lng", Number(lngmax.innerText)],["==", "id_number", Number(id_marker)],["==","Year",Number(year_value.innerText)]]
                    }
                else {
                        lasso.items(d3.selectAll(".dot").filter(function(d) {return (region_filter.indexOf(d.Region) >= 0) 
                            && (version_filter.indexOf(d["HWISE Version"]) >= 0)
                            && (d.Lat >= Number(latmin.innerText))
                            && (d.Lat <= Number(latmax.innerText))
                            && (d.Lng >= Number(lngmin.innerText))
                            && (d.Lng <= Number(lngmax.innerText))
                            && (d.Year == Number(year_value.innerText)) 
                         }))
                        lasso.items().style("fill", function(d) { return color(d[jun.color_standard ]); }).style("opacity","1.0").attr("r",3.5);
                        filter_combined = ["all", [">=", "Lat", Number(latmin.innerText)], ["<=", "Lat", Number(latmax.innerText)],
                            [">=", "Lng", Number(lngmin.innerText) ], ["<=", "Lng", Number(lngmax.innerText)],["==","Year",Number(year_value.innerText)]]
                }
            }
            else {
                if ((region_filter.indexOf(Region_search[id_marker]) >= 0) 
                    && (version_filter.indexOf(hwise_search[id_marker]) >= 0)
                    && (lat_search[id_marker] >= Number(latmin.innerText))
                    && (lat_search[id_marker] <= Number(latmax.innerText))
                    && (lng_search[id_marker] >= Number(lngmin.innerText))
                    && (lng_search[id_marker] <= Number(lngmax.innerText))
                    ){
                        jun.map.flyTo({center : [lng_search[id_marker],lat_search[id_marker]], zoom:4.7})
                        openDesc(id_marker,option)
                        lasso.items(d3.selectAll(".dot").filter(function(d) {return (d.id_number == id_marker)
                            && (region_filter.indexOf(d.Region) >= 0) 
                            && (version_filter.indexOf(d["HWISE Version"]) >= 0)
                            && (d.Lat >= Number(latmin.innerText))
                            && (d.Lat <= Number(latmax.innerText))
                            && (d.Lng >= Number(lngmin.innerText))
                            && (d.Lng <= Number(lngmax.innerText))
                        }))   
                        lasso.items().style("fill", function(d) { return color(d[jun.color_standard ]); }).style("opacity","1.0").attr("r",7);
                        lasso.items(d3.selectAll(".dot").filter(function(d) {return (region_filter.indexOf(d.Region) >= 0) 
                            && (version_filter.indexOf(d["HWISE Version"]) >= 0)
                            && (d.Lat >= Number(latmin.innerText))
                            && (d.Lat <= Number(latmax.innerText))
                            && (d.Lng >= Number(lngmin.innerText))
                            && (d.Lng <= Number(lngmax.innerText))
                        }))

                        filter_combined = ["all", [">=", "Lat", Number(latmin.innerText)], ["<=", "Lat", Number(latmax.innerText)],
                            [">=", "Lng", Number(lngmin.innerText) ], ["<=", "Lng", Number(lngmax.innerText)],["==","id_number",Number(id_marker)]]
                    }
                else {
                        lasso.items(d3.selectAll(".dot").filter(function(d) {return (region_filter.indexOf(d.Region) >= 0) 
                            && (version_filter.indexOf(d["HWISE Version"]) >= 0)
                            && (d.Lat >= Number(latmin.innerText))
                            && (d.Lat <= Number(latmax.innerText))
                            && (d.Lng >= Number(lngmin.innerText))
                            && (d.Lng <= Number(lngmax.innerText))
                        }))
                        lasso.items().style("fill", function(d) { return color(d["Site Name"]); }).style("opacity","1.0").attr("r",3.5);
                        filter_combined = ["all", [">=", "Lat", Number(latmin.innerText)], ["<=", "Lat", Number(latmax.innerText)],
                            [">=", "Lng", Number(lngmin.innerText) ], ["<=", "Lng", Number(lngmax.innerText)]]
                }
            }
        }
        else {
            lasso.items(d3.selectAll(".dot").filter(function(d) {return (version_filter.indexOf(d["HWISE Version"]) == 100)}))
        }
    }
    else {
        lasso.items(d3.selectAll(".dot").filter(function(d) {return (version_filter.indexOf(d["HWISE Version"]) == 100)}))
    }
    if (version_filter[2]){
        if (region_filter[2]) {
            filter_combined.push(region_filter)
            filter_combined.push(version_filter)
        }
        else { 
            filter_combined.push(["in", "HWISE_Version",100])
        }
    }
    else {
        filter_combined.push(["in", "HWISE_Version",100])
    }
    jun.map.setFilter("points", filter_combined)
}

// filter_list_ver3 : for change list : 
function filter_list_ver3(clicked ="") {    
    region_filter1=[]
    if ($(region_select).val()){
        for (var i = 0; i < $(region_select).val().length;i++){
            region_filter1.push( $(region_select).val()[i])
        }
    }
    version_filter1 =[]
    if ($(Version_select).val()){
        for (var j = 0; j < $(Version_select).val().length;j++){
            version_filter1.push( Number($(Version_select).val()[j]))
        }
    }

if (clicked == "" ){
    if (version_filter1[0]){
        if (region_filter1[0]) {
            if (year_value.innerText != "All"){
                final_filter = '(region_filter1.indexOf(Region_search[i]) >= 0) '+
                    '&& (version_filter1.indexOf(hwise_search[i]) >= 0)'+ 
                    '&& (lat_search[i] >= Number(latmin.innerText)) '+
                    '&& (lat_search[i] <= Number(latmax.innerText)) '+
                    '&& (lng_search[i] >= Number(lngmin.innerText)) '+
                    '&& (lng_search[i] <= Number(lngmax.innerText)) '+
                    '&& (Year_search[i] == Number(year_value.innerText)) '
            }
            else {
                final_filter = '(region_filter1.indexOf(Region_search[i]) >= 0) '+
                    '&& (version_filter1.indexOf(hwise_search[i]) >= 0)'+ 
                    '&& (lat_search[i] >= Number(latmin.innerText)) '+
                    '&& (lat_search[i] <= Number(latmax.innerText)) '+
                    '&& (lng_search[i] >= Number(lngmin.innerText)) '+
                    '&& (lng_search[i] <= Number(lngmax.innerText)) '
            }
        }
        else {
            final_filter = '(hwise_search[i]) == 100)'
        }
    }
    else {
        final_filter = '(hwise_search[i]) == 100)'
    }
}
else { 
    if (version_filter1[0]){
        if (region_filter1[0]) {
            if (year_value.innerText != "All"){
                final_filter = '(region_filter1.indexOf(Region_search[i]) >= 0) '+
                    '&& (version_filter1.indexOf(hwise_search[i]) >= 0)'+ 
                    '&& (lat_search[i] >= Number(latmin.innerText)) '+
                    '&& (lat_search[i] <= Number(latmax.innerText)) '+
                    '&& (lng_search[i] >= Number(lngmin.innerText)) '+
                    '&& (lng_search[i] <= Number(lngmax.innerText)) '+
                    '&& (Year_search[i] == Number(year_value.innerText)) '+
                    '&& (Setting_search[i] == clicked)'
            }
            else {
                final_filter = '(region_filter1.indexOf(Region_search[i]) >= 0) '+
                    '&& (version_filter1.indexOf(hwise_search[i]) >= 0)'+ 
                    '&& (lat_search[i] >= Number(latmin.innerText)) '+
                    '&& (lat_search[i] <= Number(latmax.innerText)) '+
                    '&& (lng_search[i] >= Number(lngmin.innerText)) '+
                    '&& (lng_search[i] <= Number(lngmax.innerText)) '+
                    '&& (Setting_search[i] == clicked)'
            }
        }
        else {
            final_filter = '(hwise_search[i]) == 100)'
        }
    }
    else {
        final_filter = '(hwise_search[i]) == 100)'
    }
}
    return [region_filter1, version_filter1, final_filter]
}

function filter_list_ver4(id_marker) {    
    id_marker= Number(id_marker)
    region_filter2=[]
    if ($(region_select).val()){
        for (var i = 0; i < $(region_select).val().length;i++){
            region_filter2.push( $(region_select).val()[i])
        }
    }
    version_filter2 =[]
    if ($(Version_select).val()){
        for (var j = 0; j < $(Version_select).val().length;j++){
            version_filter2.push( Number($(Version_select).val()[j]))
        }
    }

    if (version_filter2[0]){
        if (region_filter2[0]){
            if (year_value.innerText != "All"){
                if ((region_filter2.indexOf(Region_search[id_marker]) >= 0) 
                    && (version_filter2.indexOf(hwise_search[id_marker]) >= 0)
                    && (lat_search[id_marker] >= Number(latmin.innerText))
                    && (lat_search[id_marker] <= Number(latmax.innerText))
                    && (lng_search[id_marker] >= Number(lngmin.innerText))
                    && (lng_search[id_marker] <= Number(lngmax.innerText))
                    && (Year_search[id_marker] == Number(year_value.innerText)) 
                    ){
                        final_filter = '(id_search[i] == id_number) '+
                            '&& (region_filter2.indexOf(Region_search[i]) >= 0) '+
                            '&& (version_filter2.indexOf(hwise_search[i]) >= 0)'+ 
                            '&& (lat_search[i] >= Number(latmin.innerText)) '+
                            '&& (lat_search[i] <= Number(latmax.innerText)) '+
                            '&& (lng_search[i] >= Number(lngmin.innerText)) '+
                            '&& (lng_search[i] <= Number(lngmax.innerText)) '+
                            '&& (Year_search[i] == Number(year_value.innerText)) '
                     }
                else {
                        final_filter = '(region_filter2.indexOf(Region_search[i]) >= 0) '+
                            '&& (version_filter2.indexOf(hwise_search[i]) >= 0)'+ 
                            '&& (lat_search[i] >= Number(latmin.innerText)) '+
                            '&& (lat_search[i] <= Number(latmax.innerText)) '+
                            '&& (lng_search[i] >= Number(lngmin.innerText)) '+
                            '&& (lng_search[i] <= Number(lngmax.innerText)) '+
                            '&& (Year_search[i] == Number(year_value.innerText)) '
                    }
            }
            else {
                if ((region_filter2.indexOf(Region_search[id_marker]) >= 0) 
                    && (version_filter2.indexOf(hwise_search[id_marker]) >= 0)
                    && (lat_search[id_marker] >= Number(latmin.innerText))
                    && (lat_search[id_marker] <= Number(latmax.innerText))
                    && (lng_search[id_marker] >= Number(lngmin.innerText))
                    && (lng_search[id_marker] <= Number(lngmax.innerText))
                    ){
                       
                        final_filter = '(id_search[i] == id_number) '+
                            '&& (region_filter2.indexOf(Region_search[i]) >= 0) '+
                            '&& (version_filter2.indexOf(hwise_search[i]) >= 0)'+ 
                            '&& (lat_search[i] >= Number(latmin.innerText)) '+
                            '&& (lat_search[i] <= Number(latmax.innerText)) '+
                            '&& (lng_search[i] >= Number(lngmin.innerText)) '+
                            '&& (lng_search[i] <= Number(lngmax.innerText)) '
                    } 
                else {
                        final_filter = '(region_filter2.indexOf(Region_search[i]) >= 0) '+
                            '&& (version_filter2.indexOf(hwise_search[i]) >= 0)'+ 
                            '&& (lat_search[i] >= Number(latmin.innerText)) '+
                            '&& (lat_search[i] <= Number(latmax.innerText)) '+
                            '&& (lng_search[i] >= Number(lngmin.innerText)) '+
                            '&& (lng_search[i] <= Number(lngmax.innerText)) '
                        }
                }
        }
        else {
            final_filter = '(hwise_search[i]) == 100)'
        }
    }
    else {
        final_filter = '(hwise_search[i]) == 100)'
    }
    return [region_filter2, version_filter2, final_filter]
}

// search engine //
var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    if (q=="") { 
        var matches 
        matches = [];
        substrRegex = new RegExp(q, 'i');
        $.each(strs, function(i, str) {
            matches.push(str);
        });
        cb(matches);
    }
    else { 
        var matches, substringRegex;
        matches = [];
        substrRegex = new RegExp(q, 'i');
        $.each(strs, function(i, str) {
          if (substrRegex.test(str)) {
            matches.push(str);
          }
        });
        cb(matches);
    } 
  };  
};


// navigation bar
function openNav() {
    document.getElementById("mySidenav").style.width = "20%";
    document.getElementById("mySidenav").style.opacity = "1";
    closeLister()
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "1%";
    document.getElementById("mySidenav").style.opacity="0.0";
}

function openLister() {
    document.getElementById("Lister").style.width = "20%"; 
    document.getElementById("Lister").style.opacity = "1";
    if ($('#Lister').children().length==1){
        version2()
    }
    closeNav()
}

function filtertolist() {
    closeNav() 
    openLister()
}
function listtofilter() { 
    closeLister() 
    openNav()
}

function closeLister() {
    document.getElementById("Lister").style.width = "0%"; 
    document.getElementById("Lister").style.opacity = "0.0";
}

function openDesc(idid, option) { 
    closeNav()
    closeLister()   
    document.getElementById("Desc").style.width= "20%";
    document.getElementById("Desc").style.opacity="1"
    if (option == 1 ){
        document.getElementById("Desc").innerHTML = "<a class='closebtn' onclick='closeDesc()''>&times;</a>"  
    }
    else {
        document.getElementById("Desc").innerHTML = "<a class='closebtn' onclick='closeDesc1()''>&times;</a>"  
    }

    document.getElementById("Desc").innerHTML += "<span style='text-align:center; color : white;margin:auto'> <div class='desc_top'>"+site_search[idid]+
        "</div> <img src='scripts/images/Photos/"+site_search[idid]+"_1.jpg'  alt='no image yet' style=' width: 100%; height:auto'><br><br>\
        <div class='whole_table'><table> <tr> <td>Latitude</td> <td>"+Number(lat_search[idid]) +
        "</td> </tr> <tr> <td>Longitude</td><td> "+Number(lng_search[idid]) +
        "</td> </tr> <tr> <td> HWISE Version</td><td> "+hwise_search[idid] +
        "</td> </tr> <tr> <td>Participants</td><td> " + Participants_search[idid] +
        "</td> </tr> <tr> <td> GNI</td><td> " + (GNI_search[idid]*1000).toLocaleString() +
        " USD</td> </tr> <tr> <td>Region</td><td>  " +Region_search[idid] +
        "</td> </tr> <tr> <td>Partners</td><td> "+ Partners_search[idid] +
        "</td> </tr> <tr> <td>Setting</td><td>"+Setting_search[idid] +
        "</td> </tr> <tr> <td>Sampling</td><td>" + Sampling_search[idid] + 
        "</td> </tr> <tr> <td>Climate</td><td>" + Climate_search[idid] +
        "</td> </tr> <tr> <td>Gender</td><td> male - "+ ((100-Female_search[idid]).toFixed(1)) +"% <br /> female - "+Female_search[idid].toFixed(1) +"%</td></table></div>"
    document.getElementById("Lister").style.width = "0%"; 
    document.getElementById("Lister").style.opacity = "0.0";
    water_level_exit()
    water_level_enter(Improved_search[idid],hwise_search[idid])
}

function closeDesc() { 
    document.getElementById("Desc").innerHTML = ""
    document.getElementById("Desc").style.width= "0%" 
    openNav()
    clearit()
    water_level_exit()
}

function closeDesc1() { 
    document.getElementById("Desc").innerHTML = ""
    document.getElementById("Desc").style.width= "0%" 
    openLister()
    clearit()
    water_level_exit()
}

function linklink(id_number){
    closeLister()
    filter_list_ver2(id_number,2)
    ver4_result = filter_list_ver4(id_number)
    region_filter2 = ver4_result[0]
    version_filter2 = ver4_result[1]
    yes_chosen1 = []
    for (var i = 0; i < site_search.length; i++){
        if (eval(ver4_result[2])) {
            yes_chosen1.push(i)
        } 
    }
    version1(yes_chosen1) 
}

function clearit() { 
    jun.map.setFilter("points", null)
    $('#region_select').multipleSelect("checkAll");
    $('#Version_select').multipleSelect("checkAll");  
    lasso.items(d3.selectAll(".dot"));
    lasso.items().style("fill", function(d) { return color(d[jun.color_standard]); }).style("opacity","1.0").attr("r",3.5);
    jun.map.flyTo({center : [jun.default_center_first, jun.default_center_second], zoom:1.3})
    
    jun.clicked = ""
    $('.typeahead').typeahead('val', '')
    version2()

    document.getElementById("results_num").innerText = site_search.length
    document.getElementById("latmin").innerText = (-90.00).toFixed(2)
    document.getElementById("latmax").innerText = 90.00.toFixed(2)
    document.getElementById("lngmin").innerText = (-180.00).toFixed(2)
    document.getElementById("lngmax").innerText = 180.00.toFixed(2)
    document.getElementsByClassName("d3-slider-range")[0].style.left = "0%"
    document.getElementsByClassName("d3-slider-range")[0].style.right = "0%"     
    document.getElementsByClassName("d3-slider-range")[1].style.left = "0%"
    document.getElementsByClassName("d3-slider-range")[1].style.right = "0%" 

    document.getElementsByClassName("d3-slider-handle")[0].style.left = "0%"
    document.getElementsByClassName("d3-slider-handle")[1].style.left = "100%" 
    document.getElementsByClassName("d3-slider-handle")[2].style.left = "0%"
    document.getElementsByClassName("d3-slider-handle")[3].style.left = "100%" 

    document.getElementById('third_bar').click();
}

function list_changer() {
    ver3_result = filter_list_ver3(clicked =jun.clicked)
    region1_filter = ver3_result[0]
    version1_filter = ver3_result[1]
    yes_chosen =[]
    for (var i = 0; i < site_search.length; i++){
        if (eval(ver3_result[2])) {
            yes_chosen.push(i)
        } 
    }
    version1(yes_chosen)
    return yes_chosen
}

function center_changer() { 
    multiple_selected = list_changer()
    if (multiple_selected.length >= 1){
        multiple_selected_lat = []
        multiple_selected_lng = []
        for (var k = 0; k < multiple_selected.length; k++){
          multiple_selected_lat.push(lat_search[multiple_selected[k]])
          multiple_selected_lng.push(lng_search[multiple_selected[k]])
        }
        jun.map.flyTo({center : [(Math.max(...multiple_selected_lng)+Math.min(...multiple_selected_lng))/2,(Math.max(...multiple_selected_lat)+Math.min(...multiple_selected_lat))/2],zoom:1.3})
        document.getElementById("results_num").innerText = (multiple_selected.length)
    }
    else {
        document.getElementById("results_num").innerText = 0
    }  
}

function version2(){
    collector = ""
    for (var i = 0; i < site_search.length; i++){
        if (i==0) { 
            collector  += '<tr><td> <div class ="region_division"> Middle East & North Africa </div> </td></tr>'
        }
        else if (i== 1){
            collector  += '<tr><td><div class ="region_division"> Africa </div></td></tr>'
        }
        else if (i == 11){
            collector  += '<tr><td><div class ="region_division"> Latin American & the Caribbean </div> </td></tr>'
        }
        else if (i == 19){
            collector  += '<tr><td><div class ="region_division"> East Asia and Pacific </div></td></tr>'
        }
        else if (i == 20){
            collector  += '<tr><td><div class ="region_division"> South Asia </div></td></tr>'
        }
        else if (i == 23){
            collector  += '<tr><td><div class ="region_division"> Europe and Central Asia </div></td></tr>'
        }
        collector += "<tr><td><span class='list_element_yes' id='"+i+"_list' onclick='linklink("+i+")'>"+ site_search[i]+"</span></td></tr>"
    }
    document.getElementById("Lister").innerHTML = "<a class='closebtn' onclick='closeLister()''>&times;</a><h3> Research Sites </h3> <table>"+ collector+ 
    "</table><button id = 'clear1' class='button1' value ='clear' onclick = 'clearit()'>clear</button>\
     <button id = 'search_view' class='button1' value ='clear' onclick = 'listtofilter()'>Search View</button>"
}

function version1(standard){
    collector =""
  for (var i = 0 ; i < site_search.length; i ++){
     if (i==0) { 
          collector  += '<tr><td> <div class ="region_division"> Middle East & North Africa </div> </td></tr>'
      }
      else if (i== 1){
          collector += '<tr><td><div class ="region_division"> Africa </div></td></tr>'
      }
      else if (i == 11){
          collector  += '<tr><td><div class ="region_division"> Latin America & the Carribean </div> </td></tr>'
      }
      else if (i == 19){
          collector  += '<tr><td><div class ="region_division"> East Asia and Pacific </div></td></tr>'
      }
      else if (i == 20){
          collector  += '<tr><td><div class ="region_division"> South Asia </div></td></tr>'
      }
      else if (i == 23){
          collector += '<tr><td><div class ="region_division"> Europe and Central Asia </div></td></tr>'
      }
      if ((typeof standard) == "number") {
        if (i == id_marker) {
              collector += "<tr><td><span class='list_element_yes' id='"+i+"_list' onclick='linklink("+i+")'>"+ site_search[i]+"</span><br></td></tr>"
        }
        else {
              collector += "<tr><td><span class='list_element_no' id='"+i+"_list' >"+ site_search[i]+"</span><br></td></tr>"
        }
      }
      else { 
        if (standard.indexOf(i) >= 0) {
              collector += "<tr><td><span class='list_element_yes' id='"+i+"_list' onclick='linklink("+i+")'>"+ site_search[i]+"</span><br></td></tr>"
        }
        else {
              collector += "<tr><td><span class='list_element_no' id='"+i+"_list' >"+ site_search[i]+"</span><br></td></tr>"
        }
      }
  }
    document.getElementById("Lister").innerHTML = "<a class='closebtn' onclick='closeLister()''>&times;</a><h3> Research Sites </h3> <table>"+ collector+ 
        "</table> <button id = 'clear1' class='button1' value ='clear' onclick = 'clearit()'>clear</button>\
        <button id = 'search_view' class='button1' value ='clear' onclick = 'listtofilter()'>Search View</button>"
}

function water_level_enter(value, hwise) {
    // document.getElementById("third_bar").style.opacity = 0
    document.getElementById("third_bar").style.zIndex = "-2" 
    var btn = d3.select("#map_part").insert("svg",'#credit')
    btn.attr("id", "fillgauge1")    
        .attr("width", 148)
        .attr("height", 148)
        .attr("viewBox","0 0 148 148")
        .attr("style", "position : absolute; left: 50% ; margin-left: -74px; bottom : 50px") 

    if (hwise == 1 ) {
        loadLiquidFillGauge("fillgauge1", value, config1);
    }
    else {
        loadLiquidFillGauge("fillgauge1", value, config2); 
    }
    document.getElementById("line_title").style.opacity = 1
}
function water_level_exit() { 
    document.getElementById("third_bar").style.zIndex = "5"
    d3.select("#fillgauge1").remove()
    document.getElementById("line_title").style.opacity = 0
}






