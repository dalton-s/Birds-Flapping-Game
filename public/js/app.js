console.log('Client side javascript file is loaded')

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient

//const connectionURL = 'mongodb+srv://daltonwinc:<password>@cluster0.kaakpiu.mongodb.net/?retryWrites=true&w=majority'
//const databaseName = 'game-save-data'

//MongoClient.connect()

playerScore = 0

function buttonClicked() {
    playerScore++;
    button1 = document.getElementById("btn-1");
    document.getElementById("btn-1").innerHTML = playerScore;

}