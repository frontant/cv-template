var gulp = require("gulp"),
htmlPdf = require("gulp-html-pdf"),
path = require("path"),
rename = require("gulp-rename"),
MergeStream = require("merge-stream"),
through = require("through2"),
cheerio = require("cheerio");

var pdfGenConfig = {
    format : "A4",
    orientation : "portrait",
    websiteRootDir : "file:///" + path.resolve(__dirname, "../.././app/build") + "/"
}

function pdfGen(isPrintVersion){
    var fileName = isPrintVersion ? "resume-light.pdf" : "resume-dark.pdf";

    return gulp.src("./app/build/*.html")
    .pipe(through.obj(function(file, enc, cb){
        var $ = cheerio.load(file.contents.toString());

        // set html background color to white to avoid artifacts
        $("html").css("background-color", "#fff");

        // choose dark or light template version
        if(isPrintVersion){
            $("html").addClass("print-version");
        }else{
            $("html").removeClass("print-version");
        }

        // add platform dependant styles
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

gulp.task("generatePdf", ["copy.html", "copy.images"], function(){
    stream = new MergeStream(pdfGen(false), pdfGen(true));

    return stream;
});
