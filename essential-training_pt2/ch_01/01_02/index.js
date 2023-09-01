const https = require('https')
const fs = require('fs')

const url = 'https://en.wikipedia.org/wiki/Snarky_Puppy'

const request = https.get(url, res => {
    let download = fs.createWriteStream('snarky_puppy.html')
    console.log('response started')
    res.pipe(download)
    res.on('end', () => {
        console.log('response finished')
    })
})

request.end()
