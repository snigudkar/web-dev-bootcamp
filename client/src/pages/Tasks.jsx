import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaCheckCircle, FaTasks } from "react-icons/fa";

const Tasks = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  // Fetch tasks from the server
  const fetchTasks = async () => {
    try {
      // If user is member, we only want tasks assigned to them
      const queryParam = user?.role === "admin" ? "" : `?userId=${user?._id}`;
      const { data } = await API.get(`/api/tasks${queryParam}`);
      setTasks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTasks([]);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  // Handle status change - Deletes task if "completed" is chosen
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      // The backend logic handles the deletion if status === "completed"
      await API.put(`/api/tasks/${taskId}`, { status: newStatus });
      
      if (newStatus === "completed") {
        alert("Task completed and removed successfully!");
      }
      
      // Refresh the list to reflect changes
      fetchTasks();
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Error updating task status.");
    }
  };

  // Local filtering for the UI tabs
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            <FaTasks className="text-blue-600" /> Project Tasks
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Logged in as: <span className="text-blue-600 font-semibold">{user?.name}</span> ({user?.role})
          </p>
        </div>
        
        {user?.role === "admin" && (
          <button 
            onClick={() => navigate("/create-task")} 
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg shadow-lg hover:bg-blue-700 transition-all font-semibold"
          >
            + Create New Task
          </button>
        )}
      </div>

      {/* Tabs / Filters */}
      <div className="flex gap-8 border-b border-gray-200 mb-8">
        {["all", "todo", "inprogress"].map((tab) => (
          <button 
            key={tab} 
            onClick={() => setFilter(tab)} 
            className={`capitalize pb-4 text-sm font-bold transition-all relative ${
              filter === tab 
                ? "text-blue-600 border-b-2 border-blue-600" 
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab === "inprogress" ? "In Progress" : tab}
          </button>
        ))}
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div key={task._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-800 text-lg leading-tight uppercase tracking-tight">
                    {task.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                  {task.description}
                </p>
                
                <div className="mb-6">
                  <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Update Status</label>
                  <select 
                    className="w-full text-sm border border-gray-200 rounded-lg p-2 bg-gray-50 font-semibold text-blue-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    value={task.status}
                    onChange={(e) => handleStatusChange(task._id, e.target.value)}
                  >
                    <option value="todo">📋 TO DO</option>
                    <option value="inprogress">⏳ IN PROGRESS</option>
                    <option value="completed">✅ MARK COMPLETED</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-gray-50 pt-4 mt-2">
                <p className="text-[10px] text-gray-400 uppercase font-bold mb-3 tracking-wider">Team Members</p>
                <div className="flex flex-wrap gap-2">
                  {task.assignedTo && task.assignedTo.length > 0 ? (
                    task.assignedTo.map((member, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 bg-blue-50 border border-blue-100 px-2 py-1 rounded-full">
                        <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                          {member.name ? member.name.charAt(0) : "?"}
                        </div>
                        <span className="text-[11px] text-blue-800 font-semibold">{member.name}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-xs text-gray-400 italic">No one assigned</span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-medium">No active tasks found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;