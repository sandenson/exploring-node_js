const http = require('http')
const fs = require('fs')
const path = require('path')

const sendFile = (res, status, type, file) => {
    res.writeHead(status, { 'Content-Type': type })
    fs.createReadStream(file).pipe(res)
}

http.createServer((req, res) => {
    switch(req.url) {
        case '/':
            return sendFile(res, 200, 'text/html', path.join(__dirname, 'home-page.html'))
        case '/img/lace_strol.jpg':
            return sendFile(res, 200, 'image/jpg', path.join(__dirname, 'lace_strol.jpg'))
        case '/styles.css':
            return sendFile(res, 200, 'text/css', path.join(__dirname, 'styles.css'))
        default:
            return sendFile(res, 404, 'text/html', path.join(__dirname, '404.html'))
    }
}).listen(3000).once('listening', () => {
    console.log('web server at 3000')
})
