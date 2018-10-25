var gulp = require("gulp"),
postcss = require("gulp-postcss"),
cssImport = require("postcss-import"),
cssvars = require("postcss-simple-vars"),
nested = require("postcss-nested"),
mixins = require("postcss-mixins"),
hexrgba = require("postcss-hexrgba"),
calc = require("postcss-calc"),
autoprefixer = require("autoprefixer");

gulp.task("styles", function(){
    return gulp.src("./app/assets/styles/*.css")
    .pipe(postcss([
        cssImport,
        mixins,
        cssvars,
        calc,
        nested,
        hexrgba,
        autoprefixer({
            browsers: ["last 15 versions"]
        })
    ]))
    .on("error", function(errorInfo){
        console.log(errorInfo.toString());
        this.emit("end");
    })
    .pipe(gulp.dest("./app/build/assets/styles"));
});
