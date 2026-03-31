// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function Dashboard({ jobs, deleteJob }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [goal, setGoal] = useState(50);

  // Load goal
  useEffect(() => {
    const savedGoal = localStorage.getItem("goal");
    if (savedGoal) setGoal(Number(savedGoal));
  }, []);

  // Save goal
  useEffect(() => {
    localStorage.setItem("goal", goal);
  }, [goal]);

  // 🔍 Filter
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || job.status === filter;

    return matchesSearch && matchesFilter;
  });

  // 📊 Analytics
  const statusCount = { Applied: 0, Interview: 0, Rejected: 0 };

  jobs.forEach((job) => {
    if (statusCount[job.status] !== undefined) {
      statusCount[job.status]++;
    }
  });

  const applied = statusCount.Applied;
  const interview = statusCount.Interview;
  const rejected = statusCount.Rejected;

  const interviewRate =
    applied > 0 ? ((interview / applied) * 100).toFixed(1) : 0;

  const rejectionRate =
    applied > 0 ? ((rejected / applied) * 100).toFixed(1) : 0;

  const progress =
    goal > 0 ? ((applied / goal) * 100).toFixed(1) : 0;

  const chartData = [
    { name: "Applied", value: applied },
    { name: "Interview", value: interview },
    { name: "Rejected", value: rejected },
  ];

  // 🧠 Insights
  let insight = "";
  if (applied === 0) insight = "Start applying to jobs.";
  else if (interviewRate < 20)
    insight = "Low conversion. Improve resume.";
  else if (interviewRate < 50)
    insight = "Decent progress. Keep improving.";
  else insight = "Strong performance.";

  let goalInsight = "";
  if (applied === 0) goalInsight = "Start applying.";
  else if (progress < 50) goalInsight = "Behind pace.";
  else if (progress < 100) goalInsight = "On track.";
  else goalInsight = "Goal achieved.";

  return (
    <div className="p-6 min-h-screen bg-[#0f172a] text-white">
      
      {/* 🔥 HEADER */}
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
        Dashboard
      </h1>

      {/* 🔥 TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card title="Total Jobs" value={jobs.length} />
        <Card title="Applied" value={applied} />
        <Card title="Interview" value={interview} />
        <Card title="Rejected" value={rejected} />
      </div>

      {/* 📊 METRICS + GOAL */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        
        {/* Conversion */}
        <div className="bg-[#1e293b] p-4 rounded-2xl shadow-lg border border-[#334155]">
          <h2 className="font-semibold mb-2">Conversion Metrics</h2>
          <p>Interview Rate: {interviewRate}%</p>
          <p>Rejection Rate: {rejectionRate}%</p>
          <p className="mt-2 text-sm text-gray-400">{insight}</p>
        </div>

        {/* Goal Tracker */}
        <div className="bg-[#1e293b] p-4 rounded-2xl shadow-lg border border-[#334155]">
          <h2 className="font-semibold mb-2">Goal Tracker</h2>

          <input
            type="number"
            value={goal}
            onChange={(e) => setGoal(Number(e.target.value))}
            className="bg-[#0f172a] border border-[#334155] text-white p-2 rounded w-full mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <p>{applied} / {goal}</p>
          <p>{progress}% completed</p>

          <div className="w-full bg-gray-700 h-3 rounded mt-2">
            <div
              className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <p className="text-sm text-gray-400 mt-2">{goalInsight}</p>
        </div>
      </div>

      {/* 📈 CHART */}
      <div className="bg-[#1e293b] p-4 rounded-2xl shadow-lg border border-[#334155] mb-6">
        <h2 className="font-semibold mb-4">Analytics</h2>

        <BarChart width={500} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="name" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{ backgroundColor: "#1e293b", border: "none" }}
            labelStyle={{ color: "#fff" }}
          />
          <Bar dataKey="value" fill="url(#colorGradient)" />

          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </BarChart>
      </div>

      {/* 🔍 SEARCH + FILTER */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search jobs..."
          onChange={(e) => setSearch(e.target.value)}
          className="bg-[#0f172a] border border-[#334155] text-white p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <select
          onChange={(e) => setFilter(e.target.value)}
          className="bg-[#0f172a] border border-[#334155] text-white p-2 rounded focus:outline-none"
        >
          <option>All</option>
          <option>Applied</option>
          <option>Interview</option>
          <option>Rejected</option>
        </select>
      </div>

      {/* 📦 JOB LIST */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredJobs.length === 0 ? (
          <p>No jobs found</p>
        ) : (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-[#1e293b] p-4 rounded-2xl shadow-lg border border-[#334155] hover:shadow-green-500/10 transition"
            >
              <h3 className="font-bold">{job.title}</h3>
              <p className="text-gray-400">{job.company}</p>

              {/* 🎨 STATUS COLOR */}
              <p
                className={`text-sm mt-1 font-semibold ${
                  job.status === "Applied"
                    ? "text-blue-400"
                    : job.status === "Interview"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                Status: {job.status}
              </p>

              <button
                onClick={() => deleteJob(job.id)}
                className="mt-3 bg-gradient-to-r from-red-500 to-pink-500 px-3 py-1 rounded hover:scale-105 transition"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// 🔥 CARD COMPONENT
function Card({ title, value }) {
  return (
    <div className="bg-[#1e293b] p-4 rounded-2xl shadow-lg border border-[#334155] hover:shadow-green-500/10 transition">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-2xl font-bold text-green-400">{value}</h2>
    </div>
  );
}

export default Dashboard;