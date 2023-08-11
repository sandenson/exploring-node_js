const fs = require('fs')
const path = require('path')

const ipsum = fs.readFileSync(path.join(__dirname, 'readme.md'), 'utf-8')

console.log(ipsum)
