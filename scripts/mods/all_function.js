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
var Worry_search = []
var Time_search = []
var Climate_search = []
var Lat_search = []
var Lng_search = []

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
                    "Region": jun.data[i]["Region"],
                    "Start" : jun.data[i]["start"] ,
                    "id_number" : jun.data[i]["id_number"],
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
                    "Region": jun.data[i]["Region"],
                    "Start" : jun.data[i]["start"] ,
                    "id_number" : jun.data[i]["id_number"],
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
        Lat_search.push(jun.data[i]["Lat"])
        Lng_search.push(jun.data[i]["Lng"])
        Worry_search.push(jun.data[i]["Proportion_worry"])
        Time_search.push(jun.data[i]["Time_spent"])
        Climate_search.push(jun.data[i]["Climate"])
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
                        "text-size" : 18,
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

// filter_list : when bottom slider is moved / when "select" button is pressed 
//      input : clicked(optional) 
//      output : [region_filter.slice(2), version_filter.slice(2), final_filter]
//                  list of strings         list of strings         string
//      main role : set filter to markers
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

    filter_combined = ["all"]
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
    if (version_filter[0]){
        if (region_filter[0]) {
            if (year_value.innerText != "All"){
                final_filter = '(region_filter.indexOf(Region_search[i]) >= 0) '+
                    '&& (version_filter.indexOf(Hwise_search[i]) >= 0)'+ 
                    '&& (Start_search[i] == year_value.innerText) '
            }
            else {
                final_filter = '(region_filter.indexOf(Region_search[i]) >= 0) '+
                    '&& (version_filter.indexOf(Hwise_search[i]) >= 0)'
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
    if (version_filter[2]){
        if (region_filter[2]){
            if (year_value.innerText != "All"){
                if ((region_filter.indexOf(Region_search[id_marker]) >= 0) 
                    && (version_filter.indexOf(Hwise_search[id_marker]) >= 0)
                    && (Start_search[id_marker] == year_value.innerText) 
                    ){
                        jun.map.flyTo({center : [Lng_search[id_marker],Lat_search[id_marker]], zoom:5})
                        openDesc(id_marker,option)
                        final_filter = '(Id_search[i] == id_number) '+
                            '&& (region_filter2.indexOf(Region_search[i]) >= 0) '+
                            '&& (version_filter2.indexOf(Hwise_search[i]) >= 0)'+ 
                            '&& (Start_search[i] == year_value.innerText) '
                        filter_combined = ["all", ["==", "id_number", Number(id_marker)],["==","Start",year_value.innerText]]
                    }
                else {
                        final_filter = '(region_filter2.indexOf(Region_search[i]) >= 0) '+
                            '&& (version_filter2.indexOf(Hwise_search[i]) >= 0)'+ 
                            '&& (Start_search[i] == year_value.innerText) '
                        filter_combined = ["all", ["==","Start",year_value.innerText]]
                }
            }
            else {
                if ((region_filter.indexOf(Region_search[id_marker]) >= 0) 
                    && (version_filter.indexOf(Hwise_search[id_marker]) >= 0)

                    ){
                        jun.map.flyTo({center : [Lng_search[id_marker],Lat_search[id_marker]], zoom:5})
                        openDesc(id_marker,option)

                        final_filter = '(Id_search[i] == id_number) '+
                            '&& (region_filter2.indexOf(Region_search[i]) >= 0) '+
                            '&& (version_filter2.indexOf(Hwise_search[i]) >= 0)' 
                        filter_combined = ["all",["==","id_number",Number(id_marker)]]
                    }
                else {
                        final_filter = '(region_filter2.indexOf(Region_search[i]) >= 0) '+
                            '&& (version_filter2.indexOf(Hwise_search[i]) >= 0)'
                        filter_combined = ["all"]
                }
            }
        }
        else {
            final_filter = '(Hwise_search[i]) == 100)'
        }
    }
    else {
        final_filter = '(Hwise_search[i]) == 100)'
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
    <div class='h123' style='margin-bottom : 5px;margin-top:13px'>"+Site_search[id_number]+"<br />" +"Site Characteristics </div> \
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
    "</td> </tr> <tr> <td id = 'front_desc'>Climate</td><td>" + Climate_search[id_number] +
    "</td></tr></table></div>"




    $.get("scripts/images/Photos/"+Site_search[id_number]+"_1.jpg")
    .done(function() { 
        $("<img src='scripts/images/Photos/"+Site_search[id_number]+"_1.jpg' alt='no image yet' \
    style=' width: 100%; height:auto;margin-top:7px; image-orientation: from-image;'>").insertBefore(".whole_table")
    })
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
    jun.map.flyTo({center : [jun.default_center_first, jun.default_center_second], zoom:1.1})
    
    $('.typeahead').typeahead('val', '')
    unfiltered_list_creator()

    document.getElementById("results_num").innerText = Site_search.length
    document.getElementById('third_bar').click();
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
    filter_result = filter_list()
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
        jun.map.flyTo({center : [(Math.max(...multiple_selected_lng)+Math.min(...multiple_selected_lng))/2,(Math.max(...multiple_selected_lat)+Math.min(...multiple_selected_lat))/2],zoom:1.1})
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
        <div class='h123' style='margin-bottom : 5px; margin-top:13px'> Research Sites </div> <table id='collected'>"+ collector+ 
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
            collector  += '<tr><td><div class ="region_division"> Latin America & the Caribbean </div> </td></tr>'
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
        <div class='h123' style='margin-bottom : 5px; margin-top:13px'> Research Sites </div> <table id='collected'>"+ collector+ 
        "</table><div class ='container' style='margin-top:5px'> <div class='row'> <div class = 'col'>\
        <button id = 'clear1' class='button1' value ='clear' onclick = 'clearit()'>clear</button></div> </div> \
        <div class='row'> <div class = 'col'>  <button id = 'search_view' class='button1' value ='clear' onclick = 'Lister_to_Searcher()'>Search View</button> </div></div></div>"
}


// bottom_bar_enter : when openDesc() function is called
//      main role : hide "Dates of Data Collection" bar and bar for 3 statistics appear
function bottom_bar_enter(idid) {
    document.getElementById("third_bar").style.zIndex = "-3" 
    document.getElementById("title_line2").style.zIndex = "-3" 
    document.getElementById("legend1").style.zIndex = "-3"
    document.getElementById("bottom_bar").style.zIndex = "0"
    document.getElementById("credit").style.zIndex = "-3"


    main_source_enter(idid)
    worry_enter(idid)
    time_spent_enter(idid)
    document.getElementById("bottom_bar").style.opacity = "1.0"
    document.getElementById("bottom_bar").style.background = "rgba(255, 255, 255, 0.8)"
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

    var xscale = d3.scaleLinear()
                    .domain([0,100])
                    .range([0,jun.animation_size]);
    var yscale = d3.scaleLinear()
                    .domain([0,100])
                    .range([0,jun.animation_size]);

    var colorScale = d3.scaleQuantize()
                    .domain([0,1])
                    .range(colors);

    var canvas = d3.select("#first_column").insert("svg","#line_title0")
                    .attr('id','full_rect')
                    .attr('width',jun.animation_size)
                    .attr('height',jun.animation_size);

    var xAxis = d3.axisBottom(xscale);
    var yAxis = d3.axisLeft(yscale);

    var backback = canvas.append('rect')
                        .attr('id',"bar_background")
                        .attr("width", jun.animation_size*0.3)
                        .attr("height", jun.animation_size)
                        .attr("fill", jun.grey)
                        .attr("y",0)

    formatPercent1 = d3.format(".0f");
    var progress = 0
    
    var text_group = canvas.append('g')
        .attr("text-anchor", "middle")

    var percentComplete = text_group.append("text")
        .attr("text-anchor", "middle")
        .attr("class", "percent-complete1")
        .attr("dy", "0")
        .attr("dx", jun.animation_size * (0.3+(1-0.3)/2))
        .style("font-size", "37px")
        .style("fill", colors[1]);

    var main_source_desc = text_group.append("text")

    main_source_desc.text(Source_search[idid])

    // if Source_search[idid] is too long, we parse it. 
    if (main_source_desc.node().getBBox().width > jun.animation_size/2 + 15 ){
        text_list = main_source_desc.text().split(" ")
        for (i = 0; i < text_list.length; i ++) { 
            pass = "yes"
            main_source_desc.text(text_list[i]+" "+text_list[i+1])
            if (main_source_desc.node().getBBox().width <= jun.animation_size/2 + 15){
                text_list[i] = text_list[i]+" "+text_list[i+1]
                text_list.splice(i+1, 1)
                break
            }
        }
        main_source_desc
            .attr("text-anchor", "middle")
            .attr("class", "percent-complete1")
            .attr("dy", "24")
            .attr("dx", jun.animation_size * (0.3+(1-0.3)/2))
            .style("font-size", "15px")
            .style("fill", colors[1]);
        main_source_desc.text(text_list[0])
        var main_source_desc1 = text_group.append("text")
            .attr("text-anchor", "middle")
            .attr("class", "percent-complete1")
            .attr("dy", "43")
            .attr("dx", jun.animation_size * (0.3+(1-0.3)/2))
            .style("font-size", "15px")
            .style("fill", colors[1]);
        main_source_desc1.text(text_list[1])

        if (text_list.length == 3){
            var main_source_desc2 = text_group.append("text")
                .attr("text-anchor", "middle")
                .attr("class", "percent-complete1")
                .attr("dy", "62")
                .attr("dx", jun.animation_size * (0.3+(1-0.3)/2))
                .style("font-size", "15px")
                .style("fill", colors[1]);
            main_source_desc2.text(text_list[2])
        }
        translate_amount = text_group.node().getBBox().height/2
        translate_amount += 36

        text_group.attr("transform","translate(0," +translate_amount+")")
    }
    else {
        main_source_desc
            .attr("text-anchor", "middle")
            .attr("class", "percent-complete1")
            .attr("dy", "24")
            .attr("dx", jun.animation_size * (0.3+(1-0.3)/2))
            .style("font-size", "15px")
            .style("fill", colors[1]);
        translate_amount = text_group.node().getBBox().height/2
        translate_amount += 57

        text_group.attr("transform","translate(0," +translate_amount+")")
    }

    var textRounder = function(value){ return Math.round(value);};
    var textTween = function(){
        var i = d3.interpolate(progress, (Female_search[idid])/100); 
        return function(t) {  
            progress = i(t); 
            percentComplete.text(formatPercent1(progress*100)+"%"); }
    };

    percentComplete.transition()
        .duration(jun.animation_time)
        .tween("text", textTween); 

    var waveGroup = canvas.append("clipPath")      
        .attr("id", "ellipse-clip") 
        .selectAll('rect')
        .data(dollars)
        .enter()
        .append('rect')
        .attr('id','rect1')
        .attr('height',0)
        .attr('x',function(d,i){ return xscale(i)})
        .attr('y',0)
        .style('fill',function(d,i){ return colorScale(i); })
        .attr('width',jun.animation_size*0.3)
        .attr('transform', 'rotate(180 ' + jun.animation_size*0.3/2 +" " +jun.animation_size /2 +" )")
        .transition()
        .duration(jun.animation_time)//time in ms
        .attr("height", function(d){
            return yscale(d);
        })     

    var chart = canvas.append("g")  
        .attr("clip-path", "url(#ellipse-clip)")
    chart.append("rect")
        .attr("height", jun.animation_size)    
        .attr("width", jun.animation_size/2)    
        .style('fill',function(d,i){ return colorScale(i); })
}


// second statistic : proportion who worry about water
function worry_enter(idid) {
    value = Worry_search[idid]
    d3.select("#fillgauge1").remove()

    var btn = d3.select("#second_column").insert("svg",'#line_title')
    btn.attr("id", "fillgauge1")    
        .attr("width", jun.animation_size)
        .attr("height", jun.animation_size)
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 " +jun.animation_size.toString()+ " "+jun.animation_size.toString())
    if (Hwise_search[idid] == 1 ) {
        loadLiquidFillGauge("fillgauge1", value, config1);
    }
    else {
        loadLiquidFillGauge("fillgauge1", value, config2); 
    }
}

// third statistic : time spent collecting water
function time_spent_enter(idid) {
    allocated = Time_search[idid]
    hwise = Hwise_search[idid]
    progress = 0 
    var i = d3.interpolate(progress, allocated / 1); 
    if (hwise == 1 ) {
        var description = meter.append("text")
            .attr("text-anchor", "middle")
            .attr("class", "description")
            .attr("dy", "24px")
            .text("hrs/week")
            .style("font-size", "15px")
            .style("fill", jun.v1_color[1]);
        document.getElementsByClassName("foreground")[0].style.fill = jun.v1_color[0]
        document.getElementsByClassName("percent-complete")[0].style.fill = jun.v1_color[1]
    }
    else {
        var description = meter.append("text")
            .attr("text-anchor", "middle")
            .attr("class", "description")
            .attr("dy", "24px")
            .text("hrs/week")
            .style("font-size", "15px")
            .style("fill", jun.v2_color[1]);
        document.getElementsByClassName("foreground")[0].style.fill = jun.v2_color[0]
        document.getElementsByClassName("percent-complete")[0].style.fill = jun.v2_color[1]
    }
    d3.transition().duration(jun.animation_time).tween("progress", function() {
      return function(t) {
        progress = i(t);
        foreground.attr("d", arc.endAngle(twoPi * progress/Math.max(...Time_search)));
        percentComplete.text(formatPercent(progress));
      };
    })
}

// bottom_bar_enter : when description bar is closed
//      main role : hide bar for 3 statistics and "Data Collection Date" bar appear 
function bottom_bar_exit() { 
    document.getElementById("bottom_bar").style.zIndex = "-3"
    document.getElementById("legend1").style.zIndex = "0"
    document.getElementById("third_bar").style.zIndex = "0"
    document.getElementById("title_line2").style.zIndex = "0"
    document.getElementById("credit").style.zIndex = "0"

    if (document.getElementById("full_rect") != null)
    {
        document.getElementById("full_rect").remove()
    }

    d3.select("#fillgauge1").remove()

    document.getElementById("bottom_bar").style.background = "rgba(0,0,0,0.5)"
}
