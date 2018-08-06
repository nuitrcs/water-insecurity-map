var jun ={}

jun.map_key = 'pk.eyJ1IjoiZmVsYXZza3kiLCJhIjoiY2pmb3EwdjF3MHp4eTMybWR2aHVzNG1mOSJ9.QDrrYApB997cGXV7gnoNfQ'

jun.default_center_first = 8.233028050000001
jun.default_center_second = 11.853942649999999

mapboxgl.accessToken = jun.map_key
jun.map = new mapboxgl.Map({
    container: 'map', 
    style: 'mapbox://styles/mapbox/light-v9', 
  	zoom:1.1,
	center: [jun.default_center_first, jun.default_center_second],
});

jun.data_link = 'scripts/data/data2.json'
jun.image1_link = "scripts/images/marker1_sil.png"
jun.image2_link = "scripts/images/marker2_sil.png"

jun.color_standard = "Setting"

d3.json(jun.data_link,function(finished_data) {
    jun.data = finished_data
    drawMarkers()
    jun.map.addControl(new mapboxgl.NavigationControl());
})

jun.clicked =""

jun.timelist = ["All", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", 
				"Jan", "Feb", "Mar", "Apr", "May"]

jun.v1_color = ["#1C71AA", "#2080BF", "#289FED"]
jun.v2_color = ["#18C2A2", "#0FD2B4", "#11EDCB"]
jun.divider = [0, 1, 11, 19, 20, 23]

jun.animation_size = 130