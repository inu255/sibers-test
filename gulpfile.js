const gulp = require('gulp');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const minifyJs = require('gulp-minify');
const sass = require('gulp-sass');
const clean = require('gulp-clean');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();


function convertSass(done) {
  gulp.src('./blocks/**/*.scss')
    .pipe(concat('index.scss'))
    .pipe(sourcemaps.init())
    .pipe(sass({
      errorLogConsole: true,
      outputStyle: 'compressed'
    }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream())

  done();
}

function concatJs(done) {
  gulp.src('./blocks/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('index.js'))
    .pipe(minifyJs())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());

  // gulp.src('./index.js')
  //   .pipe(clean())

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
  gulp.watch("./blocks/**/*.scss", convertSass);
  gulp.watch("./index.html", browserReload);
  gulp.watch("./blocks/**/*.js", concatJs);

}

gulp.task('default', gulp.parallel(watchAll, sync));
gulp.task(sync)
