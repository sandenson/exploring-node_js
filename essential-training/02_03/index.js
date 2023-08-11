function grab(flag)  {
    const indexAfterFlag = process.argv.indexOf(flag) + 1
    return process.argv[indexAfterFlag]
}

const greeting = grab('--greeting')
const user = grab('--user')

console.log(greeting, user)