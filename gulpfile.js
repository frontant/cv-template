require("./gulp/tasks/styles");
require("./gulp/tasks/build");
require("./gulp/tasks/watch");
require("./gulp/tasks/icon-css");

var gulp = require("gulp");

gulp.task("default", ["build"]);