const gulp = require('gulp');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const concatCss = require('gulp-concat-css');
const cleanCSS = require('gulp-clean-css');

gulp.task('js', () => {
    browserify([
        'script/src/app.js'
    ])
    .transform('babelify', {
        presets: ['es2015']
    })
    .bundle()
    .pipe(source('script.js'))
    .pipe(buffer())
    .pipe(gulp.dest('public/'));
});

gulp.task('css', () => {
    return gulp.src([ 
        'style/src/app.css' 
    ])
    .pipe(concatCss("public/style.css"))
    .pipe(cleanCSS())
    .pipe(gulp.dest(''));
});

gulp.task('default', ['js', 'css'], () => {
    gulp.watch('script/src/app.js', ['js']);
    gulp.watch('style/src/app.css', ['css']);
});