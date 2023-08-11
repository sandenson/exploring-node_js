const fs = require('fs')
const path = require('path')

const dirPath = (pathString) => path.join(__dirname, pathString)
const libPath = (pathString) => path.join(dirPath('lib'), pathString)
const configPath = libPath('config.js')
const projectConfigPath = libPath('project-config.js')

fs.existsSync(configPath)
    ? fs.renameSync(configPath, projectConfigPath)
    : fs.renameSync(projectConfigPath, configPath)

console.log('config file renamed')

const libNotesPath = libPath('notes.md')
const notesPath = dirPath('notes.md')

fs.rename(libNotesPath, notesPath, (err) => {
    if (err) {
        fs.renameSync(notesPath, libNotesPath)
        console.log('notes file moved')
    } else {
        console.log('notes file moved')
    }
})

// fs.unlinkSync(configPath)

// fs.unlink(notesPath, (err) => {
//     if (err) {
//         throw err
//     }
//     console.log('🦀🦀notes are gone🦀🦀')
// })
