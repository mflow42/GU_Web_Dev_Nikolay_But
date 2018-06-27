const gulp = require('gulp'), //Сам gulp
    sass = require('gulp-sass'), //Плагин для преобразования sass в css
    uglify = require('gulp-uglify'), //Плагин для сжатия js
    uglifyEs = require('gulp-uglify-es'), //Плагин для сжатия js
    autoPrefix = require('gulp-autoprefixer'), //Для добавления префиксов к css правилам
    htmlMin = require('gulp-htmlmin'), //Минификация html
    delFiles = require('del'), //Модуль для очистки дирректории
    cssMinify = require('gulp-csso'), //Минификация css
    rename = require('gulp-rename'), //Переименование файлов
    BS = require('browser-sync'), //Веб-сервер
    imageMin = require('gulp-imagemin'), //Веб-сервер
    babel = require('gulp-babel'), //Для преобразования ES6 -> ES5
    concat = require('gulp-concat'); //Для склеивания файлов

/**
 * 1. gulp.task() - создает новую задачу
 * 2. gulp.src() - выборка файлов для преобразования
 * 3. gulp.dest() - сохранение преобразованных файлов
 * 4. gulp.watch() - отслеживание изменений файлов
 */
gulp.task('default', function () {
    console.log('task default executed');
});

gulp.task('default', ['delFiles','delFiles', 'watchFiles', 'html', 'imagemin', 'json', 'fonts', 'sass', 'js', 'server'], function () {
    console.log('task gulp executed');
});

gulp.task('html', function () {
    gulp.src('./app/**/*.html')
        .pipe(htmlMin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('./dist'));

    BS.reload({
        stream: false
    });
});

gulp.task('sass', function () {
    gulp.src(['./app/css/**/*.css', './app/sass/**/*.sass', './app/scss/**/*.scss'])
        .pipe(sass())
        .pipe(autoPrefix())
        .pipe(gulp.dest('./dist/css'))
        .pipe(cssMinify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/css'));

    BS.reload({
        stream: false
    });
});

gulp.task('js', function () {
    gulp.src('./app/js/**/*.js')
        .pipe(concat('script.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(babel())
        .pipe(rename({
            dirname: './dist/js',
            suffix: '.min'
        }))
        // .pipe(uglify())
        // .pipe(uglifyEs())
        .pipe(gulp.dest('./dist/js'));

    BS.reload({
        stream: false
    });
});

gulp.task('imagemin', function () {
    gulp.src(['./app/img/**/*'])
        // .pipe(imageMin({
        //     progressive: true
        // }))
        .pipe(gulp.dest('./dist/img'))

    BS.reload({
        stream: false
    });
});

gulp.task('json', function () {
    gulp.src(['./app/json/**/*'])
        .pipe(gulp.dest('./dist/json'))
    BS.reload({
        stream: false
    });
});

gulp.task('fonts', function () {
    gulp.src(['./app/fonts/**/*'])
        .pipe(gulp.dest('./dist/fonts'))

    BS.reload({
        stream: false
    });
});

gulp.task('watchFiles', function () {
    gulp.watch('./app/html/**/*.html', ['html']);
    gulp.watch('./app/css/**/*.css', ['sass']);
    gulp.watch('./app/scss/**/*.scss', ['sass']);
    gulp.watch('./app/sass/**/*.sass', ['sass']);
    gulp.watch('./app/js/**/*.js', ['js']);
});

gulp.task('delFiles', function () {
    delFiles(['./dist/*']);
});

gulp.task('server', function () {
    BS({
        server: {
            baseDir: './dist'
        }
    });
});