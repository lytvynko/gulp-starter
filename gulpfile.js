const gulp = require('gulp'),
      sass = require('gulp-sass') (require('sass')), 
      browsersync = require('browser-sync').create(),
      imagemin = require('gulp-imagemin');

function style() {
    //1. Where is my scss file
    return gulp.src("./src/scss/style.scss")
    //2. pass file through sass compiler
    .pipe(sass().on('error', sass.logError))
    //3. Where to save css file
    .pipe(gulp.dest('./dist/css'))
    //4. Stream changes to all browsers
    .pipe(browsersync.stream());
}  

function image() {
    return gulp.src('./src/img/*')
    .pipe(imagemin({
        verbose: true
    }))
    .pipe(gulp.dest('dist/img'));
}

function watch() {
    browsersync.init({
        server: {
            baseDir: './src'
        }
    });
    gulp.watch('./src/scss/**/*.scss', style);
    gulp.watch('./**/*.html').on('change', browsersync.reload);
    gulp.watch('./src/js/**/*.js').on('change', browsersync.reload);
}
exports.style = style;
exports.image = image;
exports.watch = watch;