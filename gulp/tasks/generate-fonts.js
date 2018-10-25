var gulp = require('gulp'),
    ttf2eot = require('gulp-ttf2eot'),
    ttf2woff = require('gulp-ttf2woff'),
    ttf2woff2 = require('gulp-ttf2woff2'),
    gulpSequence = require("gulp-sequence"),
    logger = require("gulp-logger");

var font2css = require('../modules/font2css');

gulp.task("generateFonts.fonts", function () {
    return gulp.src("./app/assets/fonts/**/*.ttf")
        .pipe(ttf2eot({
            clone: true
        }))
        .pipe(ttf2woff({
            clone: true
        }))
        .pipe(ttf2woff2({
            clone: true
        }))
        .pipe(logger())
        .pipe(gulp.dest("./app/temp/fonts"));
});

gulp.task("generateFonts.css", function () {
    return gulp.src([
            "./app/temp/fonts/**/*.{woff2,woff,eot}",
            "./app/assets/fonts/**/*.ttf"
        ])
        .pipe(font2css("fonts.css"), "../fonts")
        .pipe(gulp.dest("./app/assets/styles"));
});

gulp.task("generateFonts", gulpSequence("generateFonts.fonts", "generateFonts.css"));