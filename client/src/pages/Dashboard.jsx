
import React, { useEffect, useState } from "react";
import API from "../api"; 
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell, Legend } from "recharts";
import { FaClipboardList, FaCheckCircle, FaSpinner, FaTasks } from "react-icons/fa"; 

const Dashboard = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [counts, setCounts] = useState({ todo: 0, inprogress: 0, completed: 0, total: 0 });

  useEffect(() => {
    if (!user || !user._id) return;

    const fetchTasks = async () => {
      try {
        // Fetch only tasks assigned to THIS specific user
        const { data } = await API.get(`/api/tasks?userId=${user._id}`);
        
        const tasksArray = Array.isArray(data) ? data : [];
        setTasks(tasksArray);

        // Calculate counts based on the filtered results
        const todo = tasksArray.filter((t) => t.status === "todo").length;
        const inprogress = tasksArray.filter((t) => t.status === "inprogress").length;
        const completed = tasksArray.filter((t) => t.status === "completed").length;

        setCounts({ todo, inprogress, completed, total: tasksArray.length });
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [user]);

  const data = [
    { name: "To Do", value: counts.todo },
    { name: "In Progress", value: counts.inprogress },
    { name: "Completed", value: counts.completed },
  ];

  const COLORS = ["#8884d8", "#f6e05e", "#48bb78"];

  const StatCard = ({ title, count, icon, bg, text }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-between">
      <div>
        <h3 className="text-gray-500 text-sm uppercase font-semibold">{title}</h3>
        <p className="text-2xl font-bold text-gray-800 mt-1">{count}</p>
        <span className="text-gray-400 text-xs italic">Assigned to you</span>
      </div>
      <div className={`p-3 rounded-full ${bg} ${text}`}>{icon}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* STATS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="TOTAL TASK" count={counts.total} icon={<FaClipboardList size={20} />} bg="bg-blue-100" text="text-blue-600" />
        <StatCard title="COMPLETED" count={counts.completed} icon={<FaCheckCircle size={20} />} bg="bg-green-100" text="text-green-600" />
        <StatCard title="IN PROGRESS" count={counts.inprogress} icon={<FaSpinner size={20} />} bg="bg-yellow-100" text="text-yellow-600" />
        <StatCard title="TODOS" count={counts.todo} icon={<FaTasks size={20} />} bg="bg-red-100" text="text-red-600" />
      </div>

      {/* CHART SECTION */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Your Task Distribution</h2>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index]} />)}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;