// //example function on how to use Gulp
// function tarea(done) {
//     console.log('mi primer tarea');

//     done();
// }

// exports.tarea = tarea;

const { src, dest, watch, parallel } = require('gulp');

// CSS dependencies
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

//Image dependencies
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

// JS dependencies
const terser = require('gulp-terser-js');

function css(done) {
    //Identify the SASS file
    //Compile it
    //Save it to the disk
    src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'));

    done(); // callback
}

function versionWebp(done) {
    const options = { quality: 50 };
    src('src/img/**/*.{png,jpg}').pipe(webp(options)).pipe(dest('build/img'));
    done();
}

function versionAvif(done) {
    const options = { quality: 50 };
    src('src/img/**/*.{png,jpg}').pipe(avif(options)).pipe(dest('build/img'));
    done();
}

function imagenes(done) {
    const options = { optimizationLevel: 3 };
    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(options)))
        .pipe(dest('build/img'));

    done();
}

function javascript(done) {
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'));
    done();
}

function dev(done) {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);
    done();
}

exports.css = css;
exports.js = javascript;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.imagenes = imagenes;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev);
