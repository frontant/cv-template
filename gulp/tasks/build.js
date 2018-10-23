var gulp = require("gulp"),
gulpSequence = require("gulp-sequence"),
del = require("del");

gulp.task("build", gulpSequence(
    "build.cleanup",
    "generateIconCss",
    "styles",
    ["copy.html", "copy.images"],
    "generatePdf"));

gulp.task("build.cleanup", function(){
    return del("./app/build/**");
});
