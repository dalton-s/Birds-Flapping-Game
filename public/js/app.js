console.log('Client side javascript file is loaded')

playerScore = 0

function buttonClicked() {
    playerScore++;
    button1 = document.getElementById("btn-1");
    document.getElementById("btn-1").innerHTML = playerScore;

}