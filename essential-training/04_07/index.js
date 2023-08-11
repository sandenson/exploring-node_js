const fs = require('fs')
const path = require('path')

const stream = fs.createReadStream(
    path.join(__dirname, 'chat-logs', 'george-ben-chat-logs.log'),
    'utf-8'
)

let data = '';

stream.once('data', (chunk) => {
    console.log(`read stream started\n================\n${chunk}`)
})

stream.on('data', (chunk) => {
    console.log('chunk: ', chunk.length)
    data += chunk;
})

stream.on('end', () => {
    console.log(`finished ${data.length}`, data)
})

console.log('Reading the file')
