const https = require('https')
const fs = require('fs')

const options = {
    hostname: 'en.wikipedia.org',
    port: 443,
    path: '/wiki/Snarky_Puppy',
    method: 'GET',
}

const request = https.request(options, res => {
    let responseBody = ''
    res.setEncoding('utf-8')
    res.on('data', chunk => {
        console.log('---chunk', chunk.length)
        responseBody += chunk
    })
    res.on('end', () => fs.writeFile('snarky_puppy.html', responseBody, err => {
        if (err) {
            throw err
        }
        console.log('file downloaded')
    }))
})

request.end()