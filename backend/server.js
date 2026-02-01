const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "https://probable-disco-69g6vvpxqp7j2r7vq-5173.app.github.dev"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "userid"], //what extra info client is allowed to send with the request
  credentials: true 
};

app.use(cors(corsOptions));

app.use(express.json());

// --- DATABASE SETUP ---
async function startDB() {
  const mongo = await MongoMemoryServer.create({
  instance: {
    launchTimeout: 60000, // 60 seconds
  },
});
  await mongoose.connect(mongo.getUri());
  console.log("In-Memory MongoDB Connected");
  //await seedAdmin();
}
startDB();

//Paste snippet here


//

const PORT = process.env.PORT || 5000;

//Start the server and listen to requests coming to PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
