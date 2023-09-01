const http = require('http')

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <h1>Serving HTML Text</h1>
            <p>${req.method} request made for ${req.url}</p>
        </body>
        </html>
    `)
}).listen(3000).once('listening', () => {
    console.log('web server is listening on port 3000')
})
