// //example function on how to use Gulp
// function tarea(done) {
//     console.log('mi primer tarea');

//     done();
// }

// exports.tarea = tarea;

const { src, dest } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
function css(done) {
    //identificar el archivo SASS
    //Compilarlo
    //Almacenarlo en el disco duro
    src('src/scss/app.scss').pipe(sass()).pipe(dest('build/css'));

    done(); // callback que avisa a Gulp cuando llegamos al final
}

exports.css = css;
