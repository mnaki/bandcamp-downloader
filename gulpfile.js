var gulp = require('gulp');
var util = require('util');


gulp.task('default', ['serve'], function () {
    return true;
});

gulp.task('watch', function () {
    return (
        gulp.watch('index.js').on('change', function (evt) {
        	util.log('File %s changed', evt.path);
        }
    );
}