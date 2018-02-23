var gulp         = require('gulp'),
	less         = require('gulp-less'),
	browserSync  = require('browser-sync'),
	concat       = require('gulp-concat'),
	uglify       = require('gulp-uglifyjs'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('less', function(){
	return gulp.src('app/less/**/*.less')
	.pipe(less())
    .pipe(autoprefixer())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('browser-sync', function() { 
    browserSync({ 
        server: { 
            baseDir: 'app' 
        },
        notify: false 
    });
});

gulp.task('watch',['browser-sync','less'], function(){
	gulp.watch('app/less/**/*.less',['less']);
	gulp.watch(['app/*.html', 'app/js/**/*.js'], browserSync.reload);
});