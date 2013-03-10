/*!
 *
 * FontSizeManager
 * ---------------
 * Manage base font-size with class of HTML element
 *
 * @version 1.0.0
 * @require jquery.js
 * @author mach3
 * @url http://github.com/mach3/font-size-manager
 *
 */

(function($){

	/**
	 * FontSizeManager
	 * ---------------
	 * Manage font-size with the class of HTML element
	 *
	 * @class
	 */
	var FontSizeManager = function(option){

		var my = this;

		my.optionDefault = {
			classPrefix : "font-size-",
			defaultSize : "normal",
			sizes : ["small", "normal", "large"],
			cookie : true,
			cookieName : "fontSize",
			cookiePath : "/",
			cookieExpireDays : 7
		};

		my.template = {
			cookie : "{{key}}={{value}}; path={{path}}; expires={{expires}}"
		};

		my.option = null;
		my.size = "normal";

		/**
		 * Initialize
		 *
		 * @constructor
		 */
		my.init = function(option){
			this.option = $.extend({}, this.optionDefault);
			this.config(option);
			if(this.option.cookie){
				this.load();
			} else {
				this.set(this.option.defaultSize);
			}
		};

		/**
		 * Configure options
		 * 
		 * @param Object option
		 * @return FontSizeManager
		 */
		my.config = function(option){
			$.extend(this.option, option);
			return this;
		};

		/**
		 * Save the font-size as cookie
		 *
		 * @return FontSizeManager
		 */
		my.save = function(){
			var expires;

			expires = (function(){
				var time = my.option.cookieExpireDays * 60 * 60 * 24 * 1000 + (new Date()).getTime();
				return (new Date(time)).toUTCString();
			}());
			document.cookie = this.template.cookie
			.replace("{{key}}", this.option.cookieName)
			.replace("{{value}}", encodeURIComponent(this.size))
			.replace("{{path}}", this.option.cookiePath)
			.replace("{{expires}}", expires);
			return this;
		};

		/**
		 * Load the font-size from cookie
		 *
		 * @return FontSizeManager
		 */
		my.load = function(){
			var hasCookie = false;
			$.each(document.cookie.split("; "), function(i, item){
				var items = item.split("=");
				if(items[0] === my.option.cookieName){
					my.set(decodeURIComponent(items[1]));
					hasCookie = true;
					return false;
				}
			});
			if(! hasCookie){
				this.set(this.option.defaultSize);
			}
			return this;
		};

		/**
		 * Set the font-size with name
		 *
		 * @param String name
		 * @return FontSizeManager
		 */
		my.set = function(name){
			var $html = $("html");

			this.size = name;
			if(this.option.cookie){
				this.save();
			}
			$.each(this.option.sizes, function(i, size){
				$html.removeClass(my.option.classPrefix + size);
			});
			$html.addClass(this.option.classPrefix + this.size);
			return this;
		};

		this.init.apply(this, arguments);
	};

	/**
	 * Define `$.fontSizeManagerOption` to configure, before initialize
	 *
	 * @example
	 * $.fontSizeManagerOption = { cookie : false };
	 */
	$.fontSizeManager = new FontSizeManager($.extend({}, $.fontSizeManagerOption));

}(jQuery));