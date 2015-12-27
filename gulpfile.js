var gulp = require('gulp');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var rimraf = require('rimraf');

// Engine
gulp.task('engine', function() {
	return gulp.src('./src/index.html')
		.pipe(usemin({
			css: [ minifyCss({ keepSpecialComments: 0 }) ],
			js: [ uglify() ]
		}))
		.pipe(gulp.dest('./build/'));
});

// Ionicons
gulp.task('ionicons', function() {
	return gulp.src(['./bower_components/ionicons/fonts/ionicons.*'])
		.pipe(gulp.dest('./build/fonts/'));
});

// OpenSans
gulp.task('open-sans', function() {
	return gulp.src(['./bower_components/open-sans-fontface/fonts/*/OpenSans-*'])
		.pipe(gulp.dest('./build/css/fonts/'));
});

// Build
gulp.task('build', ['engine', 'ionicons', 'open-sans']);

// Clean
gulp.task('clear', function() {
    rimraf.sync('./build');
});

// Automating the Automation
gulp.task('watch', ['build'], function() {
    gulp.watch(['./src/**/*.*'], ['build']);
});