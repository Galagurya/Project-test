var gulp            = require('gulp'),
	less            = require('gulp-less'),
	browserSync     = require('browser-sync'),
	concat          = require('gulp-concat'),
	uglify          = require('gulp-uglifyjs'),
    cssnano         = require('gulp-cssnano'),
    del             = require('del'),
    rename          = require('gulp-rename'),
    LessAutoprefix  = require('less-plugin-autoprefix');;

var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });

gulp.task('less', function(){
	return gulp.src('app/less/**/*.less')
	.pipe(less({
        plugins: [autoprefix]
      }))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('css-libs', ['less'], function() {
    return gulp.src('app/css/libs.css') // Выбираем файл для минификации
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
        .pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
});

gulp.task('browser-sync', function() { 
    browserSync({ 
        server: { 
            baseDir: 'app' 
        },
        notify: false 
    });
});

gulp.task('scripts', function(){
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js',
        'app/libs/jquery-validation/dist/jquery.validate.min.js',
        'app/libs/owl.carousel/dist/owl.carousel.min.js'
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
});

gulp.task('watch',['browser-sync', 'css-libs', 'scripts'], function(){
	gulp.watch('app/less/**/*.less',['less']);
	gulp.watch(['app/*.html', 'app/js/**/*.js'], browserSync.reload);
});

// Удаляем папку dist перед сборкой
gulp.task('clean', function() {
    return del.sync('dist'); 
});

//подготавливаем наш проект, собираем все нужные файлы и переносим в папк
gulp.task('build', ['clean',  'css-libs', 'scripts'], function() {

    var buildCss = gulp.src([ // Переносим библиотеки в продакшен
        'app/css/main.css',
        'app/css/libs.min.css'
        ])
    .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/font/**/*') // Переносим шрифты в продакшен
    .pipe(gulp.dest('dist/font'))
    
    var buildImg = gulp.src('app/img/**/*') // Берем все изображения из app
        .pipe(gulp.dest('dist/img'));
    
    var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
    .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
    .pipe(gulp.dest('dist'));

});
