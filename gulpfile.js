var gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  sourcemap = require('gulp-sourcemaps'),
  csso = require('gulp-csso'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  del = require('del'),
  server = require('browser-sync').create(),
  svgmin = require('gulp-svgmin'),
  svgstore = require('gulp-svgstore'),
  posthtml = require('gulp-posthtml'),
  include = require('posthtml-include');

gulp.task('css', function () {
  return gulp.src('src/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('public/css'))
    .pipe(server.stream());
});


gulp.task('normalize', function () {
  return gulp.src('node_modules/normalize.css/normalize.css')
    .pipe(gulp.dest('public/css'))
});

gulp.task('clean', function () {
  return del('public');
});

gulp.task('svgminimize', function () {
  return gulp.src('src/img/**/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('src/img'));
});

gulp.task('sprite', function () {
  return gulp.src('src/img/sign_*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('public/img'));
});

gulp.task('html', function () {
  return gulp.src('src/*.html')
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest('public'));
});

gulp.task('copy', function () {
  return gulp.src([
      'src/fonts/**/*.{woff}',
      'src/img/**',
      'src/js/**'
    ], {
      base: 'src'
    })
    .pipe(gulp.dest('public'));
});

gulp.task('build', gulp.series(
  'clean',
  'copy',
  'normalize',
  'css',
  'sprite',
  'html'
));

gulp.task('server', function () {
  server.init({
    server: 'public/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('src/sass/**/*.{scss,sass}', gulp.series('css'));
  gulp.watch('src/*.html').on('change', server.reload);
});

gulp.task('start', gulp.series('normalize', 'css', 'server'));
