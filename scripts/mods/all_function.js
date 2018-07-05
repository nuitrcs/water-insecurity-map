function drawMarkers(criteria1, left_end1, right_end1, criteria2, left_end2, right_end2) { 
//////////////////////////// filtering based on criteria ////////////////////////////
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
                    "Participants": jun.data[i]["Participants"],
                    "GNI": jun.data[i]["GNI"],
                    "Region": jun.data[i]["Region"],
                    "Lat" : jun.data[i]["Lat"],
                    "Lng" : jun.data[i]["Lng"],
                    "Year" : jun.data[i]["Year"] ,
                    "id_number" : jun.data[i]["id_number"],
                    "Partners" : jun.data[i]["Partners"],
                    "Setting" : jun.data[i]["Setting"],
                    "Sampling" : jun.data[i]["Sampling"],
                    "Climate" :jun.data[i]["Climate"],
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
                    "Participants": jun.data[i]["Participants"],
                    "GNI": jun.data[i]["GNI"],
                    "Region": jun.data[i]["Region"],
                    "Lat" : jun.data[i]["Lat"],
                    "Lng" : jun.data[i]["Lng"],
                    "Year" : jun.data[i]["Year"] ,
                    "id_number" : jun.data[i]["id_number"],
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
        Male_search.push((100-jun.data[i]["Female"]).toFixed(2))
    }
    jun.map.on('load', function () {
        jun.map.loadImage(jun.image1_link, function(error, image) {
            if (error) throw error;
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
                    "filter": ["all", [">=", criteria1, left_end1], ["<=", criteria1, right_end1], [">=",criteria2, left_end2 ], ["<=", criteria2, right_end2 ]],
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
    lasso.items().style("fill", function(d) { return color(d[jun.color_standard]); }).style("opacity","1.0").attr("r",3.5);
}

// filter_list_ver2 : when specific marker is chosen : change lasso items and map markers
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
            if (year_value.innerText != "All"){
                if ((region_filter.indexOf(Region_search[id_marker]) >= 0) 
                    && (version_filter.indexOf(hwise_search[id_marker]) >= 0)
                    && (lat_search[id_marker] >= Number(latmin.innerText))
                    && (lat_search[id_marker] <= Number(latmax.innerText))
                    && (lng_search[id_marker] >= Number(lngmin.innerText))
                    && (lng_search[id_marker] <= Number(lngmax.innerText))
                    && (Year_search[id_marker] == Number(year_value.innerText)) 
                    ){
                        jun.map.flyTo({center : [lng_search[id_marker],lat_search[id_marker]], zoom:5})
                        openDesc(id_marker)
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
                        jun.map.flyTo({center : [lng_search[id_marker],lat_search[id_marker]], zoom:5})
                        openDesc(id_marker)
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
function filter_list_ver3() {    
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
    var matches, substringRegex;
    matches = [];
    substrRegex = new RegExp(q, 'i');
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });
    cb(matches);
  };
};

// navigation bar
function openNav() {
    document.getElementById("mySidenav").style.width = "20%";
    document.getElementById("mySidenav").style.opacity = "0.85";
    document.getElementById("openner").style.opacity = "0";
    document.getElementById("openner2").style.opacity = "0";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "1%";
    document.getElementById("mySidenav").style.opacity="0.0";
    openLister()
}

function openDesc(idid) { 
    document.getElementById("mySidenav").style.width = "1%";
    document.getElementById("mySidenav").style.opacity="0.0";
    document.getElementById("openner").style.opacity = "0";
    document.getElementById("openner2").style.opacity = "0";   
    document.getElementById("Desc").style.width= "20%";
    document.getElementById("Desc").style.opacity="0.85"
    document.getElementById("Desc").innerHTML = "<a class='closebtn' onclick='closeDesc()''>&times;</a>\
        <span style='text-align:center; color : white;margin:auto'> <div class='desc_top'>"+site_search[idid]+
        "</div> <img src='scripts/images/Photos/"+site_search[idid]+"_1.jpg'  alt='no image yet' style=' width: 100%; height:auto'><br> \
        <br> <p>Lat: "+Number(lat_search[idid]) +"<br />Lng: "+Number(lng_search[idid]) +"<br />HWISE Version: "+hwise_search[idid] 
        +"<br />Participants: " + Participants_search[idid] +"<br />GNI: " + GNI_search[idid]*1000 + " USD<br />Region: " + Region_search[idid] 
        + "<br />Partners: "+ Partners_search[idid] + "<br />Setting: "+Setting_search[idid] + "<br />Sampling: " + Sampling_search[idid] 
        + "<br />Climate : " + Climate_search[idid] + "<br />Gender: male - "+Male_search[idid] + "% / female - "+Female_search[idid] +"%</p></span>"
    document.getElementById("Lister").style.width = "0%"; 
    document.getElementById("Lister").style.opacity = "0.0";
}

function closeDesc() { 
    document.getElementById("Desc").innerHTML = ""
    document.getElementById("Desc").style.width= "0%" 
    openNav()
}

function openLister() {
    document.getElementById("openner").style.opacity = "0";
    document.getElementById("openner2").style.opacity = "0"; 
    document.getElementById("Lister").style.width = "20%"; 
    document.getElementById("Lister").style.opacity = "0.85";
    if ($('#Lister').children().length==1){
        document.getElementById("Lister").innerHTML = "<a class='closebtn' onclick='closeLister()''>&times;</a><h3> Research Sites </h3> <div class='list_content'>"
        for (var i = 0; i < site_search.length; i++){
          document.getElementById('Lister').innerHTML += "<span class='list_element_yes' id='"+i+"_list' onclick='linklink("+i+")'>"+ site_search[i]+"</span><br>"
        }
        document.getElementById("Lister").innerHTML += "</div><br><input id = 'clear1'  class='button1' type='submit' value ='clear'>"
    }
}

function closeLister() {
    document.getElementById("Lister").style.width = "0%"; 
    document.getElementById("Lister").style.opacity = "0.0";
    document.getElementById("openner").style.opacity = "0.85";
    document.getElementById("openner2").style.opacity = "0.85";
}

function linklink(id_number){
    closeLister()
    filter_list_ver2(id_number)
    ver4_result = filter_list_ver4(id_number)
    region_filter2 = ver4_result[0]
    version_filter2 = ver4_result[1]
    yes_chosen1 = []
    for (var i = 0; i < site_search.length; i++){
        if (eval(ver4_result[2])) {
            yes_chosen1.push(i)
        } 
    }
    document.getElementById("Lister").innerHTML = "<a class='closebtn' onclick='closeLister()''>&times;</a><h3> Research Sites </h3> <div class='list_content'>"
    for (var j = 0 ; j < site_search.length; j ++){
        if (yes_chosen1.indexOf(j) >= 0) {
            document.getElementById('Lister').innerHTML += "<span class='list_element_yes' id='"+j+"_list' onclick='linklink("+j+")'>"+ site_search[j]+"</span><br>"
        }
        else {
            document.getElementById('Lister').innerHTML += "<span class='list_element_no' id='"+j+"_list'>"+ site_search[j]+"</span><br>"
        }
    }
    document.getElementById("Lister").innerHTML += "</div><br><input id = 'clear1' class='button1' type='submit' value ='clear' onclick = 'clearit()'>"
}

function clearit() { 
    jun.map.setFilter("points", null)
    $('#region_select').multipleSelect("checkAll");
    $('#Version_select').multipleSelect("checkAll");  
    lasso.items(d3.selectAll(".dot"));
    lasso.items().style("fill", function(d) { return color(d[jun.color_standard]); }).style("opacity","1.0").attr("r",3.5);
    jun.map.flyTo({center : [jun.default_center_first, jun.default_center_second], zoom:1.3})

    document.getElementById("Lister").innerHTML = "<a class='closebtn' onclick='closeLister()''>&times;</a><h3> Research Sites </h3> <div class='list_content'>"
    for (var i = 0; i < site_search.length; i++){
      document.getElementById('Lister').innerHTML += "<span class='list_element_yes' id='"+i+"_list' onclick='linklink("+i+")'>"+ site_search[i]+"</span><br>"
    }  
    document.getElementById("Lister").innerHTML += "</div><br><input id = 'clear1' class='button1' type='submit'  value ='clear' onclick = 'clearit()'>"

    document.getElementById("latmin").innerText = -90.00
    document.getElementById("latmax").innerText = 90.00
    document.getElementById("lngmin").innerText = -180.00
    document.getElementById("lngmax").innerText = 180.00
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
    ver3_result = filter_list_ver3()
    region1_filter = ver3_result[0]
    version1_filter = ver3_result[1]
    yes_chosen =[]
    for (var i = 0; i < site_search.length; i++){
        if (eval(ver3_result[2])) {
            yes_chosen.push(i)
        } 
    }
    document.getElementById("Lister").innerHTML = "<a class='closebtn' onclick='closeLister()''>&times;</a><h3> Research Sites </h3> <div class='list_content'>"
    for (var i = 0 ; i < site_search.length; i ++){
        if (yes_chosen.indexOf(i) >= 0) {
            document.getElementById('Lister').innerHTML += "<span class='list_element_yes' id='"+i+"_list' onclick='linklink("+i+")'>"+ site_search[i]+"</span><br>"
        }
        else {
            document.getElementById('Lister').innerHTML += "<span class='list_element_no' id='"+i+"_list'>"+ site_search[i]+"</span><br>"
        }
    }
    document.getElementById("Lister").innerHTML += "</div><br><input id = 'clear1' class='button1'  type='submit' value ='clear' onclick = 'clearit()'>"
    return yes_chosen
}

function center_changer() { 
    console.log("hi")
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
        console.log("sssss")
        document.getElementById("results_num").innerText = 0
    }  
}
