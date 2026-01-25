import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

const Login = ({ setUser }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/api/login", form);
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      navigate("/");
    } catch (err) {
      alert(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#f3f4f6]">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between px-6">

        {/* LEFT SIDE (UI ONLY) */}
        <div className="hidden lg:flex flex-col gap-6">
          <span className="px-4 py-1 border rounded-full text-gray-600 text-sm">
            Manage all your tasks in one place
          </span>
          <h1 className="text-6xl font-black text-blue-700 leading-tight">
            Cloud-based <br /> Task Manager
          </h1>
        </div>

        {/* RIGHT SIDE LOGIN CARD */}
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-white rounded-3xl shadow-xl px-10 py-14 flex flex-col gap-6"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-blue-600">
              Welcome back!
            </h2>
            <p className="text-gray-500 text-sm">
              Login to continue
            </p>
          </div>

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
            Log in
          </button>

          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 font-semibold">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
