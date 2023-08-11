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
    console.log(`waiting ${currentTime / 1000} seconds`)
}

const interval = setInterval(incTime, waitInterval)
