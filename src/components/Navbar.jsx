import { Link } from "react-router-dom";

export default function Navbar({ logout }) {
  return (
    <nav className="bg-[#0f172a] border-b border-[#1e293b] px-6 py-4 flex justify-between items-center shadow-lg">
      
      {/* LOGO */}
      <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
        Job Tracker
      </h1>

      {/* NAV LINKS */}
      <div className="flex items-center gap-6">
        <Link
          to="/"
          className="text-gray-300 hover:text-green-400 transition"
        >
          Dashboard
        </Link>

        <Link
          to="/add"
          className="text-gray-300 hover:text-blue-400 transition"
        >
          Add Job
        </Link>

        {/* LOGOUT BUTTON */}
        <button
          onClick={logout}
          className="bg-gradient-to-r from-red-500 to-pink-500 px-4 py-1 rounded-lg hover:scale-105 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}