import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api"; // Ensure this path is correct

const Register = ({ setUser }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    // FIX 1: Initialize these properly (strings), not just variable names
    role: "user", // Change to "admin" if you want to test admin features immediately
    team: ""      
  });

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Ensure your backend endpoint is actually "/signup" (check your server routes)
      const { data } = await API.post("/api/signup", form);
      
      // FIX 2: Use "userInfo" to match App.jsx and Dashboard.jsx
      localStorage.setItem("userInfo", JSON.stringify(data));
      
      setUser(data);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#f3f4f6]">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between px-6">

        {/* LEFT SIDE (UI ONLY) */}
        <div className="hidden lg:flex flex-col gap-6">
          <span className="px-4 py-1 border rounded-full text-gray-600 text-sm">
            Join your team today
          </span>
          <h1 className="text-6xl font-black text-blue-700 leading-tight">
            Create your <br /> TaskFlow account
          </h1>
        </div>

        {/* RIGHT SIDE REGISTER CARD */}
        <form
          onSubmit={handleRegister}
          className="w-full max-w-md bg-white rounded-3xl shadow-xl px-10 py-14 flex flex-col gap-6"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-blue-600">
              Create Account
            </h2>
            <p className="text-gray-500 text-sm">
              Get started in seconds
            </p>
          </div>

          <input
            type="text"
            placeholder="Full name"
            className="p-3 rounded-full bg-slate-100 outline-none"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email address"
            className="p-3 rounded-full bg-slate-100 outline-none"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-full bg-slate-100 outline-none"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            type="submit"
            className="h-10 bg-blue-700 text-white rounded-full font-bold"
          >
            Register
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-semibold">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;