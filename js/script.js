import Ball from "./Ball.js"
import Paddle from "./Paddle.js"

const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScoreElem = document.getElementById("player-score")
const computerScoreElem = document.getElementById("computer-score")
const backgroundMusic = new Audio("./sounds/background-music.mp3")
const loseSound = new Audio("./sounds/lose.mp3")
const startBtn = document.getElementById("start-btn")

let lastTime
function update(time) {
    if (lastTime != null) {
        const delta = time - lastTime
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
        computerPaddle.update(delta, ball.y)
        const hue = parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue("--hue")
        )

        document.documentElement.style.setProperty("--hue", hue + delta * 0.01)

        if (isLose()) {
            handleLose()
            loseSound.play()
        }
    }

    lastTime = time
    window.requestAnimationFrame(update)
}


function isLose() {
    const rect = ball.rect()
    return rect.right >= window.innerWidth || rect.left <= 0
}

function handleLose() {
    const rect = ball.rect()
    if (rect.right >= window.innerWidth) {
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
    } else {
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1
    }
    ball.reset()
    computerPaddle.reset()
}

startBtn.addEventListener("click", () => {
    backgroundMusic.play()
    backgroundMusic.volume = .2
    startBtn.style.display = "none"
    computerScoreElem.textContent = "0"
    playerScoreElem.textContent = "0"
    document.querySelector(".score").style.display = "flex"
    document.querySelector(".wlcm-txt").style.display = "none"
    document.querySelector(".press-start").style.display = "none"
    document.addEventListener("mousemove", e => {
        playerPaddle.position = (e.y / window.innerHeight) * 100
    })
})


window.requestAnimationFrame(update)
