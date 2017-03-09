var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var gulpsync = plugins.sync(gulp)
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var cssnanoOpts = {
   safe: true,
   discardUnused: false, // no remove @font-face
   reduceIdents: false // no change on @keyframes names
};

var basePath = "./bower_components/angular-ui-select/dist/";
var customPath = "./src/";
var sourceJSPaths = [
	basePath + '**/*.js'
];
var sourceCssPaths = [
	basePath + 'select.css',
	customPath + 'ui-select.css'
]
var destPaths = "dist/";

gulp.task('extractJS',function(){
	gulp.src(sourceJSPaths)
		.pipe(gulp.dest(destPaths));
})

gulp.task('extractCSS',function(){
	gulp.src(sourceCssPaths)
		.pipe(concat('select.css'))
		.pipe(gulp.dest(destPaths))
		.pipe(cssnano(cssnanoOpts))
		.pipe(concat('select.min.css'))
		.pipe(gulp.dest(destPaths));
});

// Serve files with auto reaload
gulp.task('browsersync', function() {
    console.log('Starting BrowserSync..');

    browserSync({
        notify: false,
        port: 3020,
        server: {
            baseDir: '.'
        }
    });
});
// Server for development
gulp.task('serve', gulpsync.sync([
    'default',
    'browsersync'
]), done);

function done() {
    console.log('************');
    console.log('* All Done * You can start editing your code, BrowserSync will update your browser after any change..');
    console.log('************');
}


gulp.task('default',['extractJS','extractCSS'])