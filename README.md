🗂️ MERN Task Manager
<pre>
A minimal MERN stack group task management application built for learning and practice, featuring a clean structure and real-world patterns.
</pre>

<img width="3999" height="2615" alt="image" src="https://github.com/user-attachments/assets/d2b7189e-55a2-45ee-a995-1ae80375b00f" />

🚀 Features
<pre>
User Auth: User registration & login.
Zero Setup DB: In-memory MongoDB (no local installation or Cloud URI required).
Collaboration: Group-based task management.
CRUD Operations: Create, view, update, and delete tasks.
Modern UI: Clean React interface styled with TailwindCSS.
Robust Backend: Node.js & Express API.
</pre>

🛠️ Tech Stack
<pre>
Frontend: React, React Router, Axios, TailwindCSS
Backend: Node.js, ExpressDatabaseMongoDB (mongodb-memory-server)
Tools: Mongoose, bcryptjs, CORS
</pre>

📁 Project Structure
<pre>
mern-task-manager/
├── backend/
│   ├── server.js      # API entry point & DB config
│   └── package.json
├── client/
│   ├── src/           # React components & logic
│   ├── public/
│   └── package.json
└── README.md
</pre>

▶️ How to Run
1. Backend
<pre>
cd backend
npm install
node server.js
</pre>

2. Frontend
<pre>
cd client
npm install
npm run dev  //Runs on port 5173
</pre>

🧪 Important Notes
<pre>
Database Persistence: 
1. This project uses an in-memory database.
2. This means all data resets whenever the backend server restarts.
3. This is intentional to make the project perfect for demos, labs, and learning fundamentals without setup friction.
</pre>

📌 Future Improvements
<pre>
JWT-based authentication for secure sessions.
Role-based access control (Admin vs. Member).
Drag & drop task board using dnd-kit or react-beautiful-dnd.
Persistent MongoDB connection using MongoDB Atlas.
Deployment guides for Render and Vercel.
</pre>
