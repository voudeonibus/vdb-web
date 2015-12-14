var gulp            = require ('gulp')  ,
	browserify    = require ('gulp-browserify'),
	react         = require ('gulp-react'),
	browserSync = require('browser-sync'),
	gutil = require("gulp-util"),
	webpack = require("webpack"),
	webpackConfig = require("./webpack.config.js");


function swallowError (error) {

  // If you want details of the error in the console
  console.log(error.toString());

  this.emit('end');
}

gulp.task('jsx', function () {  
	return gulp.src('jsx/**/*.jsx')
	.pipe(react())
	.on('error', swallowError)
	.pipe(gulp.dest('js/'));
});

gulp.task('browser-sync', function() {
	var files = [
	'jsx/**/*.jsx'
	];

	browserSync.init(files, {
		server: {
			baseDir: './'
		},
		port: 8000,
		notify: false
	});
});

gulp.task("webpack:build", ['jsx'], function(callback) {
	// modify some webpack config options
	var myConfig = Object.create(webpackConfig);

	// run webpack
	webpack(myConfig, function(err, stats) {
		if(err) throw new gutil.PluginError("webpack:build", err);
		gutil.log("[webpack:build]", stats.toString({
			colors: true
		}));
		callback();
	});
});

gulp.task('watch', function () {
	gulp.watch(('jsx/**/*.jsx'), ['webpack:build']);
});


gulp.task('default', ['watch', 'browser-sync', 'webpack:build']);


