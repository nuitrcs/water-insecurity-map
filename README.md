# Water Insecurity Map
Read this in raw for proper format 

## File structure
```
water-insecurity-map
├── index.html
├── README.md
└── scripts
	├── mods
	│	├── all_function.js 			: list of most functions used in program
	│	├── controller.js 				: store some variables that are applied to the whole map
	│	├── jquery-3.3.1.min.js 		: jquery (no need to change)
	│	├── interaction.js 				: some functions related to key press or click 
	│	├── d3.slider.js 				: slider for "Data Collection Date" bar
	│	├── typeahead.bundle.min.js 	: for search engine (no need to change)
	│	├── bloodhound.min.js 			: for search engine (no need to change)
	│	├── multiple-select.js 			: for "regions" and "HWISE Version" selections (no need to change)
	│	├── extra_function.js 			: extra functions
	│	├── liquidFillGauge.js 			: for "Proportion who worry about water" (no need to change)
	│	├── water_fill.js 				: for "Proportion who worry about water" - basic configuration
	│	└── docsChart.js 				: for "Time spent collecting water"
	├── css
	│	├── bootstrap.css 				
	│	├── d3.slider.css 				 
	│	├── index.css 					
	│	├── multiple-select.css 		
	│	└── multiple-select.png 		
	├── data
	│	└── data3.json
	└── images
```

major id and class names : [here](https://github.com/nuitrcs/water-insecurity-map/blob/master/useful/id:class.pdf)

## Maintenance 
1. When new research site is added 
	- [index.html] Change number inside <span id ="results_num"> accordingly : I could not figure out how to automatically update this number when the website initially loads. Therefore, for now, you need to manually change this number. After you do this, numbers will change automatically based on the filters or searches. 
	- [controller.js] Change jun.default_center_first, jun.default_center_second 
	- [controller.js] Change jun.divider 
	- [images] Check whether the name of the picture is in this format (region, country_1.jpg) 
	- [data3.json] Check whether it has all data it needs + update id_number
2. If the map gets really popular and it (fortunately and not so fortunately) goes over 50,000 views per month, feel free to use my API key which is mentioned in controller.js
3. For more information, contact JunHwa Lee (junlee2020@u.northwestern.edu)
