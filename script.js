
const X_class = 'x'
const Circle_class = 'circle'
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winMessege = document.getElementById('winningMessege')
const winningtext = document.querySelector('[data-Winning-Message]')
const restartButton = document.getElementById('restartButton')
let xTurn
let draw


startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
    xTurn = true

    cellElements.forEach(cell => {
        cell.classList.remove(X_class)
        cell.classList.remove(Circle_class)
        cell.removeEventListener('click', handleClick, { once: true })
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHover()
    winMessege.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    const activeClass = xTurn ? X_class :
  Circle_class
  
    Write(cell, activeClass) 
    
    console.log(xTurn) 
    if (checkResult(activeClass)) {
        endGame(false)
    } else if(isdraw()) {
        endGame(true)    
    } else {
        chanceChange()
        setBoardHover()
    }
    
}

function endGame(draw) {
    if(draw == true) {
        winningtext.innerText = 'Draw!'
    }
    else {
        winningtext.innerText = `${xTurn ? "X" : "O"} Wins!`

             
          
    }

    winMessege.classList.add('show')
}   

function isdraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_class) ||
        cell.classList.contains(Circle_class)
    })
}

function Write(cell, activeClass) {
    cell.classList.add(activeClass)
    
}

function chanceChange() {
    xTurn = !xTurn
}

function setBoardHover() {
    board.classList.remove(X_class)
    board.classList.remove(Circle_class)
    if (xTurn) {
        board.classList.add(X_class)
    }    
    else {
        board.classList.add(Circle_class)
    }    
}

function checkResult(activeClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(activeClass)
        })
    })
}
