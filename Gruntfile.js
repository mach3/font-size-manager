
module.exports = function(grunt){

	[
		"grunt-contrib-uglify",
		"grunt-contrib-concat",
		"grunt-contrib-less",
		"grunt-contrib-watch"
	]
	.forEach(function(value){
		grunt.loadNpmTasks(value);
	});

	var component = grunt.file.readJSON("./component.json");

	var options = {
		splitBanners : true,
		banner : grunt.file.read("./src/banner.js").replace("{{version}}", component.version)
	};

	grunt.initConfig({
		less : {
			demo : {
				files : {
					"demo/style.css" : "demo/style.less"
				}
			}
		},
		watch : {
			less : {
				files : "demo/*.less",
				tasks : "less:demo"
			}
		},
		concat : {
			options : options,
			dist : {
				src : ["./src/font-size-manager.js"],
				dest : "./dist/font-size-manager.js"
			}
		},
		uglify : {
			options : options,
			dist : {
				src : ["./src/font-size-manager.js"],
				dest : "./dist/font-size-manager.min.js"
			}
		}
	});

	grunt.registerTask("default", ["concat", "uglify"]);

};