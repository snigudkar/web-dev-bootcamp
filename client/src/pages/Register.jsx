import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api"; 

const Register = ({ setUser }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    team: ""      
  });

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/api/signup", form);
      // "data" looks like this:
      // {
      //   _id: "65ab1234...",
      //   name: "John",
      //   email: "john@gmail.com",
      //   password: "$2b$10$hashedPasswordHere",
      //   isActive: false,
      // }

      localStorage.setItem("userInfo", JSON.stringify(data)); //Keeps the user logged in after registration
      
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
          
          {/* Save previous state or response
              I like cupcakes
              " " cheesecake
              " " noodles    */}
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