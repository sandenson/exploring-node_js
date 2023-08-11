const { read } = require('fs')
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdin
})

rl.question('How do you like Node?', answer => {
    console.log(`Your answer is: ${answer}`)
})