(function ($) {
	// Register a datepicker widget as an.DatePicker
	$.anwidget("echarts.Chart2D", {
		options: {
			'visible': true,
			'disabled': false,
			'position': 'absolute',
			'display': 'block'
		},
		_props: ["left", "top", "width", "height", "position", "display", "transform"],
		_attrs: [],
		getCreateOptions: function () {
			return $.extend(this.options, { 'id': "echarts" + _widgetID++ });
		},
		// Create a div with the label text and an input text 
		// The input text field will be converted to a datepicker widget at runtime
		getCreateString: function () {
			return "<div id='" + this._options['id'] + "'></div>";
		},
		getProperties: function () {
			return this._props;
		},
		getAttributes: function () {
			return this._attrs;
		},
		attach: function (parent, bPrepend) {
			// call the base function, but remember if the instance is already attached
			// On the first attach, we convert the textinput to a datepicker using the jqueryui widget call
			var alreadyAttached = this._attached;
			this._superApply(arguments);

			if (alreadyAttached)
				return;

			// This is called only when we are attaching the instance for the first time
			var themefile = this._options['themejson'];
			var _this = this;
			if (themefile != "" & themefile != "assets/") {
				$.getJSON(themefile, function (themeJSON) {
					_this.chart = echarts.init(_this._$this.get(0), themeJSON.theme);
					_this.initOption();
				});
			} else {
				this.chart = echarts.init(this._$this.get(0));
				this.initOption();
			}
			$(parent).trigger("attached", this.getEventData("attached"));

			this._$this.css("display", this._options['display']);
			this._$this.css("position", this._options['position']);
		},
		initOption: function () {
			this.chart.resize({ width: this._$this.css("width"), height: this._$this.css("height") });
			// 指定图表的配置项和数据
			var optionfile = this._options['optionjson'];
			var _this = this;
			if (optionfile != "" & optionfile != "assets/") {
				$.getJSON(optionfile, function (optionJSON) {
					console.log(optionJSON);
					// 使用刚指定的配置项和数据显示图表。
					_this.setOption(optionJSON);
				});
			}
		},
		setOption: function (option) {
			this.chart.setOption(option);
		},
		update: function (force) {
			var updateSize = force || this._dirty["width"] || this._dirty["height"];
			// Apply css properties on the container div
			this.applyProperties(this._$this, force);
			// But attributes on the real element
			this.applyAttributes(this._$this, force);

			if (updateSize) {
				if (this.chart) {
					this.chart.resize({ width: this._$this.css("width"), height: this._$this.css("height") });
				}
			}

		}
	});
})(jQuery);