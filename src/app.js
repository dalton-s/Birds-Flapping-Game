const path = require('path')
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public'));
});

const publicDirectoryPath = path.join(__dirname, '../public')

const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://daltonwinc:puftatlHcQzyooXy@cluster0.kaakpiu.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

var highscores = [];

async function run() {
    try {
      // Connect the client to the server (optional starting in v4.7)
      await client.connect();
      const db = client.db("Game");
      const coll = db.collection("high-scores");

      let data = await coll.find({}).sort({ score: -1 }).limit(5).toArray();
      highscores.push(data)
      console.log(highscores)

      // Establish and verify connection
      await client.db("admin").command({ ping: 1 });
      console.log("Connected successfully to database");
    
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  
run().catch(console.dir);

async function updateDatabase(newData) {
    console.log('Updating DB with ' + newData)
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        const db = client.db("Game");
        const coll = db.collection("high-scores");

        await coll.insertOne({
                username: newData.username,
                score: parseInt(newData.score)
            }
        );

        highscores = []
        let data = await coll.find({}).sort({ score: -1 }).limit(5).toArray();
        highscores.push(data)
  
        // Establish and verify connection
        await client.db("admin").command({ ping: 1 });
        console.log("Connected successfully to database");
      
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
}

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('a user connected');
    io.emit('updated highscores', highscores);
});
  
io.on('connection', (socket) => {
    const db = client.db("Game");
    const coll = db.collection("high-scores");
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('player save data', (newPlayerSaveData) => {
        console.log('Received new sava data (Username: ' + newPlayerSaveData.username + ', Score: ' + newPlayerSaveData.score + ')');
        updateDatabase(newPlayerSaveData)
      });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});

