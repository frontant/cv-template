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
fs = require("fs");

var pdfGenConfig = {
    format : "A4",
    orientation : "portrait",
    websiteRootDir : "file:///" + path.resolve(__dirname, "../.././app/build") + "/"
}

function createPdf(isPrintVersion){
    var fileName = isPrintVersion ? "resume-light.pdf" : "resume-dark.pdf";

    return gulp.src("./app/build/*.html")
    .pipe(through.obj(function(file, enc, cb){
        var $ = cheerio.load(file.contents.toString());

        $("html").css("background-color", "#fff");

        if(isPrintVersion){
            $("html").addClass("print-version");
        }else{
            $("html").removeClass("print-version");
        }

        if(process.platform == "win32"){
            $("html").addClass("os-windows");
        }

        var newFile = file.clone({contents: false});
        newFile.contents = Buffer.from($.html(), "utf-8");

        cb(null, newFile);
    }))
    .pipe(htmlPdf({
        base: pdfGenConfig.websiteRootDir,
        width: pdfGenConfig.width,
        height: pdfGenConfig.height
    }))
    .pipe(rename(fileName))
    .pipe(gulp.dest("./app/build"));
}

gulp.task("build", gulpSequence(
    "build.cleanup",
    "iconCssGen",
    "styles",
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

gulp.task("build.createPdf", ["build.copyHtml", "build.copyImages"], function(){
    stream = new MergeStream(createPdf(false), createPdf(true));

    return stream;
});

gulp.task("build.cleanup", function(){
    return del("./app/build/**");
});
