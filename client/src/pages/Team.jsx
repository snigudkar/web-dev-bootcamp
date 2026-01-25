import React, { useEffect, useState } from "react";
import API from "../api"; 
import { FaUserCircle, FaTimes } from "react-icons/fa"; 

const Team = ({ user }) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]); 
  const [showModal, setShowModal] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState("");

  const fetchData = async () => {
    try {
      const teamRes = await API.get("/api/user/get-team");
      // Ensure we always set an array
      setTeamMembers(Array.isArray(teamRes.data) ? teamRes.data : []);
      
      if (showModal) {
        const availRes = await API.get("/api/user/available");
        setAvailableUsers(Array.isArray(availRes.data) ? availRes.data : []);
      }
    } catch (error) {
      console.error("Error fetching data", error);
      setTeamMembers([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [showModal]);

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!selectedEmail) return alert("Please select a user");
    
    try {
      await API.post("/api/user/add-to-team", { email: selectedEmail });
      setShowModal(false);
      setSelectedEmail("");
      fetchData(); // Refresh the list
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add member");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Team Members</h1>
        {user?.role === "admin" && (
          <button 
            onClick={() => setShowModal(true)} 
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-blue-700 transition"
          >
            + Add Member
          </button>
        )}
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {teamMembers.length > 0 ? (
          teamMembers.map((member) => (
            <div key={member._id} className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center text-center border border-gray-100">
              <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl mb-4 font-bold">
                {member.name ? member.name.charAt(0).toUpperCase() : <FaUserCircle />}
              </div>
              <h3 className="text-lg font-bold text-gray-800">{member.name}</h3>
              <p className="text-gray-500 text-sm mb-3">{member.email}</p>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                member.role === "admin" ? "bg-purple-100 text-purple-600" : "bg-green-100 text-green-600"
              }`}>
                {member.role}
              </span>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 mt-10">No team members found.</p>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl relative">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <FaTimes />
            </button>
            
            <h2 className="text-xl font-bold mb-2">Add Registered User</h2>
            <p className="text-sm text-gray-500 mb-6">Users must sign up first before appearing here.</p>
            
            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Select User</label>
                <select 
                  className="w-full p-2.5 border rounded-lg bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 transition"
                  value={selectedEmail}
                  onChange={(e) => setSelectedEmail(e.target.value)}
                  required
                >
                  <option value="">-- Choose User --</option>
                  {availableUsers.map(u => (
                    <option key={u.email} value={u.email}>{u.name} ({u.email})</option>
                  ))}
                </select>
                {availableUsers.length === 0 && (
                  <p className="text-red-500 text-[11px] mt-2 italic">No new registrations found.</p>
                )}
              </div>

              <button 
                type="submit" 
                disabled={availableUsers.length === 0}
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-bold hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Add to Team View
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;