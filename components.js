{
	"category": "CATEGORY_ECHARTS",
	"components": [{
			"className": "echarts.Chart2D",
			"displayName": "DISP_NAME_CHART2D",
			"version": "1.0",
			"source": "src/chart2d.js",
			"icon": "assets/Bar",
			"dimensions": [300, 300],
			"dependencies": [
				{"src": "../lib/jquery-2.2.4.min.js", "cdn": "https://code.jquery.com/jquery-2.2.4.min.js"},
				{"src": "../sdk/anwidget.js"},
				{"src": "libs/echarts.min.js"}
			],
			"properties": [
				{"name": "PROP_THEME", "variable": "themejson", "type": "File Path", "default": ""},
				{"name": "PROP_OPTION", "variable": "optionjson", "type": "File Path", "default": ""}
			]
		}]
}

