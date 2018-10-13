const gulp = require("gulp");
const rollup = require("gulp-better-rollup");
const ts = require("gulp-typescript");
const babili = require("gulp-babili");
const rename = require("gulp-rename");

// Uses Rollup to resolve dependencies and TypeScript to transpile the result
gulp.task("default", () =>
  gulp
    .src("src/js/index.js")
    .pipe(
      rollup({
        moduleName: "quickmaths",
        format: "umd"
      })
    )
    .pipe(
      ts({
        allowJs: true,
        // Change this to whatever you want
        target: "es5"
      })
    )
    // Formatted code
    .pipe(rename("index.js"))
    .pipe(gulp.dest("dist/"))
    // Minified
    .pipe(babili())
    .pipe(rename("index.min.js"))
    .pipe(gulp.dest("dist/"))
);

// For development: run `gulp watch` to build on file save
gulp.task("watch", () => gulp.watch("src/js/**/*.js", ["default"]));
