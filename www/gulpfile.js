var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');

gulp.task('browserify', function() {
	gulp.src('js/src/main.js')
		.pipe(browserify({transform: 'reactify'}))
		.pipe(concat('main.js'))
		.pipe(gulp.dest('js/build'));
});

gulp.task('default', ['browserify']);

gulp.task('watch', function() {
	gulp.watch('js/src/*.*', ['default']);
});