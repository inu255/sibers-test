const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();


function convertSass(done) {
  gulp.src('./scss/*')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errorLogConsole: true,
      outputStyle: 'compressed'
    }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer({
      // browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css/'))
    .pipe(browserSync.stream())

  done();
}

function sync(done) {
  browserSync.init({
    server: {
      baseDir: './'
    },
    port: 3000
  })
  done();
}

function browserReload(done) {
  browserSync.reload();
  done();
}

function watchAll() {
  gulp.watch("./scss/*", convertSass);
  gulp.watch("./index.html", browserReload);
  gulp.watch("./index.js", browserReload);

}

gulp.task('default', gulp.parallel(watchAll, sync));
gulp.task(sync)
