var gulp = require("gulp"),
    imageSize = require("image-size"),
    through = require("through2"),
    toCss = require("to-css"),
    path = require("path"),
    fs = require("fs");

gulp.task("iconCssGen", function (done) {
    var cssUrlBase = "../images/icons";
    var destFile = "./app/assets/styles/modules/_icon.css"

    var iconCss = {
        ".icon": {
            "background-position" : "center top",
            "background-size" : "contain",
            "background-repeat" : "no-repeat"
        }
    };

    return gulp.src("./app/assets/images/icons/*", {
            read: false,
            nodir: true
        })
        .pipe(through.obj(function (file, enc, cb) {
            var dimensions = imageSize(file.path);
            var p = path.parse(file.path);

            var name = p.name;
            var url = cssUrlBase + "/" + p.base;
            var c = 0.041666667;
            var widthRem = c * dimensions.width;
            var heightRem = c * dimensions.height;
            var icon = {
                "background-image": 'url("' + url + '")',
                "width": widthRem + 'rem',
                "height": heightRem + 'rem'
            }

            iconCss[".icon--" + name] = icon;

            cb();
        }, function (cb) {
            var comment = `/* This file was generated automatically by gulp. Do not edit here. */\r\n\r\n`;
            var css = comment + toCss(iconCss, {indent: '  '});
            fs.writeFileSync(destFile, css, "utf-8");

            cb();
        }));
});