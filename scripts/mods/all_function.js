// drawMarkers : when the page loads 
//      main role : draw markers
function drawMarkers() { 
    var filtered=[]
    for (var i = 0; i < jun.data.length; i++) {
        if (jun.data[i]["HWISE Version"]==1){
            filtered[i] = {
                "type" : "Feature", 
                "properties": { 
                    "SiteName": jun.data[i]["Site Name"],
                    "HWISE_Version": jun.data[i]["HWISE Version"],
                    // "GNI": jun.data[i]["GNI"],
                    "Region": jun.data[i]["Region"],
                    "Lat" : jun.data[i]["Lat"],
                    "Lng" : jun.data[i]["Lng"],
                    "Start" : jun.data[i]["start"] ,
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
            filtered[i] = {
                "type" : "Feature", 
                "properties": { 
                    "SiteName": jun.data[i]["Site Name"],
                    "HWISE_Version": jun.data[i]["HWISE Version"],
                    // "GNI": jun.data[i]["GNI"],
                    "Region": jun.data[i]["Region"],
                    "Lat" : jun.data[i]["Lat"],
                    "Lng" : jun.data[i]["Lng"],
                    "Start" : jun.data[i]["start"] ,
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
        Id_search.push(jun.data[i]["id_number"])
        Region_search.push(jun.data[i]["Region"])
        Site_search.push(jun.data[i]["Site Name"])
        Hwise_search.push(jun.data[i]["HWISE Version"])
        Partners_search.push(jun.data[i]["Partners"])
        Setting_search.push(jun.data[i]["Setting"])
        Sampling_search.push(jun.data[i]["Sampling"])
        Cognitive_search.push(jun.data[i]["Cognitive Interviewing"])
        Participants_search.push(jun.data[i]["Participants"])
        Period_search.push(jun.data[i]["Dates of Data Collection"])
        Start_search.push(jun.data[i]["start"])
        Female_search.push(jun.data[i]["Female"])
        Main_source_search.push(jun.data[i]["Main Sources of Drinking Water"])
        Main_search.push(jun.data[i]["Main"])
        Source_search.push(jun.data[i]["Source"])
        Climate_search.push(jun.data[i]["Climate"])
        Lat_search.push(jun.data[i]["Lat"])
        Lng_search.push(jun.data[i]["Lng"])
        Improved_search.push(jun.data[i]["Improved_water"])
        // GNI_search.push(jun.data[i]["GNI"])
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
                        "icon-size" : 0.15,
                        "text-field": "{SiteName}",
                        "text-font": ["Roboto Bold"],
                        "text-size" : 12,
                        "text-offset": [0,-0.4],
                        "text-anchor": "top",  
                        "text-optional" : true,
                        // "text-allow-overlap": true,
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

// filter_list : when bottom slider is moved / when "select" button is pressed 
//      input : clicked(optional) 
//      output : [region_filter.slice(2), version_filter.slice(2), final_filter]
//                  list of strings         list of strings         string
//      main role : set filter to markers
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

    filter_combined = ["all"]
     // if (clicked == "") {     
    //     filter_combined = ["all", [">=", "Lat", Number(latmin.innerText)], ["<=", "Lat", Number(latmax.innerText) ],
    //         [">=", "Lng", Number(lngmin.innerText) ], ["<=", "Lng", Number(lngmax.innerText)]]    
    // }
    // else {
    //     filter_combined = ["all", [">=", "Lat", Number(latmin.innerText)], ["<=", "Lat", Number(latmax.innerText) ],
    //                         [">=", "Lng", Number(lngmin.innerText) ], ["<=", "Lng", Number(lngmax.innerText)],
    //                         ["==", "Setting", clicked]]
    // }
    if (year_value.innerText != "All") {
        filter_combined.push(["==","Start",year_value.innerText])
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
    // lasso.items(d3.selectAll(".dot"));
    // lasso.items().style("fill", "#c8c8c8").style("opacity","0.3").attr("r",3.5);
    // if (clicked =="") { 
        // if (version_filter[2]){
        //     if (region_filter[2]) {
        //         if (year_value.innerText != "All"){
        //             lasso.items(d3.selectAll(".dot").filter(function(d) {return (region_filter.indexOf(d.Region) >= 0) 
        //                 && (version_filter.indexOf(d["HWISE Version"]) >= 0)
                        // && (d.Lat >= Number(latmin.innerText))
                        // && (d.Lat <= Number(latmax.innerText))
                        // && (d.Lng >= Number(lngmin.innerText))
                        // && (d.Lng <= Number(lngmax.innerText))
                //         && (d.Year == Number(year_value.innerText)) 
                //      }))}
                // else {
                //      lasso.items(d3.selectAll(".dot").filter(function(d) {return (region_filter.indexOf(d.Region) >= 0) 
                //         && (version_filter.indexOf(d["HWISE Version"]) >= 0)
                        // && (d.Lat >= Number(latmin.innerText))
                        // && (d.Lat <= Number(latmax.innerText))
                        // && (d.Lng >= Number(lngmin.innerText))
                        // && (d.Lng <= Number(lngmax.innerText))
        //              }))
        //         }
        //     }
        //     else {
        //         lasso.items(d3.selectAll(".dot").filter(function(d) {return (version_filter.indexOf(d["HWISE Version"]) == 100)}))
        //     }
        // }
        // else {
        //     lasso.items(d3.selectAll(".dot").filter(function(d) {return (version_filter.indexOf(d["HWISE Version"]) == 100)}))
        // }
    // }
    // else {
    //     if (version_filter[2]){
    //         if (region_filter[2]) {
    //             if (year_value.innerText != "All"){
    //                 lasso.items(d3.selectAll(".dot").filter(function(d) {return (region_filter.indexOf(d.Region) >= 0) 
    //                     && (version_filter.indexOf(d["HWISE Version"]) >= 0)
    //                     // && (d.Lat >= Number(latmin.innerText))
    //                     // && (d.Lat <= Number(latmax.innerText))
    //                     // && (d.Lng >= Number(lngmin.innerText))
    //                     // && (d.Lng <= Number(lngmax.innerText))
    //                     && (d.Year == Number(year_value.innerText)
    //                     && (d.Setting == clicked)) 
    //                  }))}
    //             else {
    //                  lasso.items(d3.selectAll(".dot").filter(function(d) {return (region_filter.indexOf(d.Region) >= 0) 
    //                     && (version_filter.indexOf(d["HWISE Version"]) >= 0)
    //                     // && (d.Lat >= Number(latmin.innerText))
    //                     // && (d.Lat <= Number(latmax.innerText))
    //                     // && (d.Lng >= Number(lngmin.innerText))
    //                     // && (d.Lng <= Number(lngmax.innerText))
    //                     && (d.Setting == clicked)
    //                  }))}
    //         }
    //         else {
    //             lasso.items(d3.selectAll(".dot").filter(function(d) {return (version_filter.indexOf(d["HWISE Version"]) == 100)}))
    //         }
    //     }

    //     else {
    //         lasso.items(d3.selectAll(".dot").filter(function(d) {return (version_filter.indexOf(d["HWISE Version"]) == 100)}))
    //     }
    // }
    // lasso.items().style("fill", function(d) { return color(d[jun.color_standard]); }).style("opacity","1.0").attr("r",3.5);
    if (version_filter[0]){
        if (region_filter[0]) {
            if (year_value.innerText != "All"){
                final_filter = '(region_filter.indexOf(Region_search[i]) >= 0) '+
                    '&& (version_filter.indexOf(Hwise_search[i]) >= 0)'+ 
                    // '&& (Lat_search[i] >= Number(latmin.innerText)) '+
                    // '&& (Lat_search[i] <= Number(latmax.innerText)) '+
                    // '&& (Lng_search[i] >= Number(lngmin.innerText)) '+
                    // '&& (Lng_search[i] <= Number(lngmax.innerText)) '+
                    '&& (Start_search[i] == year_value.innerText) '
            }
            else {
                final_filter = '(region_filter.indexOf(Region_search[i]) >= 0) '+
                    '&& (version_filter.indexOf(Hwise_search[i]) >= 0)'
                    // + '&& (Lat_search[i] >= Number(latmin.innerText)) '+
                    // '&& (Lat_search[i] <= Number(latmax.innerText)) '+
                    // '&& (Lng_search[i] >= Number(lngmin.innerText)) '+
                    // '&& (Lng_search[i] <= Number(lngmax.innerText)) '
            }
        }
        else {
            final_filter = '(Hwise_search[i]) == 100)'
        }
    }
    else {
        final_filter = '(Hwise_search[i]) == 100)'
    }
    return [region_filter.slice(2), version_filter.slice(2), final_filter]
}

// filter_list_ver2 : when specific marker is chosen
//      input : id_marker, option  
//      output : [region_filter.slice(2), version_filter.slice(2), final_filter]
//                  list of strings         list of strings         string
//      main role : set filter to markers / make map fly to chosen point / open description panel
function filter_list_ver2(id_marker, option) {    
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
    // lasso.items(d3.selectAll(".dot"));
    // lasso.items().style("fill", "#c8c8c8").style("opacity","0.3").attr("r",3.5);
    if (version_filter[2]){
        if (region_filter[2]){
            if (year_value.innerText != "All"){
                if ((region_filter.indexOf(Region_search[id_marker]) >= 0) 
                    && (version_filter.indexOf(Hwise_search[id_marker]) >= 0)
                    // && (Lat_search[id_marker] >= Number(latmin.innerText))
                    // && (Lat_search[id_marker] <= Number(latmax.innerText))
                    // && (Lng_search[id_marker] >= Number(lngmin.innerText))
                    // && (Lng_search[id_marker] <= Number(lngmax.innerText))
                    && (Start_search[id_marker] == year_value.innerText) 
                    ){
                        jun.map.flyTo({center : [Lng_search[id_marker],Lat_search[id_marker]], zoom:4.7})
                        openDesc(id_marker,option)
                        final_filter = '(Id_search[i] == id_number) '+
                            '&& (region_filter2.indexOf(Region_search[i]) >= 0) '+
                            '&& (version_filter2.indexOf(Hwise_search[i]) >= 0)'+ 
                            // '&& (Lat_search[i] >= Number(latmin.innerText)) '+
                            // '&& (Lat_search[i] <= Number(latmax.innerText)) '+
                            // '&& (Lng_search[i] >= Number(lngmin.innerText)) '+
                            // '&& (Lng_search[i] <= Number(lngmax.innerText)) '+
                            '&& (Start_search[i] == year_value.innerText) '
                        // lasso.items(d3.selectAll(".dot").filter(function(d) {return (d.id_number == id_marker)
                        //     && (region_filter.indexOf(d.Region) >= 0) 
                        //     && (version_filter.indexOf(d["HWISE Version"]) >= 0)
                        //     && (d.Lat >= Number(latmin.innerText))
                        //     && (d.Lat <= Number(latmax.innerText))
                        //     && (d.Lng >= Number(lngmin.innerText))
                        //     && (d.Lng <= Number(lngmax.innerText))
                        //     && (d.Year == Number(year_value.innerText)) 
                        //  }))
                        // lasso.items().style("fill", function(d) { return color(d[jun.color_standard ]); }).style("opacity","1.0").attr("r",7);
                   
                        // lasso.items(d3.selectAll(".dot").filter(function(d) {return (region_filter.indexOf(d.Region) >= 0) 
                        //     && (version_filter.indexOf(d["HWISE Version"]) >= 0)
                        //     && (d.Lat >= Number(latmin.innerText))
                        //     && (d.Lat <= Number(latmax.innerText))
                        //     && (d.Lng >= Number(lngmin.innerText))
                        //     && (d.Lng <= Number(lngmax.innerText))
                        //     && (d.Year == Number(year_value.innerText)) 
                        //  }))
                        filter_combined = ["all", ["==", "id_number", Number(id_marker)],["==","Start",year_value.innerText]]
                        // filter_combined = ["all", [">=", "Lat", Number(latmin.innerText)], ["<=", "Lat", Number(latmax.innerText)],
                        //     [">=", "Lng", Number(lngmin.innerText) ], ["<=", "Lng", Number(lngmax.innerText)],["==", "id_number", Number(id_marker)],["==","Year",Number(year_value.innerText)]]
                    }
                else {
                        final_filter = '(region_filter2.indexOf(Region_search[i]) >= 0) '+
                            '&& (version_filter2.indexOf(Hwise_search[i]) >= 0)'+ 
                            // '&& (Lat_search[i] >= Number(latmin.innerText)) '+
                            // '&& (Lat_search[i] <= Number(latmax.innerText)) '+
                            // '&& (Lng_search[i] >= Number(lngmin.innerText)) '+
                            // '&& (Lng_search[i] <= Number(lngmax.innerText)) '+
                            '&& (Start_search[i] == year_value.innerText) '
                        // lasso.items(d3.selectAll(".dot").filter(function(d) {return (region_filter.indexOf(d.Region) >= 0) 
                        //     && (version_filter.indexOf(d["HWISE Version"]) >= 0)
                        //     && (d.Lat >= Number(latmin.innerText))
                        //     && (d.Lat <= Number(latmax.innerText))
                        //     && (d.Lng >= Number(lngmin.innerText))
                        //     && (d.Lng <= Number(lngmax.innerText))
                        //     && (d.Year == Number(year_value.innerText)) 
                        //  }))
                        // lasso.items().style("fill", function(d) { return color(d[jun.color_standard ]); }).style("opacity","1.0").attr("r",3.5);
                        filter_combined = ["all", ["==","Start",year_value.innerText]]
                        // filter_combined = ["all", [">=", "Lat", Number(latmin.innerText)], ["<=", "Lat", Number(latmax.innerText)],
                        //     [">=", "Lng", Number(lngmin.innerText) ], ["<=", "Lng", Number(lngmax.innerText)],["==","Year",Number(year_value.innerText)]]
                }
            }
            else {
                if ((region_filter.indexOf(Region_search[id_marker]) >= 0) 
                    && (version_filter.indexOf(Hwise_search[id_marker]) >= 0)
                    // && (Lat_search[id_marker] >= Number(latmin.innerText))
                    // && (Lat_search[id_marker] <= Number(latmax.innerText))
                    // && (Lng_search[id_marker] >= Number(lngmin.innerText))
                    // && (Lng_search[id_marker] <= Number(lngmax.innerText))
                    ){
                        jun.map.flyTo({center : [Lng_search[id_marker],Lat_search[id_marker]], zoom:4.7})
                        openDesc(id_marker,option)

                        final_filter = '(Id_search[i] == id_number) '+
                            '&& (region_filter2.indexOf(Region_search[i]) >= 0) '+
                            '&& (version_filter2.indexOf(Hwise_search[i]) >= 0)' 
                        // lasso.items(d3.selectAll(".dot").filter(function(d) {return (d.id_number == id_marker)
                        //     && (region_filter.indexOf(d.Region) >= 0) 
                        //     && (version_filter.indexOf(d["HWISE Version"]) >= 0)
                        //     && (d.Lat >= Number(latmin.innerText))
                        //     && (d.Lat <= Number(latmax.innerText))
                        //     && (d.Lng >= Number(lngmin.innerText))
                        //     && (d.Lng <= Number(lngmax.innerText))
                        // }))   
                        // lasso.items().style("fill", function(d) { return color(d[jun.color_standard ]); }).style("opacity","1.0").attr("r",7);
                        // lasso.items(d3.selectAll(".dot").filter(function(d) {return (region_filter.indexOf(d.Region) >= 0) 
                        //     && (version_filter.indexOf(d["HWISE Version"]) >= 0)
                        //     && (d.Lat >= Number(latmin.innerText))
                        //     && (d.Lat <= Number(latmax.innerText))
                        //     && (d.Lng >= Number(lngmin.innerText))
                        //     && (d.Lng <= Number(lngmax.innerText))
                        // }))
                        filter_combined = ["all",["==","id_number",Number(id_marker)]]
                        // filter_combined = ["all", [">=", "Lat", Number(latmin.innerText)], ["<=", "Lat", Number(latmax.innerText)],
                        //     [">=", "Lng", Number(lngmin.innerText) ], ["<=", "Lng", Number(lngmax.innerText)],["==","id_number",Number(id_marker)]]
                    }
                else {
                        final_filter = '(region_filter2.indexOf(Region_search[i]) >= 0) '+
                            '&& (version_filter2.indexOf(Hwise_search[i]) >= 0)'
                        // lasso.items(d3.selectAll(".dot").filter(function(d) {return (region_filter.indexOf(d.Region) >= 0) 
                        //     && (version_filter.indexOf(d["HWISE Version"]) >= 0)
                        //     && (d.Lat >= Number(latmin.innerText))
                        //     && (d.Lat <= Number(latmax.innerText))
                        //     && (d.Lng >= Number(lngmin.innerText))
                        //     && (d.Lng <= Number(lngmax.innerText))
                        // }))
                        // lasso.items().style("fill", function(d) { return color(d["Site Name"]); }).style("opacity","1.0").attr("r",3.5);
                        filter_combined = ["all"]
                        // filter_combined = ["all", [">=", "Lat", Number(latmin.innerText)], ["<=", "Lat", Number(latmax.innerText)],
                        //     [">=", "Lng", Number(lngmin.innerText) ], ["<=", "Lng", Number(lngmax.innerText)]]
                }
            }
        }
        else {
            final_filter = '(Hwise_search[i]) == 100)'
            // lasso.items(d3.selectAll(".dot").filter(function(d) {return (version_filter.indexOf(d["HWISE Version"]) == 100)}))
        }
    }
    else {
        final_filter = '(Hwise_search[i]) == 100)'
        // lasso.items(d3.selectAll(".dot").filter(function(d) {return (version_filter.indexOf(d["HWISE Version"]) == 100)}))
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

    return [region_filter.slice(2), version_filter.slice(2), final_filter]
}

// substringMatcher : when user type something in search engine 
//      main role : form typeahead hints
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

// Functions for openning and closing side panels (Searcher, Lister, Desc)
function openSearcher() {
    document.getElementById("Searcher").style.width = "20%";
    document.getElementById("Searcher").style.opacity = "1";
    closeLister()
}

function closeSearcher() {
    document.getElementById("Searcher").style.width = "1%";
    document.getElementById("Searcher").style.opacity="0.0";
}

function openLister() {
    document.getElementById("Lister").style.width = "20%"; 
    document.getElementById("Lister").style.opacity = "1";
    if ($('#Lister').children().length==1){
        unfiltered_list_creator()
    }
    closeSearcher()
}

function closeLister() {
    document.getElementById("Lister").style.width = "0%"; 
    document.getElementById("Lister").style.opacity = "0.0";
}

function Searcher_to_Lister() {
    closeSearcher() 
    openLister()
}

function Lister_to_Searcher() { 
    closeLister() 
    openSearcher()
}

// openDesc : when specific point is chosen  
//      input : id_number, option 
//      output : [region_filter.slice(2), version_filter.slice(2), final_filter]
//                  list of strings         list of strings         string
//      main role : open Desc panel / make bottom statistics bar appear 
function openDesc(id_number, option) { 
    closeSearcher()
    closeLister()   
    document.getElementById("Desc").style.width= "20%";
    document.getElementById("Desc").style.opacity="1"
    if (option == 1 ){
        document.getElementById("Desc").innerHTML = "<a class='closebtn' onclick='closeDesc()' style='color : white'>&times;</a>"  
    }
    else {
        document.getElementById("Desc").innerHTML = "<a class='closebtn' onclick='closeDesc1()' style='color : white'>&times;</a>"  
    }

    
    document.getElementById("Desc").innerHTML += "<span style='text-align:center; color : white;margin:auto'> \
        <div class='desc_top'>"+Site_search[id_number]+"<br />" +"Site Characteristics </div> \
        <img src='scripts/images/Photos/"+Site_search[id_number]+"_1.jpg' alt='no image yet' \
        style=' width: 100%; height:auto;margin-top:7px'>\
        <div class='whole_table' style='margin-top:7px'><table id = 'description'>" + 
        "<tr> <td id = 'front_desc'> Region</td><td> "+Region_search[id_number] +
        "</td> </tr> <tr> <td id = 'front_desc'>HWISE Version</td><td>  " + Hwise_search[id_number] +
        "</td> </tr> <tr> <td id = 'front_desc'>Partners</td><td> "+ Partners_search[id_number] +
        "</td> </tr> <tr> <td id = 'front_desc'>Setting</td><td>"+ Setting_search[id_number] +
        "</td> </tr> <tr> <td id = 'front_desc'>Sampling</td><td>" + Sampling_search[id_number] + 
        "</td> </tr> <tr> <td id = 'front_desc'>Cognitive Interviewing</td><td>" + Cognitive_search[id_number] + 
        "</td> </tr> <tr> <td id = 'front_desc'>Participants</td><td> " + Participants_search[id_number] +
        "</td> </tr> <tr> <td id = 'front_desc'>Dates of Data Collection</td><td> " + Period_search[id_number] +
        "</td> </tr> <tr> <td id = 'front_desc'>Gender</td><td> Male - "+ ((100-Female_search[id_number]).toFixed(1)) +
        "% <br /> Female - "+Female_search[id_number].toFixed(1) +"%</td></table></div>"
        // "</td> </tr> <tr> <td> GNI</td><td> " + (GNI_search[id_number]*1000).toLocaleString() + " USD"
        // "<tr> <td id = 'front_desc'>Latitude</td> <td>"+Number(Lat_search[id_number]) + "</td> </tr> " + 
        // "<tr> <td id = 'front_desc'>Longitude</td><td> "+Number(Lng_search[id_number]) +"</td> </tr> " + 
        "</td> </tr> <tr> <td id = 'front_desc'>Climate</td><td>" + Climate_search[id_number] +
        "</td></tr></table></div>"



    bottom_bar_enter(id_number)
}

// closeDesc1() : when user tries to close description panel that's openned by clicking element in Lister
function closeDesc1() { 
    document.getElementById("Desc").innerHTML = ""
    document.getElementById("Desc").style.width= "0%" 
    openLister()
    clearit()
    bottom_bar_exit()
}

// closeDesc() : when user tries to close description panel that's not the case of closeDesc1()
function closeDesc() { 
    document.getElementById("Desc").innerHTML = ""
    document.getElementById("Desc").style.width= "0%" 
    openSearcher()
    clearit()
    bottom_bar_exit()
}

// clearit() : reset all filters and map markers
function clearit() { 
    jun.map.setFilter("points", null)
    $('#region_select').multipleSelect("checkAll");
    $('#Version_select').multipleSelect("checkAll");  
    // lasso.items(d3.selectAll(".dot"));
    // lasso.items().style("fill", function(d) { return color(d[jun.color_standard]); }).style("opacity","1.0").attr("r",3.5);
    jun.map.flyTo({center : [jun.default_center_first, jun.default_center_second], zoom:1.3})
    
    jun.clicked = ""
    $('.typeahead').typeahead('val', '')
    unfiltered_list_creator()

    document.getElementById("results_num").innerText = Site_search.length
    document.getElementById('third_bar').click();
    // document.getElementById("latmin").innerText = (-90.00).toFixed(2)
    // document.getElementById("latmax").innerText = 90.00.toFixed(2)
    // document.getElementById("lngmin").innerText = (-180.00).toFixed(2)
    // document.getElementById("lngmax").innerText = 180.00.toFixed(2)
    // document.getElementsByClassName("d3-slider-range")[0].style.left = "0%"
    // document.getElementsByClassName("d3-slider-range")[0].style.right = "0%"     
    // document.getElementsByClassName("d3-slider-range")[1].style.left = "0%"
    // document.getElementsByClassName("d3-slider-range")[1].style.right = "0%" 

    // document.getElementsByClassName("d3-slider-handle")[0].style.left = "0%"
    // document.getElementsByClassName("d3-slider-handle")[1].style.left = "100%" 
    // document.getElementsByClassName("d3-slider-handle")[2].style.left = "0%"
    // document.getElementsByClassName("d3-slider-handle")[3].style.left = "100%" 
}

// linklink() : when element in list is chosen 
function linklink(id_number){
    closeLister()
    ver2_result = filter_list_ver2(id_number, 2)
    region_filter2 = ver2_result[0]
    version_filter2 = ver2_result[1]
    yes_chosen = []
    for (var i = 0; i < Site_search.length; i++){
        if (eval(ver2_result[2])) {
            yes_chosen.push(i)
        } 
    }
    filtered_list_creator(yes_chosen) 
}

// center_changer() : when filter is applied
//      main role : set filters to markers / change the center of map based on filterd or chosen markers
function center_changer() { 
    // marker filtering
    filter_result = filter_list(clicked = jun.clicked)
    region1_filter = filter_result[0]
    version1_filter = filter_result[1]
    // list changing
    yes_chosen =[]
    for (var i = 0; i < Site_search.length; i++){
        if (eval(filter_result[2])) {
            yes_chosen.push(i)
        } 
    }
    filtered_list_creator(yes_chosen)
    // map center changing
    multiple_selected = yes_chosen
    if (multiple_selected.length >= 1){
        multiple_selected_lat = []
        multiple_selected_lng = []
        for (var k = 0; k < multiple_selected.length; k++){
          multiple_selected_lat.push(Lat_search[multiple_selected[k]])
          multiple_selected_lng.push(Lng_search[multiple_selected[k]])
        }
        jun.map.flyTo({center : [(Math.max(...multiple_selected_lng)+Math.min(...multiple_selected_lng))/2,(Math.max(...multiple_selected_lat)+Math.min(...multiple_selected_lat))/2],zoom:1.3})
        document.getElementById("results_num").innerText = (multiple_selected.length)
    }
    else {
        document.getElementById("results_num").innerText = 0
    }  
}


// filtered_list_creator()
//      main role : create filtered list  
function filtered_list_creator(standard){
    collector =""
    for (var i = 0 ; i < Site_search.length; i ++){
         if (i==jun.divider[0]) { 
              collector  += '<tr><td> <div class ="region_division"> Middle East & North Africa </div> </td></tr>'
          }
          else if (i== jun.divider[1]){
              collector += '<tr><td><div class ="region_division"> Africa </div></td></tr>'
          }
          else if (i == jun.divider[2]){
              collector  += '<tr><td><div class ="region_division"> Latin America & the Carribean </div> </td></tr>'
          }
          else if (i == jun.divider[3]){
              collector  += '<tr><td><div class ="region_division"> East Asia and Pacific </div></td></tr>'
          }
          else if (i == jun.divider[4]){
              collector  += '<tr><td><div class ="region_division"> South Asia </div></td></tr>'
          }
          else if (i == jun.divider[5]){
              collector += '<tr><td><div class ="region_division"> Europe and Central Asia </div></td></tr>'
          }
          if ((typeof standard) == "number") {
            if (i == id_marker) {
                  collector += "<tr><td><span class='list_element_yes' id='"+i+"_list' onclick='linklink("+i+")'>"+ Site_search[i]+"</span><br></td></tr>"
            }
            else {
                  collector += "<tr><td><span class='list_element_no' id='"+i+"_list' >"+ Site_search[i]+"</span><br></td></tr>"
            }
          }
          else { 
            if (standard.indexOf(i) >= 0) {
                  collector += "<tr><td><span class='list_element_yes' id='"+i+"_list' onclick='linklink("+i+")'>"+ Site_search[i]+"</span><br></td></tr>"
            }
            else {
                  collector += "<tr><td><span class='list_element_no' id='"+i+"_list' >"+ Site_search[i]+"</span><br></td></tr>"
            }
          }
      }
    document.getElementById("Lister").innerHTML = "<a class='closebtn' onclick='closeLister()''>&times;</a> \
        <h3 style='font:  2.0vw Roboto, sans-serif;'> Research Sites </h3> <table id='collected'>"+ collector+ 
        "</table><div class ='container' style='margin-top:5px'> <div class='row'> <div class = 'col'>\
        <button id = 'clear1' class='button1' value ='clear' onclick = 'clearit()'>clear</button></div> </div> \
        <div class='row'> <div class = 'col'>  <button id = 'search_view' class='button1' value ='clear' onclick = 'Lister_to_Searcher()'>Search View</button> </div></div></div>"
}

// unfiltered_list_creator()
//      main role : create unfiltered list of all elements
function unfiltered_list_creator(){
    collector = ""
    for (var i = 0; i < Site_search.length; i++){
        if (i == jun.divider[0]) { 
            collector  += '<tr><td> <div class ="region_division"> Middle East & North Africa </div> </td></tr>'
        }
        else if (i == jun.divider[1]){
            collector  += '<tr><td><div class ="region_division"> Africa </div></td></tr>'
        }
        else if (i == jun.divider[2]){
            collector  += '<tr><td><div class ="region_division"> Latin American & the Caribbean </div> </td></tr>'
        }
        else if (i == jun.divider[3]){
            collector  += '<tr><td><div class ="region_division"> East Asia and Pacific </div></td></tr>'
        }
        else if (i == jun.divider[4]){
            collector  += '<tr><td><div class ="region_division"> South Asia </div></td></tr>'
        }
        else if (i == jun.divider[5]){
            collector  += '<tr><td><div class ="region_division"> Europe and Central Asia </div></td></tr>'
        }
        collector += "<tr><td><span class='list_element_yes' id='"+i+"_list' onclick='linklink("+i+")'>"+ Site_search[i]+"</span></td></tr>"
    }
    document.getElementById("Lister").innerHTML = "<a class='closebtn' onclick='closeLister()''>&times;</a> \
        <h3 style='font:  2.0vw Roboto, sans-serif;'> Research Sites </h3> <table id='collected'>"+ collector+ 
        "</table><div class ='container' style='margin-top:5px'> <div class='row'> <div class = 'col'>\
        <button id = 'clear1' class='button1' value ='clear' onclick = 'clearit()'>clear</button></div> </div> \
        <div class='row'> <div class = 'col'>  <button id = 'search_view' class='button1' value ='clear' onclick = 'Lister_to_Searcher()'>Search View</button> </div></div></div>"
}


// bottom_bar_enter : when openDesc() function is called
//      main role : hide "Dates of Data Collection" bar and bar for 3 statistics appear
function bottom_bar_enter(idid) {
    document.getElementById("third_bar").style.zIndex = "-2" 
    document.getElementById("title_line2").style.zIndex = "-2" 
    document.getElementById("legend1").style.zIndex = "-2"
    document.getElementById("bottom_bar").style.zIndex = "100"

    main_source_enter(idid)
    worry_enter(idid)
    time_spent_enter(idid)
    document.getElementById("bottom_bar").style.opacity = "1.0"
    document.getElementById("bottom_bar").style.background = "rgba(255, 255, 255, 0.5)"
}

// first statistic : main source of water
function main_source_enter(idid) {
    if (document.getElementById("full_rect") != null)
    {
        document.getElementById("full_rect").remove()
    }
    var dollars = [Female_search[idid]];
    if (Hwise_search[idid] ==1 ) {
        var colors = jun.v1_color;
    }
    else {
        var colors = jun.v2_color;
    }

    var xscale = d3.scale.linear()
                    .domain([0,100])
                    .range([0,148]);

    var yscale = d3.scale.linear()
                    .domain([0,1])
                    .range([0,148]);

    var colorScale = d3.scale.quantize()
                    .domain([0,1])
                    .range(colors);

    var canvas = d3.select("#first_column").insert("svg","#line_title0")
                    .attr('id','full_rect')
                    .attr({'width':148,'height':148});

    var xAxis = d3.svg.axis();
        xAxis
            .orient('bottom')
            .scale(xscale);


    var yAxis = d3.svg.axis();
        yAxis
            .orient('left')
            .scale(yscale);

    var backback = canvas.append('rect')
                        .attr('id',"bar_background")
                        .attr("width", "100%")
                        .attr("height", 148)
                        .attr("fill", "white")
                        .attr("y",0)

    formatPercent1 = d3.format(".0f");
    var progress = 0
    var percentComplete = canvas.append("text")
        .attr("text-anchor", "middle")
        .attr("class", "percent-complete1")
        .attr("dy", "76.5")
        .attr("dx", "72")
        .style("font-size", "37px")
        .style("fill", colors[1]);

    var main_source_desc = canvas.append("text")
        .attr("text-anchor", "middle")
        .attr("class", "percent-complete1")
        .attr("dy", "104.5")
        .attr("dx", "72")
        .style("font-size", "15px")
        .style("fill", colors[1]);

    var textRounder = function(value){ return Math.round(value);};
    var textTween = function(){
        var i = d3.interpolate(progress, (Female_search[idid])/100); 
        return function(t) {  
            progress = i(t); 
            percentComplete.text(formatPercent1(progress*100)+"%"); }
    };

    percentComplete.transition()
        .duration(1000)
        .tween("text", textTween);

    main_source_desc.text(Source_search[idid])

    var waveGroup = canvas.append("clipPath")      
        .attr("id", "ellipse-clip") 
        .selectAll('rect')
        .data(dollars)
        .enter()
        .append('rect')
        .attr('id','rect1')
        .attr('height',148)
        .attr({'x':0,'y':function(d,i){ return yscale(i); }})
        .style('fill',function(d,i){ return colorScale(i); })
        .attr('width',0)
        .transition()
        .duration(1000)//time in ms
        .attr("width", function(d){
            return xscale(d);
        })     

    var chart = canvas.append("g")  
        .attr("clip-path", "url(#ellipse-clip)")
    chart.append("rect")
        .attr("height", 148)    
        .attr("width", 148)    
        .style('fill',function(d,i){ return colorScale(i); })

    progress = 0
    var percentComplete0 = chart.append("text")
        .attr("text-anchor", "middle")
        .attr("class", "percent-complete2")
        .attr("dy", "76.5")
        .attr("dx", "72")
        .attr("id","woo")
        .style("font-size", "37px")
        .style("fill", colors[2])


    var main_source_desc0 = chart.append("text")
        .attr("text-anchor", "middle")
        .attr("class", "percent-complete2")
        .attr("dy", "104.5")
        .attr("dx", "72")
        .style("font-size", "15px")
        .style("fill", colors[2]);


    var textTween0 = function(){
        var i = d3.interpolate(progress, (Female_search[idid])/100); 
        return function(t) {  
            progress = i(t); 
            percentComplete0.text(formatPercent1(progress*100)+"%"); }
    };;
    percentComplete0.transition()
        .duration(1000)
        .tween("text", textTween0);

    main_source_desc0.text(Source_search[idid])
}
// second statistic : proportion who worry about water
function worry_enter(idid) {
    value = Improved_search[idid]
    d3.select("#fillgauge1").remove()

    var btn = d3.select("#second_column").insert("svg",'#line_title')
    btn.attr("id", "fillgauge1")    
        .attr("width", 148)
        .attr("height", 148)
        .attr("viewBox","0 0 148 148")

    if (Hwise_search[idid] == 1 ) {
        loadLiquidFillGauge("fillgauge1", value, config1);
    }
    else {
        loadLiquidFillGauge("fillgauge1", value, config2); 
    }
}
// third statistic : time spent collecting water
function time_spent_enter(idid) {
    allocated = Female_search[idid]
    hwise = Hwise_search[idid]
    progress = 0 
    var i = d3.interpolate(progress, allocated / total); 
    if (hwise == 1 ) {
        var description = meter.append("text")
            .attr("text-anchor", "middle")
            .attr("class", "description")
            .attr("dy", "0.9em")
            .text("hrs")
            .style("font-size", "28px")
            .style("fill", jun.v1_color[1]);
        document.getElementsByClassName("foreground")[0].style.fill = jun.v1_color[0]
        document.getElementsByClassName("percent-complete")[0].style.fill = jun.v1_color[1]
    }
    else {
        var description = meter.append("text")
            .attr("text-anchor", "middle")
            .attr("class", "description")
            .attr("dy", "0.9em")
            .text("hrs")
            .style("font-size", "28px")
            .style("fill", jun.v2_color[1]);
        document.getElementsByClassName("foreground")[0].style.fill = jun.v2_color[0]
        document.getElementsByClassName("percent-complete")[0].style.fill = jun.v2_color[1]
    }

    d3.transition().duration(1000).tween("progress", function() {
      return function(t) {
        progress = i(t);
        foreground.attr("d", arc.endAngle(twoPi * progress));
        percentComplete.text(formatPercent(progress));
      };
    })
}

// bottom_bar_enter : when description bar is closed
//      main role : hide bar for 3 statistics and "Dates of Data Collection" bar appear 
function bottom_bar_exit() { 
    document.getElementById("bottom_bar").style.zIndex = "-100"
    document.getElementById("legend1").style.zIndex = "5"
    document.getElementById("third_bar").style.zIndex = "5"
    document.getElementById("title_line2").style.zIndex = "5"
    d3.select("#fillgauge1").remove()

    if (document.getElementById("full_rect") != null)
    {
        document.getElementById("full_rect").remove()
    }
    document.getElementById("bottom_bar").style.background = "rgba(0,0,0,0.5)"
}
