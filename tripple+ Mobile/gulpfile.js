const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const webserver = require('gulp-webserver');

//Paths
const sassFiles = 'app/scss/**/*.scss';
const cssFiles = 'app/css/*.css';
const jsFiles = 'app/js/*.js';
const assets = 'app/assets/**/*'
const html = 'app/index.html';
const css = 'app/css'
const dist = 'dist';
const app = 'app';

// Browser versions
const AUTOPREFIXER_BROWSERS = [
    'ie >= 8',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 10',
    'android >= 4.4',
    'bb >= 10'
  ];

// Gulp task to compile SCSS files
gulp.task('sass', () => { 
    return gulp.src(sassFiles)
      // Convert the file
      .pipe(sass().on('error', sass.logError))
      // Prefix file
      .pipe(autoprefixer({
        browsers: AUTOPREFIXER_BROWSERS,
        cascade: false
      }))
      // Output
      .pipe(gulp.dest(css));
});

// Gulp task to minify CSS files
gulp.task('minify-css', () => {
    return gulp.src(cssFiles)
      // Minify the file
      .pipe(cleanCSS())
      // Output
      .pipe(gulp.dest(dist + '/css'));
});

// Gulp task to minify JavaScript files
gulp.task('scripts', () => {
    return gulp.src(jsFiles)
      // Minify the file
      .pipe(uglify())
      // Output
      .pipe(gulp.dest(dist + '/js'))
  });

// Gulp task to minify HTML files
gulp.task('minify-html', () => {
    return gulp.src(html)
      // Minify the file
      .pipe(htmlmin({
		collapseWhitespace: true,
		removeComments: true
      }))
      // Output
      .pipe(gulp.dest(dist));
  });

// Clean output directory
gulp.task('clean', () => del('dist/*'));

// Gulp task to copy assets to dist folder
gulp.task('copy-assets', () => {
	return gulp.src(assets, {base: 'app'})
      .pipe(gulp.dest(dist));
});

// Gulp task to minify ALL files
gulp.task('build', 
    gulp.series(
      'clean',
      'minify-css',
      'scripts',
      'minify-html',
      'copy-assets'
    )
);

// Gulp task to watch files
gulp.task('watch', () => {
    // Watch SCSS files
    gulp.watch(sassFiles, gulp.series('sass'));
    gulp.watch(jsFiles, gulp.series('scripts'));
});

// Gulp task to set up a webserver
gulp.task('server', () => {
	gulp.src(app)
      .pipe(webserver({
        fallback: html
    }));
});

gulp.task('default', gulp.parallel('server', 'watch'));