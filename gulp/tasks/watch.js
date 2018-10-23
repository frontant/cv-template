var gulp = require("gulp"),
watch = require("gulp-watch"),
browserSync = require("browser-sync"),
batch = require("gulp-batch");

gulp.task("watch", function(){
    browserSync.init({
        notify: false,
//        ghostMode: false,
        localOnly: true,
        open: false,
        online: false,
        xip: false,
        tunnel: null,
        server:{
            baseDir: "app/build"
        }
    });

    watch("./app/assets/styles/**/*.css", batch(function(events, done){
        gulp.start("watch.cssInject", done);
    }));

    watch(["./app/*.html", "./app/contents/*.js"], batch(function(events, done){
        gulp.start("watch.waitForHtml", done);
    }));
});

gulp.task("watch.cssInject", ["styles"], function(){
    return gulp.src("./app/build/assets/styles/styles.css")
    .pipe(browserSync.stream());
});

gulp.task("watch.waitForHtml", ["copy.html"], function(){
    browserSync.reload();
})