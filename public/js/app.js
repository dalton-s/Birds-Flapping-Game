var playerData = { username: "", score: 0 };

if(!localStorage.getItem('name')) {
    playerData.username = prompt("Welcome new player, please enter a new username: ", "User" + Math.floor(Math.random() * 10000));
    localStorage.setItem('name', playerData.username)
    localStorage.setItem('score', playerData.score)
} else {
    playerData.username = localStorage.getItem('name')
    playerData.score = localStorage.getItem('score')
    window.onload = () => {
        document.getElementById('btn-1').innerHTML = playerData.score
    }
}

buttonClicked = () => {
    playerData.score++;
    button1 = document.getElementById("btn-1");
    document.getElementById("btn-1").innerHTML = playerData.score;
    localStorage.setItem('score', playerData.score)
}

saveHighscore = () => {
    playerData.score = parseInt(score);
    localStorage.setItem('score', playerData.score)
    socket.emit('player save data', playerData);
    //setTimeout(() => location.reload(), 300);
}

changeNameButtonClicked = () => {
    playerData.username = prompt("Please enter a new username: ", "User" + Math.floor(Math.random() * 10000));
    localStorage.setItem('name', playerData.username)
}
