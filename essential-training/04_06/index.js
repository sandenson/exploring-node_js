const fs = require('fs')
const path = require('path')

const dirPath = (pathString) => path.join(__dirname, pathString)
const accountsPath = (pathString) => path.join(dirPath('accounts'), pathString)
const libraryPath = (pathString) => path.join(dirPath('library'), pathString)
const assetsLogs = dirPath('assets/logs')
const accountsLogs = accountsPath('logs')

fs.existsSync(assetsLogs)
    ? fs.renameSync(assetsLogs, accountsLogs)
    : fs.renameSync(accountsLogs, assetsLogs)

console.log('logs folder moved')

// const moveAndRemove = (originFn, destinationFn) => {
//     fs.existsSync(destinationFn('')) || fs.mkdirSync(destinationFn(''))

//     fs.readdirSync(originFn('')).forEach((file) => {
//         fs.renameSync(originFn(file), destinationFn(file))
//     })
//     fs.rmdirSync(originFn(''))
// }

// fs.existsSync(accountsPath(''))
//     ? moveAndRemove(accountsPath, libraryPath)
//     : moveAndRemove(libraryPath, accountsPath)
