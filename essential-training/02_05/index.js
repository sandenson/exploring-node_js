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

ask()

process.stdin.on('data', (data) => {
    answers.push(data.toString().trim())

    if (answers.length < questions.length) {
        ask(answers.length)
    } else {
        process.exit()
    }
})

process.on('exit', () => {
    process.stdout.write('\n\n\n')
    process.stdout.write(`Go ${answers[1]}, ${answers[0]}. You can finish writing ${answers[2]} later.`)
})
