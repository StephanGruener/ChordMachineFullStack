const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')

const TabRoute = require('./routes/tab')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(cors())

// app.use(cors({
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));




const uri =
  "mongodb+srv://username:password@chordmachine.rpzr7qe.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

connect();

app.listen(8000, () => {
  console.log("Server started on port 8000");
});

app.use('/api/tab', TabRoute)