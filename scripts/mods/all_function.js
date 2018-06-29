function filter_list() {    
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

    filter_combined = ["all", [">=", "Lat", Number(latmin.innerText)], ["<=", "Lat", Number(latmax.innerText) ],[">=", "Lng", Number(lngmin.innerText) ], ["<=", "Lng", Number(lngmax.innerText)]]

    if (region.innerText != "All") {
        filter_combined.push(["==","Year",Number(region.innerText)])
    }

    d3.json('scripts/data/data2.json',function(finished_data) {
        jun.data = finished_data
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
        jun_map.setFilter("points", filter_combined)
    })

    lasso.items(d3.selectAll(".dot"));
    lasso.items().style("fill", "#c8c8c8").style("opacity","0.3").attr("r",3.5);

    if (version_filter[2]){
        if (region_filter[2]) {
            if (region.innerText != "All"){
                lasso.items(d3.selectAll(".dot").filter(function(d) {return (region_filter.indexOf(d.Region) >= 0) 
                    && (version_filter.indexOf(d["HWISE Version"]) >= 0)
                    && (d.Lat >= Number(latmin.innerText))
                    && (d.Lat <= Number(latmax.innerText))
                    && (d.Lng >= Number(lngmin.innerText))
                    && (d.Lng <= Number(lngmax.innerText))
                    && (d.Year == Number(region.innerText)) 
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

    lasso.items().style("fill", function(d) { return color(d["Site Name"]); }).style("opacity","1.0").attr("r",3.5);
}








function filter_list_ver2(id_marker) {    
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
            if (region.innerText != "All"){
                if ((region_filter.indexOf(Region_search[id_marker]) >= 0) 
                    && (version_filter.indexOf(hwise_version_search[id_marker]) >= 0)
                    && (lat_search[id_marker] >= Number(latmin.innerText))
                    && (lat_search[id_marker] <= Number(latmax.innerText))
                    && (lng_search[id_marker] >= Number(lngmin.innerText))
                    && (lng_search[id_marker] <= Number(lngmax.innerText))
                    && (Year_search[id_marker] == Number(region.innerText)) 
                    ){
                        jun_map.flyTo({center : [lng_search[id_marker],lat_search[id_marker]], zoom:4})
                        openDesc(regions_search[id_marker], lat_search[id_marker], lng_search[id_marker], hwise_version_search[id_marker], Participants_search[id_marker], GNI_search[id_marker], Region_search[id_marker])
                        lasso.items(d3.selectAll(".dot").filter(function(d) {return (d.id_number == id_marker)
                            && (region_filter.indexOf(d.Region) >= 0) 
                            && (version_filter.indexOf(d["HWISE Version"]) >= 0)
                            && (d.Lat >= Number(latmin.innerText))
                            && (d.Lat <= Number(latmax.innerText))
                            && (d.Lng >= Number(lngmin.innerText))
                            && (d.Lng <= Number(lngmax.innerText))
                            && (d.Year == Number(region.innerText)) 
                         }))
                        lasso.items().style("fill", function(d) { return color(d["Site Name"]); }).style("opacity","1.0").attr("r",7);
                   
                        lasso.items(d3.selectAll(".dot").filter(function(d) {return (region_filter.indexOf(d.Region) >= 0) 
                            && (version_filter.indexOf(d["HWISE Version"]) >= 0)
                            && (d.Lat >= Number(latmin.innerText))
                            && (d.Lat <= Number(latmax.innerText))
                            && (d.Lng >= Number(lngmin.innerText))
                            && (d.Lng <= Number(lngmax.innerText))
                            && (d.Year == Number(region.innerText)) 
                         }))

                        filter_combined = ["all", [">=", "Lat", Number(latmin.innerText)], ["<=", "Lat", Number(latmax.innerText)],
                            [">=", "Lng", Number(lngmin.innerText) ], ["<=", "Lng", Number(lngmax.innerText)],["==", "id_number", Number(id_marker)],["==","Year",Number(region.innerText)]]
                        console.log("aajajajaaj")
                    }
                else {
                        lasso.items(d3.selectAll(".dot").filter(function(d) {return (region_filter.indexOf(d.Region) >= 0) 
                            && (version_filter.indexOf(d["HWISE Version"]) >= 0)
                            && (d.Lat >= Number(latmin.innerText))
                            && (d.Lat <= Number(latmax.innerText))
                            && (d.Lng >= Number(lngmin.innerText))
                            && (d.Lng <= Number(lngmax.innerText))
                            && (d.Year == Number(region.innerText)) 
                         }))
                        lasso.items().style("fill", function(d) { return color(d["Site Name"]); }).style("opacity","1.0").attr("r",3.5);
                        filter_combined = ["all", [">=", "Lat", Number(latmin.innerText)], ["<=", "Lat", Number(latmax.innerText)],
                            [">=", "Lng", Number(lngmin.innerText) ], ["<=", "Lng", Number(lngmax.innerText)],["==","Year",Number(region.innerText)]]
                }
            }
            else {
                if ((region_filter.indexOf(Region_search[id_marker]) >= 0) 
                    && (version_filter.indexOf(hwise_version_search[id_marker]) >= 0)
                    && (lat_search[id_marker] >= Number(latmin.innerText))
                    && (lat_search[id_marker] <= Number(latmax.innerText))
                    && (lng_search[id_marker] >= Number(lngmin.innerText))
                    && (lng_search[id_marker] <= Number(lngmax.innerText))
                    ){
                        jun_map.flyTo({center : [lng_search[id_marker],lat_search[id_marker]], zoom:4})
                        openDesc(regions_search[id_marker], lat_search[id_marker], lng_search[id_marker], hwise_version_search[id_marker], Participants_search[id_marker], GNI_search[id_marker], Region_search[id_marker])
                        lasso.items(d3.selectAll(".dot").filter(function(d) {return (d.id_number == id_marker)
                            && (region_filter.indexOf(d.Region) >= 0) 
                            && (version_filter.indexOf(d["HWISE Version"]) >= 0)
                            && (d.Lat >= Number(latmin.innerText))
                            && (d.Lat <= Number(latmax.innerText))
                            && (d.Lng >= Number(lngmin.innerText))
                            && (d.Lng <= Number(lngmax.innerText))
                        }))   
                        lasso.items().style("fill", function(d) { return color(d["Site Name"]); }).style("opacity","1.0").attr("r",7);
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
    d3.json('scripts/data/data2.json',function(finished_data) {
        jun.data = finished_data
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
        jun_map.setFilter("points", filter_combined)
    })

}




// search engine //
var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;
    // an array that will be populated with substring matches
    matches = [];
    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');
    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });
    cb(matches);
  };
};









function drawMarkers(criteria1, left_end1, right_end1, criteria2, left_end2, right_end2) { 
//////////////////////////// filtering based on criteria ////////////////////////////
    left_end1 = Number(left_end1)
    right_end1 = Number(right_end1)
    left_end2 = Number(left_end2)
    right_end2 = Number(right_end2)
    var index_point = 0
    var filtered=[]
    for (var i = 0; i < jun.data.length; i++) {
        filtered[index_point] = {
            "type" : "Feature", 
            "properties": { 
                "SiteName": jun.data[i]["Site Name"],
                "HWISE_Version": jun.data[i]["HWISE Version"],
                "Participants": jun.data[i]["Participants"],
                "GNI": jun.data[i]["GNI"],
                "Region": jun.data[i]["Region"],
                "Lat" : jun.data[i]["Lat"],
                "Lng" : jun.data[i]["Lng"],
                "Year" : jun.data[i]["Year"] ,
                "id_number" : jun.data[i]["id_number"]
            },
            "geometry" : {
                "type" : "Point",
                "coordinates": [jun.data[i]["Lng"],jun.data[i]["Lat"]]
            }
        }
        index_point =index_point+1 
        regions_search.push(jun.data[i]["Site Name"])
        hwise_version_search.push(jun.data[i]["HWISE Version"])
        Participants_search.push(jun.data[i]["Participants"])
        GNI_search.push(jun.data[i]["GNI"])
        Region_search.push(jun.data[i]["Region"])
        lat_search.push(jun.data[i]["Lat"])
        lng_search.push(jun.data[i]["Lng"])
        Year_search.push(jun.data[i]["Year"])
    }
//////////////////////////// Mapping points ////////////////////////////
    jun_map.on('load', function () {
        jun_map.loadImage("/scripts/images/map_marker_resized.png", function(error, image) {
            if (error) throw error;
        jun_map.addImage("custom-marker", image);
        jun_map.addSource("source1", {
                            "type": "geojson",
                            "data": {
                                    "type": "FeatureCollection",
                                    "features": filtered}})
        jun_map.addLayer({
            "id": "points",
            "type": "symbol",
            "source": "source1",
            "filter": ["all", [">=", criteria1, left_end1 ], ["<=", criteria1, right_end1], [">=",criteria2, left_end2 ], ["<=", criteria2, right_end2 ]],
            "layout": {
                "icon-image": "custom-marker",
                "icon-allow-overlap": true,
                "icon-anchor":"bottom",
                "text-field": "{SiteName}",
                "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                "text-offset": [0, 0],
                "text-anchor": "center"     
                }
            })
        })
    })
};


// navigation bar
function openNav() {
    document.getElementById("mySidenav").style.width = "20%";
    document.getElementById("mySidenav").style.opacity = "0.9";
    document.getElementById("openner").style.opacity = "0";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "1%";
    document.getElementById("mySidenav").style.opacity="0.0";
    document.getElementById("openner").style.opacity = "0.9";
}

function openDesc(SiteName, lat, lng, HWISE_Version, Participants, GNI, Region) { 
    document.getElementById("mySidenav").style.width = "1%";
    document.getElementById("mySidenav").style.opacity="0.0";
    document.getElementById("openner").style.opacity = "0";
    document.getElementById("Desc").style.width= "20%";
    document.getElementById("Desc").style.opacity="0.9"
    document.getElementById("Desc").innerHTML = "<a class='closebtn' onclick='closeDesc()''>&times;</a> <br> <span style='text-align:center; color : white;margin:auto'> <div class='desc_top'>"+SiteName+"</div> <img src='scripts/images/Photos/" 
        +SiteName+"_1.jpg'  alt='need image' style=' width: 100%; height:auto'><br><br> <p>Lat: "+Number(lat)+"<p>Lng: "+Number(lng)
        +"<p>HWISE Version: "+HWISE_Version +"<p>Participants: " + Participants 
        +"<p>GNI: " + GNI + "<p>Region: " + Region+"</span>"
}

function closeDesc() { 
    document.getElementById("Desc").innerHTML = ""
    document.getElementById("Desc").style.width= "0%" 
    openNav()
}


