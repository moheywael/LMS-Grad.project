const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const nodemon = require('gulp-nodemon');

// compile SASS files into CSS
function compileSass() {
  return gulp.src('src/sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./src/sass/dist/'))
    .pipe(browserSync.stream());
}

// start local server and watch for changes
function serve() {

  // start nodemon
  nodemon({
    script: 'server.js',
    ext: 'js html',
    env: { 'NODE_ENV': 'development' },
    ignore: ['node_modules/']
  });

  // start local server
  browserSync.init({
    proxy: 'http://localhost:3000',
    port: 5000,
    reloadDelay: 500
  });

  // watch for changes to SASS files
  gulp.watch('src/sass/**/*.scss', compileSass).on('change', () => {
    // console.clear()
    browserSync.reload
  });

  // watch for changes to EJS files
  gulp.watch('./src/views/*.ejs').on('change', browserSync.reload)
  gulp.watch('./src/views/**/*.ejs').on('change', () => {
    // console.clear()
    browserSync.reload
  });

  // watch for changes to JS files
  gulp.watch('./src/scripts/**/*.js').on('change', () => {
    // console.clear()
    browserSync.reload
  });

  // reload browser on server file changes
  gulp.watch('server.js').on('change', browserSync.reload);
}

exports.default = serve