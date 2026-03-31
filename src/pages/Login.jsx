// src/pages/Login.jsx
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">
      
      {/* 🔥 LOGIN CARD */}
      <div className="bg-[#1e293b] p-8 rounded-2xl shadow-xl border border-[#334155] w-full max-w-md">
        
        {/* 🎨 TITLE */}
        <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 via-blue-500 to-green-400 bg-clip-text text-transparent">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">

          {/* 📧 EMAIL */}
          <input
            type="email"
            placeholder="Enter your email"
            className="bg-[#0f172a] border border-[#334155] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* 🔒 PASSWORD */}
          <input
            type="password"
            placeholder="Enter your password"
            className="bg-[#0f172a] border border-[#334155] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* 🚀 LOGIN BUTTON */}
          <button
            type="submit"
            className="mt-2 bg-gradient-to-r from-purple-500 via-blue-500 to-green-400 py-2 rounded-lg font-semibold hover:scale-105 transition"
          >
            Login
          </button>
        </form>

        {/* 🔗 REGISTER LINK */}
        <p className="text-sm text-gray-400 mt-5 text-center">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-green-400 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}