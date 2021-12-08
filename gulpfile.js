const { src, dest, parallel } = require('gulp')
const gulpSass = require('gulp-sass')
const sass = require('sass')
const gulpClean = require('gulp-clean')
const babel = require('gulp-babel')
const ejs = require('gulp-ejs')

const browserSync = require('browser-sync')
const browser = browserSync.create() //开发服务器
const useref = require('gulp-useref') //根据注释 合并文件
const htmlmin = require('gulp-htmlmin') //压缩html
const uglify = require('gulp-uglify') //压缩js
const cleanCss = require('gulp-clean-css') //压缩css
const gulpIf = require('gulp-if')

const styles = () => {
  return src('src/style/**/*.scss', { base: 'src' })
    .pipe(gulpSass(sass).sync())
    .pipe(dest('dist'))
}

const clean = () => {
  return src('dist/**', { read: false }).pipe(gulpClean())
}

const scripts = () => {
  return src('src/**/*.js', { base: 'src' })
    .pipe(
      babel({
        presets: ['@babel/preset-env']
      })
    )
    .pipe(dest('dist'))
}

const html = () => {
  return src('src/**/*.html', { base: 'src' })
    .pipe(ejs({ title: '标题1' }))
    .pipe(dest('dist'))
}

const images = async () => {
  const imagemin = await import('gulp-imagemin')
  return src('src/assets/**/*.@(png|jpe?g)', { base: 'src' })
    .pipe(imagemin.default())
    .pipe(dest('dist'))
}
const static = () => {
  return src('src/static/**', { base: 'src' }).pipe(dest('dist'))
}

exports.styles = styles
exports.clean = clean
exports.scripts = scripts
exports.html = html
exports.images = images
exports.static = static

exports.compile = parallel(styles, scripts, html)
