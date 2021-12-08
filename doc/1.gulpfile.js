const fs = require('fs')
const through = require('through2')
const { series, parallel } = require('gulp')

function callbackTask(cb) {
  setTimeout(() => {
    console.log('callbackTask')
    cb() //cb传入参数 表示执行失败
  }, 1000)
}

function promiseTask(cb) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('promiseTask')
      resolve() //调用reject表示失败
    }, 1000)
  })
}

async function asyncTask(cb) {
  await new Promise((resolve) => {
    setTimeout(() => {
      console.log('asyncTask')
      resolve()
    }, 1000)
  })
}

function steamTask() {
  return fs
    .createReadStream('1.txt', { autoClose: true })
    .on('end', () => {
      console.log('steamTask end')
    })
    .pipe(
      through((chunk, enc, next) => {
        setTimeout(() => {
          next(null, chunk.toString() + '12')
        }, 1000)
      })
    )
    .pipe(fs.createWriteStream('2.txt', { autoClose: true }))
}

exports.callback = callbackTask
exports.promise = promiseTask
exports.async = asyncTask
exports.steam = steamTask
