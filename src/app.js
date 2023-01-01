const path = require('path')
const express = require('express')
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')

const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://daltonwinc:puftatlHcQzyooXy@cluster0.kaakpiu.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function run() {
    try {
      // Connect the client to the server (optional starting in v4.7)
      await client.connect();
      // Establish and verify connection
      await client.db("admin").command({ ping: 1 });
      console.log("Connected successfully to server");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);

app.use(express.static(publicDirectoryPath))

app.get('/weather', (req, res) => {
    res.send([{forecast: 'Sunny', location: 'DC'}])
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})