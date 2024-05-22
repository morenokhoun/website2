const screen = document.querySelectorAll('.screen')
const game_container = document.getElementById('game-container')
const start_btn = document.getElementById('start-btn')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const message = document.getElementById('message')
const finalMessage = document.getElementById('final-message')
const endMessage = document.getElementById('end-message')
const popup = document.getElementById('popup-container')
const choose_insect_btns = document.querySelectorAll('.choose-insect-btn')
let seconds = 0
let score = 0
let selected_insect = {}
let gameInterval
let gameEnded = false


start_btn.addEventListener('click', () => {
    screen[0].classList.add('up')})




choose_insect_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img')
        const alt = img.getAttribute('alt')
        const src = img.getAttribute('src')
        screen[1].classList.add('up')
        selected_insect = {src, alt}
        setTimeout(createInsect, 1000)


        startGame()
    })
})




function startGame() {
    gameInterval = setInterval(increaseTime, 1000)
    setTimeout(endGame, 31000)
}

function endGame() {
    clearInterval(gameInterval)
    popup.style.display = 'flex'
    gameEnded = true

   if (seconds <= 30){
        if (score >= 60){
                finalMessage.innerText = 'Congratulations! You won!'
                finalMessage.classList.add('visible')
                endMessage.classList.remove('visible')

            }

        else {
            endMessage.innerText = 'That sucks! You lost!'
            endMessage.classList.add('visible')
                finalMessage.classList.remove('visible')
        }

    }

}



function increaseTime() {
    let m = Math.floor(seconds / 60)
    let s = seconds % 60
    if (m < 10) {
        m = `0${m}`}
    if (s < 10) {
        s = `0${s}`
    }
    timeEl.innerHTML = `Time: ${m}:${s}`
    seconds++

}


function createInsect() {
    if (score >= 60 && seconds >= 30) return
    const insect = document.createElement('div')
    insect.classList.add('insect')
    const { x , y } = getRandomLocation()
    insect.style.top = `${y}px`
    insect.style.left = `${x}px`
    insect.innerHTML = `<img src="${selected_insect.src}"
    alt="${selected_insect.alt}" style = "transform: rotate
    (${Math.random() * 360}deg" />`
    insect.addEventListener('click', catchInsect)

    game_container.appendChild(insect)
}



function catchInsect() {
    if (gameEnded) return
    increaseScore()
    this.classList.add('caught')
    setTimeout(() => this.remove(), 2000)
    addInsects()

}

function addInsects() {
    setTimeout(createInsect, 1000)
    setTimeout(createInsect, 1500)
}


function increaseScore() {
    if (gameEnded) return
    score++
    if (score === 20) {
        message.classList.add('visible')
        setTimeout(removeMessage, 5000)
    }
    scoreEl.innerHTML = `Score: ${score}`
}



function getRandomLocation() {
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 200) + 100
    const y = Math.random() * (height - 200) + 100
    return { x , y }
}

function removeMessage() {
    message.classList.remove('visible')

}

