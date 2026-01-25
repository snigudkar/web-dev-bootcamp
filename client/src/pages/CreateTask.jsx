import React, { useEffect, useState } from "react";
import API from "../api"; 
import { useNavigate } from "react-router-dom";
import { FaTasks, FaArrowLeft, FaTimes } from "react-icons/fa"; 

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState([]); // Stores Array of User Objects for UI chips
  const [priority, setPriority] = useState("normal");
  const [teamMembers, setTeamMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const { data } = await API.get("/api/user/get-team"); 
        setTeamMembers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching team:", error);
      }
    };
    fetchTeamMembers();
  }, []);

  // ✅ Add member to chips
  const addMember = (e) => {
    const selectedId = e.target.value;
    if (!selectedId) return;

    const member = teamMembers.find(m => m._id === selectedId);
    // Prevent duplicates
    if (member && !assignedTo.find(m => m._id === selectedId)) {
      setAssignedTo([...assignedTo, member]);
    }
    e.target.value = ""; // Reset dropdown
  };

  // ✅ Remove member from chips
  const removeMember = (id) => {
    setAssignedTo(assignedTo.filter(m => m._id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send only the IDs to the backend
      const memberIds = assignedTo.map(m => m._id);
      await API.post("/api/tasks", {
        title,
        description,
        assignedTo: memberIds, 
        priority, 
      });
      navigate("/tasks");
    } catch (error) {
      alert("Failed to create task");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden">
        <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
          <h2 className="text-2xl font-bold flex items-center gap-2"><FaTasks /> Create New Task</h2>
          <button onClick={() => navigate("/tasks")} className="text-white/80 hover:text-white"><FaArrowLeft size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Task Title</label>
            <input type="text" className="w-full px-4 py-3 rounded-lg border focus:border-blue-500 outline-none" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Priority</label>
              <select className="w-full px-4 py-3 rounded-lg border outline-none" value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="normal">Normal</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Assign Team Members</label>
              <select className="w-full px-4 py-3 rounded-lg border outline-none mb-3" onChange={addMember}>
                <option value="">Select Member...</option>
                {teamMembers.map((member) => (
                  <option key={member._id} value={member._id}>{member.name}</option>
                ))}
              </select>

              {/* ✅ MODERN CHIPS SECTION */}
              <div className="flex flex-wrap gap-2">
                {assignedTo.map(member => (
                  <div key={member._id} className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {member.name}
                    <button type="button" onClick={() => removeMember(member._id)} className="hover:text-red-500">
                      <FaTimes size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea rows="3" className="w-full px-4 py-3 rounded-lg border focus:border-blue-500 outline-none" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-all">Save Task</button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;