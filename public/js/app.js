var playerData = { username: "", score: 0 };

if(!localStorage.getItem('name')) {
    playerData.username = prompt("Welcome new player, please enter a new username: ", "User" + Math.floor(Math.random() * 10000));
    localStorage.setItem('name', playerData.username);
    localStorage.setItem('score', playerData.score);
} else {
    playerData.username = localStorage.getItem('name');
    playerData.score = localStorage.getItem('score');
}

buttonClicked = () => {
    playerData.score++;
    button1 = document.getElementById("btn-1");
    document.getElementById("btn-1").innerHTML = playerData.score;
    localStorage.setItem('score', playerData.score);
}

saveHighscore = () => {
    playerData.score = parseInt(score);
    localStorage.setItem('score', playerData.score);
    socket.emit('player save data', playerData);
}

changeNameButtonClicked = () => {
    let newUsername = prompt("Please enter a new username: ", "User" + Math.floor(Math.random() * 10000));
    if(newUsername != null) { 
        playerData.username = newUsername;
        localStorage.setItem('name', playerData.username);
    }
}
