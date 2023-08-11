const fs = require("fs")
const path = require("path")

const md = `
    This is a New File
    ==================

    ES6 Template Strings are cool and swag. They honor whitespace.

    * Template Strings
    * Node File System
    * Readline CLIs
`

const filePath = path.join(__dirname, 'javascript.md')

fs.writeFile(filePath, md.trim(), (err) => {
    if (err) {
        throw err
    }
    fs.appendFileSync(filePath, '\n\n\n### Node.js, everyone!')
    console.log('Markdown Created')
})