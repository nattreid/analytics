var gulp = require('gulp'),
    less = require('gulp-less'),
    minify = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

var paths = {
    'dev': {
        'js': './resources/assets/js/',
        'less': './resources/assets/less/',
        'vendor': './resources/assets/vendor/'
    },
    'production': './assets/'
};

gulp.task('css', function () {
    return gulp.src(paths.dev.less + '*.less')
        .pipe(less())
        .pipe(concat('analytics.css'))
        .pipe(gulp.dest(paths.production));
});

gulp.task('cssMin', function () {
    return gulp.src(paths.dev.less + '*.less')
        .pipe(less())
        .pipe(minify({keepSpecialComments: 0}))
        .pipe(concat('analytics.min.css'))
        .pipe(gulp.dest(paths.production));
});

gulp.task('js', function () {
    return gulp.src(paths.dev.js + '*.js')
        .pipe(concat('analytics.js'))
        .pipe(gulp.dest(paths.production));
});

gulp.task('jsBoundled', function () {
    return gulp.src([
        paths.dev.vendor + 'Chart.js/dist/Chart.js',
        paths.dev.js + '*.js'
    ])
        .pipe(concat('analytics.boundled.js'))
        .pipe(gulp.dest(paths.production));
});

gulp.task('jsMin', function () {
    return gulp.src(paths.dev.js + '*.js')
        .pipe(uglify())
        .pipe(concat('analytics.min.js'))
        .pipe(gulp.dest(paths.production));
});

gulp.task('jsBoundledMin', function () {
    return gulp.src([
        paths.dev.vendor + 'Chart.js/dist/Chart.js',
        paths.dev.js + '*.js'
    ])
        .pipe(uglify())
        .pipe(concat('analytics.boundled.min.js'))
        .pipe(gulp.dest(paths.production));
});

gulp.task('watch', function () {
    gulp.watch(paths.dev.js + '/*.js', ['js', 'jsBoundled', 'jsMin', 'jsBoundledMin']);
    gulp.watch(paths.dev.less + '/*.less', ['css', 'cssMin']);
});

gulp.task('default', ['js', 'jsBoundled', 'jsMin', 'jsBoundledMin', 'css', 'cssMin', 'watch']); 