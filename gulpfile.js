const { src, dest, parallel, series, watch } = require("gulp");

// Concat files into one
const concat = require("gulp-concat");

// Add Sass
const sass = require("gulp-sass")(require("sass"));

// Add Typescript Support
const ts = require("gulp-typescript");

// Add Sourcemaps for showing what sass-file error comes from
const sourcemaps = require("gulp-sourcemaps");

// Minify code
const terser = require("gulp-terser"); // js

// backwards compatibilty for js
//const babel = require("gulp-babel");

// Minify images
const imagemin = require("gulp-imagemin"); // using 7.1 since 8.0 is not working

// Live server
const browserSync = require("browser-sync").create();

//Paths
const files = {
	htmlPath: "src/*.html",
	sassPath: "src/sass/*.scss",
	tsPath: "src/js/*.ts",
	imgPath: "src/img/*",
};

// HTML-task, copy html
function copyHTML() {
	return src(files.htmlPath)
		.pipe(dest("pub")) //
		.pipe(browserSync.stream()); // check for updates
}

// Sass-task
function sassTask() {
	return (
		src(files.sassPath)
			.pipe(sourcemaps.init())
			.pipe(sass().on("error", sass.logError))
			.pipe(sass({ outputStyle: "compressed" })) // remove comments and minify
			.pipe(dest("pub/css")) // destination
			.pipe(browserSync.stream())
	); // check for updates
}

// Typescript-task
function tsTask() {
	return (
		src(files.tsPath)
			.pipe(ts())
			.pipe(terser()) // remove comments and minify
			.pipe(dest("pub/js"))
	);
}

// Img-task
function imgTask() {
	return src(files.imgPath)
		.pipe(imagemin()) // Minify images
		.pipe(dest("pub/img")); // Move all images
}

// Watch-task (Updates files in pub automatically when a file is saved)
function watchTask() {
	browserSync.init({
		server: "./pub",
	});

	watch(
		[files.htmlPath, files.sassPath, files.tsPath /*, files.imgPath*/],
		parallel(copyHTML, sassTask, tsTask /*, imgTask*/)
	).on("change", browserSync.reload);
}

// Make funcs publicly available
exports.default = series(
	parallel(copyHTML, sassTask, tsTask, imgTask),
	watchTask
);
