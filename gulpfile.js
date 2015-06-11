var gulp       = require('gulp');
var path       = require('path');
var watch      = require('gulp-watch');
var nodemon    = require('gulp-nodemon');
var less       = require('gulp-less');
var notify     = require('gulp-notify');
var livereload = require('gulp-livereload');

//  LESS
gulp.task('less', function () {
  gulp.src('public/css/less/style.less')
    .pipe(less({ paths: [ path.join(__dirname, 'less', 'includes') ]
  })
  .on('error', function(err) {
    this.emit('end');
  }))
  .on("error", notify.onError(function(error) {
    return "Failed to Compile LESS: " + error.message;
  }))
  .pipe(gulp.dest('./public/css'))
  .pipe(livereload());
});

// HTML
gulp.task('html', function() {
  return gulp.src([ 'public/index.html' ])
  .pipe(livereload());
});

// JS
gulp.task('js', function() {
  return gulp.src([ 'public/js/**/*.js' ])
  .pipe(livereload());
});

//  Watch
gulp.task('watch', function () {
    livereload.listen();
    // nodemon restart app
    nodemon({
    script: 'app.js',
    ext: 'js'
    }).on('restart', function(){
    gulp.src('app.js')
    .pipe(livereload());
    });
    gulp.watch(['public/js/**/*'], ['js']);
    gulp.watch(['public/css/less/**/*'], ['less']);
    gulp.watch('public/index.html', ['html']);
});

//  Build
gulp.task('build', function () {
  gulp.src('less/style.less')
  .pipe(gulp.dest('./public/css/'));
});

gulp.task('default', ['watch']);
gulp.task('build', ['less']);