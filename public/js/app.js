console.log('Client side javascript file is loaded')

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient

//const connectionURL = 'mongodb+srv://daltonwinc:<password>@cluster0.kaakpiu.mongodb.net/?retryWrites=true&w=majority'
//const databaseName = 'game-save-data'

//MongoClient.connect()

var playerData = { username: "", score: 0 };

if(!localStorage.getItem('name')) {
    playerData.username = prompt("Welcome new player, please enter a new username: ", "Harry Potter");
    localStorage.setItem('name', playerData.username)
    localStorage.setItem('score', playerData.score)
} else {
    console.log("beggining of else")
    playerData.username = localStorage.getItem('name')
    playerData.score = localStorage.getItem('score')
    window.onload = function() {
        document.getElementById('btn-1').innerHTML = playerData.score
    }
    console.log('playerscore'+playerData.score)
}



function buttonClicked() {
    playerData.score++;
    button1 = document.getElementById("btn-1");
    document.getElementById("btn-1").innerHTML = playerData.score;
}

function saveButtonClicked() {
    localStorage.setItem('score', playerData.score)
    socket.emit('player save data', playerData);
    console.log(playerData.score)
}

function changeNameButtonClicked() {
    playerData.username = prompt("Please enter a new username: ", "Harry Potter");
    localStorage.setItem('name', playerData.username)
}