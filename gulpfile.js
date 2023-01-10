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

//Image dependencies
const webp = require('gulp-webp');

function css(done) {
    //Identify the SASS file
    //Compile it
    //Save it to the disk
    src('src/scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(dest('build/css'));

    done(); // callback
}

function versionWebp(done) {
    const options = { quality: 50 };
    src('src/img/**/*.{png,jpg}').pipe(webp(options)).pipe(dest('build/img'));
    done();
}

function dev(done) {
    watch('src/scss/**/*.scss', css);
    done();
}

exports.css = css;
exports.versionWebp = versionWebp;
exports.dev = parallel(versionWebp, dev);
