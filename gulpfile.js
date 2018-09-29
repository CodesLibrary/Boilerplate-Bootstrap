const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

gulp.task('serve', ['sass', 'scripts'], function() {

  browserSync.init({
      server: ""
  });

  gulp.watch("src/scss/*.scss", ['sass']);
  gulp.watch("src/js/*.js", ['scripts']);
  gulp.watch("index.html").on('change', browserSync.reload);
});

gulp.task('sass', function() {
  return gulp.src("src/scss/*.scss")
      .pipe(sass())
      .pipe(gulp.dest("dist/css"))
      .pipe(browserSync.stream());
});
 
gulp.task('sass:watch', function () {
  gulp.watch('src/scss/*.scss', ['sass']);
});



gulp.task('image', () =>
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
        
);


 


gulp.task('scripts', function() {
  return gulp.src('src/js/*.js')
      .pipe(concat('scripts.js'))
      .pipe(gulp.dest('dist/js'))
      .pipe(rename('scripts.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'))
      .pipe(browserSync.stream());
});


gulp.task('default', [ 'serve','image',]);