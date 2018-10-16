var gulp = require("gulp"),
svgSprite = require("gulp-svg-sprite"),
rename = require("gulp-rename"),
del = require("del"),
svg2png = require("gulp-svg2png"),
sequence = require("gulp-sequence"),
glob = require("glob");


var config = {
    shape: {
        spacing : {
            padding: 1 /* add some spacing between icons to prevent artifacts */
        }
    },
    mode : {
        css :{
            sprite : "sprite.svg",
            variables : {
                replaceSvgWithPng : function(){
                    return function(sprite, render){
                        return render(sprite).replace(/.svg$/, '.png');
                    };
                }
            },
            render : {
                css : {
                    template : "./gulp/templates/sprite.css"
                }
            }
        }
    }
}

gulp.task("sprite.create", function(){
    return gulp.src("./app/assets/images/icons/*.svg")
    .pipe(svgSprite(config))
    .pipe(gulp.dest("./app/temp/sprite"));
});

gulp.task("sprite.removeAllSprites", function(){
    return del("./app/assets/images/sprites/**");
})

gulp.task("sprite.cleanupTempDir", function(){
    return del("./app/temp/sprite");
})

gulp.task("sprite.createPng", ["sprite.create"], function(){
    var svgFiles = glob.sync("./app/temp/sprite/css/*.svg");
    
    if(svgFiles.length < 1){
        return;
    }

    return gulp.src("./app/temp/sprite/css/*.svg")
    .pipe(svg2png())
    .pipe(gulp.dest("./app/temp/sprite/css"));
});

gulp.task("sprite.copyCss", ["sprite.create"], function(){
    return gulp.src("./app/temp/sprite/css/sprite.css")
    .pipe(rename("_sprite.css"))
    .pipe(gulp.dest("./app/assets/styles/modules"));
});

gulp.task("sprite.copyGraphics", ["sprite.create", "sprite.createPng"], function(){
    return gulp.src("./app/temp/sprite/css/**/*.{svg,png}")
    .pipe(gulp.dest("./app/assets/images/sprites"));
});

gulp.task("sprite", sequence(
    ["sprite.removeAllSprites", "sprite.cleanupTempDir"],
    ["sprite.copyGraphics", "sprite.copyCss"],
    "sprite.cleanupTempDir"));
