const { EventEmitter } = require('events')

const emitter = new EventEmitter()

emitter.on('customEvent', (message, user) => {
    console.log(`${user}: ${message}`)
})

emitter.emit('customEvent', 'hello world', 'my computer')
emitter.emit('customEvent', "something something i'll become the king of the pirates", 'monkey d. luffy')

process.stdin.on('data', data => {
    const input = data.toString().trim()
    if (input === 'exit') {
        emitter.emit('customEvent', 'goodbye', 'process')
        process.exit()
    }
    emitter.emit('customEvent', input, 'terminal')
})