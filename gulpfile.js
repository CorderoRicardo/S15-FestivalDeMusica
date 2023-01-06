// //example function on how to use Gulp
// function tarea(done) {
//     console.log('mi primer tarea');

//     done();
// }

// exports.tarea = tarea;

const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
function css(done) {
    //Identify the SASS file
    //Compile it
    //Save it to the disk
    src('src/scss/**/*.scss').pipe(sass()).pipe(dest('build/css'));

    done(); // callback
}

function dev(done) {
    watch('src/scss/**/*.scss', css);
    done();
}

exports.css = css;
exports.dev = dev;
