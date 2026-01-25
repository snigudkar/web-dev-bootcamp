import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Topbar from "./components/Topbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import CreateTask from "./pages/CreateTask";
import Team from "./pages/Team";

function Layout({ children, user, logout }) {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  if (isAuthPage) {
    return children;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      {user && <Topbar user={user} onLogout={logout} />}
      
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("userInfo"))
  );

  const logout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Layout user={user} logout={logout}>
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login setUser={setUser} />}
          />

          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register setUser={setUser} />}
          />

          <Route
            path="/"
            element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
          />

          <Route
            path="/tasks"
            element={user ? <Tasks user={user} /> : <Navigate to="/login" />}
          />

          <Route
            path="/create-task"
            element={user ? <CreateTask /> : <Navigate to="/login" />}
          />

          {/* ACCESSIBLE TO EVERYONE LOGGED IN */}
          <Route
            path="/team"
            element={user ? <Team user={user} /> : <Navigate to="/login" />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}