var gulp = require("gulp"),
gulpSequence = require("gulp-sequence"),
del = require("del");

gulp.task("build", gulpSequence(
    "build.cleanup",
    ["generateIconCss", "generateFonts.css"],
    "styles",
    ["copy.html", "copy.images", "copy.fonts"],
    "generatePdf"));

gulp.task("build-all", gulpSequence(
    "build.cleanup",
    ["generateIconCss", "generateFonts"],
    "styles",
    ["copy.html", "copy.images", "copy.fonts"],
    "generatePdf"));

gulp.task("build.cleanup", function(){
    return del("./app/build/**");
});
