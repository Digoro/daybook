'usr strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import uglify from 'gulp-uglify';
import cleanCSS from 'gulp-clean-css';
import htmlmin from 'gulp-htmlmin';
import imagemin from 'gulp-imagemin'
import del from 'del'

const dir = {
    src: 'src',
    dest: 'dist'
};

const src = {
    js: dir.src + '/js/*.js',
    css: dir.src + '/css/*.css',
    html: dir.src + '/*.html',
    img: dir.src + '/img/*'
};

const dest = {
    js: dir.dest + '/js',
    css: dir.dest + '/css',
    html: dir.dest + '/',
    img: dir.dest + '/img'
};

gulp.task('js', () => {
    return gulp.src(src.js)
        .pipe(uglify())
        .pipe(gulp.dest(dest.js))
});

gulp.task('css', () => {
    return gulp.src(src.css)
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(dest.css))
});

gulp.task('html', () => {
    return gulp.src(src.html)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(dest.html))
});

gulp.task('img', () => {
    return gulp.src(src.img)
        .pipe(imagemin())
        .pipe(gulp.dest(dest.img))
});

gulp.task('clean', () => {
    return del.sync([dir.dest])
});

gulp.task('default', ['clean', 'js', 'css', 'html', 'img', 'watch'], () => {
    return gutil.log('Gulp is running');
});

gulp.task('watch', () => {
    let watcher = {
        js: gulp.watch(src.js, ['js']),
        css: gulp.watch(src.css, ['css']),
        html: gulp.watch(src.html, ['html']),
        img: gulp.watch(src.img, ['img'])
    };

    let notify = (event) => {
        gutil.log('File', gutil.colors.yellow(event.path), 'was', gutil.colors.magenta(event.type));
    };

    for(let key in watcher) {
        watcher[key].on('change', notify);
    }
});
