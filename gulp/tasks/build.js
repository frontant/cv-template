var gulp = require("gulp"),
gulpSequence = require("gulp-sequence"),
htmlPdf = require("gulp-html-pdf"),
path = require("path"),
del = require("del"),
rename = require("gulp-rename"),
MergeStream = require("merge-stream"),
through = require("through2"),
cheerio = require("cheerio"),
tokenReplace = require("gulp-token-replace"),
process = require("process"),
fs = require("fs");


var pdfGenConfig = {
    width : "21cm",
    height : "29.7cm",
    websiteRootDir : "file://" + path.resolve(__dirname, "../.././app/build") + "/"
}

function createPdfDefault(){
    return gulp.src("./app/build/*.html")
    .pipe(htmlPdf({
        base: pdfGenConfig.websiteRootDir,
        width: pdfGenConfig.width,
        height: pdfGenConfig.height
    }))
    .pipe(rename("resume.pdf"))
    .pipe(gulp.dest("./app/build"));
}

function createPdfLight(){
    return gulp.src("./app/build/*.html")
    .pipe(through.obj(function(file, enc, cb){
        var $ = cheerio.load(file.contents.toString());

        $("body").addClass("print-version");

        var newFile = file.clone({contents: false});
        newFile.contents = Buffer.from($.html(), "utf-8");

        cb(null, newFile);
    }))
    .pipe(htmlPdf({
        base: pdfGenConfig.websiteRootDir,
        width: pdfGenConfig.width,
        height: pdfGenConfig.height
    }))
    .pipe(rename("resume-light.pdf"))
    .pipe(gulp.dest("./app/build"));
}


gulp.task("build-all", gulpSequence("sprite", "build"));

gulp.task("build", gulpSequence(
    "build.cleanup",
    ["styles"],
    ["build.copyHtml", "build.copyImages"],
    "build.createPdf"));

gulp.task("build.copyHtml", function(){
    var configFile = path.resolve(process.cwd(), "./app/contents/index.html.js");
    var config = eval(fs.readFileSync(configFile).toString());

    return gulp.src("./app/index.html")
    .pipe(tokenReplace({global: config}))
    .pipe(gulp.dest("./app/build"));
});

gulp.task("build.copyImages", function(){
    return gulp.src("./app/assets/images/**")
    .pipe(gulp.dest("./app/build/assets/images"));
});

gulp.task("build.copySpritesGraphics", function(){
    return gulp.src("./app/temp/sprite/css/**/*.{svg,png}")
    .pipe(gulp.dest("./app/build/assets/images/sprites"));
});

gulp.task("build.createPdf", ["build.copyHtml", "build.copyImages"], function(){
    stream = new MergeStream(createPdfDefault(), createPdfLight());

    return stream;
});

gulp.task("build.cleanup", function(){
    return del("./app/build/**");
});