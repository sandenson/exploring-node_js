const fs = require('fs')
const path = require('path')

const dirPath = path.join(__dirname, "your-files-not-here-(lie)")

if (fs.existsSync(dirPath)) {
    console.log('already there!')
} else {
    fs.mkdirSync(dirPath)
    fs.writeFile(path.join(dirPath, 'test.md'), '### Go fuck yourself', function (err) {
        if (err) {
            console.log(`ERROR: ${err}`)
        } else {
            console.log('directory created')
        }

    })
}
