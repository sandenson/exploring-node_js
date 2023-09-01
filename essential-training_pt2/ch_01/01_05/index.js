const http = require('http')
const data = require('./cats')

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/json' })
    if (req.url.toLowerCase() === '/biscuit') {
        res.end(JSON.stringify(data.find(({ name }) => name === 'Biscuit')))
    } else if (req.url.toLowerCase() === '/jungle') {
        res.end(JSON.stringify(data.find(({ name }) => name === 'Jungle')))
    } else {
        res.end(JSON.stringify(data))
    }
}).listen(3000).once('listening', () => {
    console.log('web server running on port 3000')
})
