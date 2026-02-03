const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "https://probable-disco-69g6vvpxqp7j2r7vq-5173.app.github.dev"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "userid"],
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
<<<<<<< HEAD
  await seedAdmin();
=======
  //await seedAdmin();
>>>>>>> parent of 14a0aaa (made some changes)
}
startDB();

//Paste snippet here


//

<<<<<<< HEAD

// --- TASK ROUTES ---
app.get("/api/tasks", async (req, res) => {
  try {
    const { userId } = req.query;
    let query = {};
    //for admin userId is null so query remains null
    //this means that all tasks need to be fetched

    //for a particular user userId has some valud
    //so if(userId) is true and that block is executed
    
    // Use $in to check if the specific userId exists within the assignedTo array
    if (userId) {
      query = { assignedTo: { $in: [new mongoose.Types.ObjectId(userId)] } };
    }
    
    const tasks = await Task.find(query).populate("assignedTo", "name email");
    res.json(tasks);
    //assignedTo: ["65a1...", "65b2..."] (Just IDs)
    /*{
  "title": "Fix Server",
  "assignedTo": [
    { "name": "Jim", "email": "jim@test.com" },
    { "name": "Admin", "email": "admin@test.com" }
  ]
}*/
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks" });
<<<<<<< HEAD
  }});

  const PORT = process.env.PORT || 5000;
//Start the server and listen to requests coming to PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
=======
  }
>>>>>>> parent of 5d231dc (Merge branch 'main' of https://github.com/snigudkar/web-dev-bootcamp)
});

app.post("/api/tasks", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.json(task);
  } catch (err) { res.status(500).json({ message: "Error creating task" }); }
});



/*const Task = mongoose.model("Task", {
  title: String, 
  description: String,
  status: { type: String, enum: ["todo", "inprogress", "completed"], default: "todo" },
  priority: { type: String, default: "normal" },
  // Store an array of ObjectIds for multi-member assignment
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now }
});
*/
app.listen(5000, () => console.log("Server running on 5000"));
=======
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
>>>>>>> parent of 14a0aaa (made some changes)
