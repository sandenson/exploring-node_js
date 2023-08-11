const fs = require('fs');
const path = require('path');

let answerStream;

process.stdout.write('Hello')

const questions = [
    "What is your name?",
    "What would you rather be doing?",
    "What is your preferred programming language?",
    "Can we get much higher?"
]

const answers = []

function ask(i = 0) {
    process.stdout.write(`\n\n\n ${questions[i]}`)
    process.stdout.write(' > ')
}

process.stdin.once('data', (data) => {
    const name = data.toString().trim()
    const fileName = path.join(__dirname, `${name}.md`)

    if (fs.existsSync(fileName)) {
        fs.unlinkSync(fileName)
    }

    answerStream = fs.createWriteStream(fileName)
    answerStream.write(`Question Answers for ${name}\n=============================\n`)
})

process.stdin.on('data', (data) => {
    const answer = data.toString().trim()
    
    answerStream.write(`Question: ${questions[answers.length]}\n`)
    
    answerStream.write(`Answer: ${answer}\n`, () => {
        if (answers.length < questions.length) {
            ask(answers.length)
        } else {
            console.log(4)
            process.exit()
        }
    })

    answers.push(answer)
})

process.on('exit', () => {
    answerStream.close()
    process.stdout.write('\n\n\n')
    process.stdout.write(`Go ${answers[1]}, ${answers[0]}. You can finish writing ${answers[2]} later.`)
})

ask(answers.length)
