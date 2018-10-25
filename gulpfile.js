require("./gulp/tasks/styles");
require("./gulp/tasks/generate-icon-css");
require("./gulp/tasks/generate-fonts");
require("./gulp/tasks/copy");
require("./gulp/tasks/generate-pdf");
require("./gulp/tasks/build");
require("./gulp/tasks/watch");

var gulp = require("gulp");

gulp.task("default", ["build"]);