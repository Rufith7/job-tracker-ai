// src/pages/AddJob.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddJob({ addJob }) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("Applied");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !company) {
      alert("Please fill all fields");
      return;
    }

    addJob({ title, company, status });

    setTitle("");
    setCompany("");
    setStatus("Applied");

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6">
      
      {/* 🔥 FORM CARD */}
      <div className="bg-[#1e293b] p-8 rounded-2xl shadow-lg border border-[#334155] w-full max-w-md">
        
        {/* 🎨 TITLE */}
        <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Add Job
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* 📝 JOB TITLE */}
          <input
            type="text"
            placeholder="Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-[#0f172a] border border-[#334155] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          {/* 🏢 COMPANY */}
          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="bg-[#0f172a] border border-[#334155] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* 🎯 STATUS */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-[#0f172a] border border-[#334155] text-white p-3 rounded-lg focus:outline-none"
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Rejected</option>
          </select>

          {/* 🚀 SUBMIT BUTTON */}
          <button
            type="submit"
            className="mt-4 bg-gradient-to-r from-green-400 to-blue-500 py-2 rounded-lg font-semibold hover:scale-105 transition"
          >
            Add Job
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddJob;