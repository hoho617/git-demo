/*
 * @Author: Administrator
 * @Date:   2016-11-16 19:57:24
 * @Last Modified by:   Administrator
 * @Last Modified time: 2016-11-17 10:47:12
 */

'use strict';
/**
 * 1. less文件的编译 压缩
 * 2. js合并 压缩 混淆
 * 3. 图片的复制
 * 4. html文件的压缩
 * 需要的包--gulp-less、gulp-concat、gulp-uglify、gulp-cssnano、gulp-htmlmin
 */

/*先载入gulp包,因为这个包提供一些API*/
var gulp = require('gulp');

// 1. less文件的编译 压缩
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
gulp.task('style', function() {
    // 这里是在执行style任务时自动执行的
    gulp.src(['src/styles/*.less', '!src/styles/_*.less']) // 找到所有的less文件但是不新生成_demo.css文件
        .pipe(less()) // 编译less文件
        .pipe(cssnano()) // 压缩less文件 // 放到目标位置
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
// 2. js合并 压缩 混淆
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
gulp.task('script', function() {
    gulp.src('src/scripts/*.js') // 找到所有的js文件
        .pipe(concat('all.js')) // 合并到一个all.js文件
        // .pipe(uglify()) js文件压缩
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
// 3. 图片的复制
gulp.task('image', function() {
    gulp.src('src/images/*.*') //找到所有的图片
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
//4. html文件的压缩
var htmlmin = require('gulp-htmlmin');
gulp.task('html', function() {
    gulp.src('src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true, // 将空白折叠起来
            removeComments: true // 去除注释
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
// 5.创建本地服务器
var browserSync = require('browser-sync');
gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: ['dist']
        },
    }, function(err, bs) {
        console.log(bs.options.getIn(["urls", "local"]));
    });
    // 6.监听文件
    gulp.watch('src/styles/*.less', ['style']);
    gulp.watch('src/scripts/*.js', ['script']);
    gulp.watch('src/images/*.*', ['image']);
    gulp.watch('src/*.html', ['html']);
});
