window.onload = () => {
    document.getElementById('start-button').onclick = () => {
        startGame();
    }
}

function startGame() {
    const divDisplay = document.querySelector('#gameStart')
    divDisplay.style.display = 'none'
    game.init('canvas')

}