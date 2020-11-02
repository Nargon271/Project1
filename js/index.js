window.onload = () => {
    document.getElementById('start-button').onclick = () => {
        startGame();
    }
    document.getElementById('GOdiv').onclick = () => {
        tryAgain();
    //document.getElementById('sonidoFondo').play()
    }
}

function startGame () {
    const divDisplay = document.querySelector('#gameStart')
    divDisplay.style.display = 'none'
    const scoreDisplay = document.querySelector('.score')
    scoreDisplay.style.display = 'block'
    game.init('canvas')
}


function tryAgain () {
    const GOdivDisplay = document.querySelector('#GOdiv')
    GOdivDisplay.style.display = 'none'
    game.reset('canvas')
    
}