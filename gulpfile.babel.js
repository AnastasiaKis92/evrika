import gulp from 'gulp';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import csso from 'postcss-csso';
import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import rename from 'gulp-rename';
import pug from 'gulp-pug';
import svgmin from 'gulp-svgmin';
import svgSprite from 'gulp-svg-sprite';
import terser from 'gulp-terser';
import cwebp from 'gulp-cwebp';
import del from 'del';
import htmlmin from 'gulp-htmlmin';
import gcmq from 'gulp-group-css-media-queries';
import webpackStream from 'webpack-stream';
import ghpages from 'gh-pages';
import stylus from 'gulp-stylus';
import ttf2woff2 from 'gulp-ttf2woff2';

// Scripts
export const script = () => gulp.src('source/scripts/main.js')
  .pipe(webpackStream({
    mode: 'production',
    output: {
      filename: 'main.js',
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader'
        }
      ]
    }
  }))
  .pipe(plumber())
  .pipe(terser())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('./build/scripts'));

// Fonts
export const fonts = (done) => {
  gulp.src(['source/fonts/*.ttf'])
    .pipe(ttf2woff2())
    .pipe(gulp.dest('build/fonts'));
  done();
};

// Styles
export const styles = () => gulp.src('source/styles/*.styl')
  .pipe(plumber({
    errorHandler: function (err) {
      console.log(err);
      this.emit('end');
    }
  }))
  .pipe(stylus({
    'include css': true,
  }))
  .pipe(gcmq())
  .pipe(postcss([
    autoprefixer(),
    csso()
  ]))
  .pipe(gulp.dest('build/css'))
  .pipe(browserSync.stream());

// Pug
export const template = () => gulp.src('source/pages/*.pug')
  .pipe(plumber())
  .pipe(
    pug({
      basedir: 'source',
      pretty: true
    })
  )
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('build'));

// Images
const optimizeImages = () => gulp.src('source/img/**/*.{jpg,png}')
  .pipe(cwebp())
  .pipe(gulp.dest('build/images'));

const copyImages = () => gulp.src('source/img/**/*.{jpg,png}')
  .pipe(gulp.dest('build/images'));

// WebP
const createWebp = () => gulp.src(['source/img/**/*.{jpg,png}', '!source/img/favicons/*{png,svg}'])
  .pipe(cwebp())
  .pipe(gulp.dest('build/images'));

// SVG
const svg = () => gulp.src(['source/img/**/*.svg'])
  .pipe(svgmin())
  .pipe(gulp.dest('build/images'));

// SVG Sprite
const config = {
  mode: {
    stack: true
  }
};

export const svgSprites = () => gulp.src('source/svg-sprites/*.svg')
  .pipe(svgSprite(config))
  .pipe(rename('common.svg'))
  .pipe(gulp.dest('build/images/svg-sprites'));

// Copy ico, webmanifest
export const copy = (done) => {
  gulp.src([
    'source/*.ico',
    'source/*.webmanifest'
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'));
  done();
};

// Clean
const clean = () => del('build');

// Server
const server = (done) => {
  browserSync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
    online: true
  });
  done();
};

// Reload
const reload = (done) => {
  browserSync.reload();
  done();
};

// Watcher
const watcher = () => {
  gulp.watch([
    './source/styles/**/*.styl',
    './source/blocks/**/*.styl'
  ], gulp.series(styles));
  gulp.watch([
    'source/pages/*.pug',
    'source/blocks/**/*.pug'
  ], gulp.series(template, reload));
  gulp.watch([
    'source/blocks/**/*.js',
    'source/scripts/**/*.js'
  ], gulp.series(script, reload));
};

// Github pages
export const pages = (cb) => ghpages.publish('./build', cb);

export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    fonts,
    styles,
    template,
    script,
    createWebp,
    svg,
    svgSprites
  ),
  gulp.series(
    server,
    watcher
  ));

export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel (
    fonts,
    styles,
    template,
    script,
    svg,
    svgSprites,
    createWebp
  ),
  pages);
