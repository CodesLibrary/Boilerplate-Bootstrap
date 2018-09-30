const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
var concatCss = require('gulp-concat-css');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');


gulp.task('serve', ['sass', 'scripts'], function() {

  browserSync.init({
      server: "app"
  });

  gulp.watch("app/src/scss/**/*.scss", ['sass']);
  gulp.watch("app/src/js/*.js", ['scripts']);
  gulp.watch("index.html").on('change', browserSync.reload);
});

gulp.task('sass', function() {
  return gulp.src("app/src/scss/*.scss")
      .pipe(sass())
      .pipe(concatCss("layout.min.css"))
      .pipe(cleanCSS())
      .pipe(gulp.dest('app/dist/css'))
      .pipe(browserSync.stream());
});

gulp.task('image', () =>
    gulp.src('app/src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('app/dist/images'))
        
);

gulp.task('scripts', function() {
  return gulp.src('app/src/js/*.js')
      .pipe(concat('scripts.min.js'))    
      .pipe(uglify())
      .pipe(gulp.dest('app/dist/js'))
      .pipe(browserSync.stream());
});


gulp.task('default', [ 'serve','image',]);