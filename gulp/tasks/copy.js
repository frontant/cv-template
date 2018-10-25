var gulp = require("gulp"),
path = require("path"),
tokenReplace = require("gulp-token-replace"),
fs = require("fs");

gulp.task("copy.html", function(){
    var configFile = path.resolve(process.cwd(), "./app/contents/index.html.js");
    var config = eval(fs.readFileSync(configFile).toString());

    return gulp.src("./app/index.html")
    .pipe(tokenReplace({global: config}))
    .pipe(gulp.dest("./app/build"));
});

gulp.task("copy.images", function(){
    return gulp.src("./app/assets/images/**")
    .pipe(gulp.dest("./app/build/assets/images"));
});

gulp.task("copy.fonts", function () {
    return gulp.src([
            "./app/temp/fonts/**/*.{woff2,woff,eot}",
            "./app/assets/fonts/**/*.ttf"
        ])
        .pipe(gulp.dest("./app/build/assets/fonts"));
});
