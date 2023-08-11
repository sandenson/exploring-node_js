const waitTime = 3000

console.log(`setting a ${waitTime/1000} second daily`)

const timerFinished = () => {
    console.log('done')
    clearInterval(interval)
}

setTimeout(timerFinished, waitTime)

const waitInterval = 500;
let currentTime = 0;

const incTime = () => {
    currentTime += waitInterval
    const p = Math.floor((currentTime / waitTime) * 100)
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    process.stdout.write(`waiting... ${p}%`)
}

const interval = setInterval(incTime, waitInterval)
