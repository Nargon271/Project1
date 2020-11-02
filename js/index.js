window.onload = () => {
    document.getElementById('start-button').onclick = () => {
        startGame();
    //document.getElementById('sonidoFondo').play()
    }
}

function startGame() {
    const divDisplay = document.querySelector('#gameStart')
    divDisplay.style.display = 'none'
    game.init('canvas')

}