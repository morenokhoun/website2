const wordEl = document.getElementById('word')
const wrongLettersEl = document.getElementById
('wrong-letters')
const playAgainBtn = document.getElementById('play-button')
const popup = document.getElementById('popup-container')
const notification = document.getElementById('notification-container')
const finalMessage = document.getElementById('final-message')
const figureParts = document.querySelectorAll('.figure-part')
const attempts = document.getElementById('attempts')

console.log("CONNECTED")

const word = ['application', 'programming', 'interface',
'wizard']

let selectedIndex = Math.floor(word.length * Math.random())
let selectedWord = word[selectedIndex]
let correctLetters = []
let wrongLetters = []
let attempts = []



//Show hidden word
function displayWord() {
    wordEl.innerHTML = `
    ${selectedWord
        .split('')
        .map(letter => `
        <span class ="letter">
        ${correctLetters.
            includes(letter) ?
            letter : ''}
        </span>
        `).join('')
    }
    `
    const innerWord = wordEl.innerText.replace(/\n/g, '')

    if (innerWord == selectedWord) {
        finalMessage.innerText = 'Congratulations! You won!'
        popup.style.display = 'flex'
    }
}


// Update the wrong letters
function updateWrongLettersEl(){
    // Display wrong letters
   wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter =>`<span>${letter}</span>`)}
   `

   // Display parts
   figureParts.forEach((part, index) => {
    const errors = wrongLetters.length

    if (index < errors){
        part.style.display= 'block'
    } else {
        part.style.display = 'none'
    }
   })

   //Check if lost
   if (attempts === 0) {
    finalMessage.innerText = 'Unfortunately you lost!'
    popup.style.display = 'flex'
   }
}

//Show Notification
function showNotification(){
    notification.classList.add('show')

    setTimeout(() => {
        notification.classList.remove('show')
    }, 2000)
}
// Keydown letter press
window.addEventListener('keydown', e => {

    if (e.keyCode >= 65 && e.keyCode <=90) {
      const letter = e.key

      console.log("KEYDOWN")
      if (selectedWord.includes(letter)) {
        if(!correctLetters.includes(letter)){
            correctLetters.push(letter)

            displayWord( )
        } else {
            showNotification()
        }
      } else {
        if (!wrongLetters.includes(letter)) {
            wrongLetters.push(letter)

            updateWrongLettersEl()
            if (attempts === 0) {
                finalMessage.innerText = 'Unfortunately you lost!'
                popup.style.display = 'flex'
            }
        } else {
            showNotification()
        }
      }
    }
})

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
    correctLetters.length = 0
    wrongLetters.length = 0
    attempts = 15
    selectedIndex = Math.floor(word.length * Math.random())
    selectedWord = word[selectedIndex]
    displayWord()
    updateWrongLettersEl()
    popup.style.display = 'none'

})
displayWord()
selectWord()

function selectWord() {
    selectedIndex = Math.floor(word.length * Math.random())
}
