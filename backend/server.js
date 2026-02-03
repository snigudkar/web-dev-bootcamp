const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const { MongoMemoryServer } = require("mongodb-memory-server");


const app = express();


const corsOptions = {
  origin: ["http://localhost:5173", "https://psychic-space-fortnight-v6p7j5rgqx7gcx9vg-5173.app.github.dev"],
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
  await seedAdmin();
}
startDB();


// --- MODELS ---
const User = mongoose.model("User", {
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "member" },
  isActive: { type: Boolean, default: false }
});


const Task = mongoose.model("Task", {
  title: String,
  description: String,
  status: { type: String, enum: ["todo", "inprogress", "completed"], default: "todo" },
  priority: { type: String, default: "normal" },
  // Store an array of ObjectIds for multi-member assignment
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now }
});


async function seedAdmin() {
  const hashed = await bcrypt.hash("admin@123", 10);
  await User.create({ name: "Admin", email: "admin@test.com", password: hashed, role: "admin", isActive: true });
}


// --- AUTH ROUTES ---
app.post("/api/signup", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email: email.toLowerCase().trim(), password: hashedPassword, isActive: false });
    res.json(user);
  } catch (err) { res.status(500).json({ message: "Signup failed" }); }
});


app.post("/api/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email.toLowerCase().trim() });
  if (user && await bcrypt.compare(req.body.password, user.password)) {
    res.json(user);
  } else { res.status(401).json({ message: "Invalid credentials" }); }
});


// --- USER MANAGEMENT ---
app.get("/api/user/get-team", async (req, res) => {
  const users = await User.find({ isActive: true });
  res.json(users);
});
 //users structure
//[
  //{ "name": "Admin", "email": "admin@test.com", "isActive": true },
  //{ "name": "Alice", "email": "alice@test.com", "isActive": true }
//]


app.get("/api/user/available", async (req, res) => {
  const users = await User.find({ role: "member", isActive: false });
  res.json(users);
});


//Paste snippet here








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
  }});


  const PORT = process.env.PORT || 5000;
//Start the server and listen to requests coming to PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
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
