'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';

import cleanCSS from 'gulp-clean-css';
import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin';
import del from 'del';

import babel from 'gulp-babel';
import nodemon from 'gulp-nodemon';
import Cache from 'gulp-file-cache';

import webpack from 'gulp-webpack';
import webpackConfig from './webpack.config.js';

import browserSync from 'browser-sync';

let cache = new Cache();

const dir = {
    src: 'src',
    dest: 'dist'
};


const src = {
    js: dir.src + '/js/*.js',
    css: dir.src + '/css/*.css',
    html: dir.src + '/*.html',
    img: dir.src + '/img/*',
    server: 'server/**/*.js'
};

const dest = {
    js: dir.dest + '/js',
    css: dir.dest + '/css',
    html: dir.dest + '/',
    img: dir.dest + '/images',
    server: 'app'
};

gulp.task('clean', () => {
    return del.sync([dir.dest]);
});


gulp.task('webpack', () => {
    return gulp.src('src/js/main.js')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('css', () => {
    return gulp.src(src.css)
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(dest.css));
});

gulp.task('html', () => {
    return gulp.src(src.html)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(dest.html))
});

gulp.task('images', () => {
    return gulp.src(src.img)
        .pipe(imagemin())
        .pipe(gulp.dest(dest.img));
});


gulp.task('babel', () => {
    return gulp.src(src.server)
        .pipe(cache.filter())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(cache.cache())
        .pipe(gulp.dest(dest.server));
});

gulp.task('watch', () => {
    let watcher = {
        webpack: gulp.watch(src.js, ['webpack']),
        css: gulp.watch(src.css, ['css']),
        html: gulp.watch(src.html, ['html']),
        images: gulp.watch(src.img, ['images']),
        babel: gulp.watch(src.server, ['babel'])
    };

    let notify = (event) => {
        gutil.log('File', gutil.colors.yellow(event.path), 'was', gutil.colors.magenta(event.type));
    };

    for(let key in watcher) {
        watcher[key].on('change', notify);
    }
});

gulp.task('start', ['babel'], () => {
    return nodemon({
        script: dest.server + '/main.js',
        watch: dest.server
    });
});

gulp.task('browser-sync', () => {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: ["dist/**/*.*"],
        port: 7000
    })
});


gulp.task('default', ['clean', 'webpack', 'css', 'html',
    'images', 'watch', 'start', 'browser-sync'], () => {
    gutil.log('Gulp is running');
});