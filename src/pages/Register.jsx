// src/pages/Register.jsx
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      // ❌ Removed alert → looks unprofessional
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">
      
      {/* 🔥 REGISTER CARD */}
      <div className="bg-[#1e293b] p-8 rounded-2xl shadow-xl border border-[#334155] w-full max-w-md">
        
        {/* 🎨 TITLE */}
        <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
          Create Account 🚀
        </h2>

        {/* ❌ ERROR MESSAGE */}
        {error && (
          <p className="text-red-400 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleRegister} className="flex flex-col gap-4">

          {/* 📧 EMAIL */}
          <input
            type="email"
            placeholder="Enter your email"
            className="bg-[#0f172a] border border-[#334155] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* 🔒 PASSWORD */}
          <input
            type="password"
            placeholder="Create a password"
            className="bg-[#0f172a] border border-[#334155] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* 🚀 BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 py-2 rounded-lg font-semibold hover:scale-105 transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        {/* 🔗 LOGIN LINK */}
        <p className="text-sm text-gray-400 mt-5 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;