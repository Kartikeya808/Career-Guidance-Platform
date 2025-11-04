import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import { fetchCareers } from "./api.js";
import {
  Home, BarChart3, Bell, Sun, Moon, Shield,
  Search, Filter, Clock, Users, BookOpen, Award, Calendar, Plus
} from "lucide-react";

export default function App() {
  const [user, setUser] = useState(null);
  const [careers, setCareers] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUser({ email: "saved-user" });
  }, []);

  useEffect(() => {
    if (user) {
      const loadCareers = async () => {
        try {
          const data = await fetchCareers();
          setCareers(data);
        } catch (err) {
          console.error("Error fetching careers:", err);
        }
      };
      loadCareers();
    }
  }, [user]);

  if (!user)
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage onLogin={setUser} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    );

  const SAMPLE_CAREERS = [
    { id: 1, title: "Software Engineer", icon: "💻", category: "Tech", progress: 40 },
    { id: 2, title: "Lawyer", icon: "⚖️", category: "Law", progress: 0 },
    { id: 3, title: "UX Designer", icon: "🎨", category: "Design", progress: 75 },
  ];

  const Navbar = () => (
    <nav className={`${darkMode ? "bg-slate-800" : "bg-white"} border-b border-gray-200 px-6 py-4 flex items-center justify-between`}>
      <div className="flex items-center gap-6">
        <div className="text-2xl font-bold text-blue-600">CareerPath</div>
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => setCurrentPage("dashboard")}
            className={`flex items-center gap-2 ${
              currentPage === "dashboard" ? "text-blue-500" : "text-gray-600"
            } hover:text-blue-500`}
          >
            <Home size={18} /> Dashboard
          </button>
          <button
            onClick={() => setCurrentPage("progress")}
            className={`flex items-center gap-2 ${
              currentPage === "progress" ? "text-blue-500" : "text-gray-600"
            } hover:text-blue-500`}
          >
            <BarChart3 size={18} /> Progress
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-lg hover:bg-gray-100">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-lg ${darkMode ? "bg-slate-700 text-yellow-400" : "bg-gray-100 text-gray-600"}`}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            setUser(null);
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 text-sm font-medium"
        >
          Logout
        </button>
      </div>
    </nav>
  );

  const Dashboard = () => (
    <div className={`p-6 ${darkMode ? "bg-slate-900" : "bg-gray-50"} min-h-screen`}>
      <div className={`${darkMode ? "bg-blue-800" : "bg-blue-500"} rounded-xl p-8 text-white mb-8`}>
        <h1 className="text-3xl font-bold">👋 Welcome, {user.email}</h1>
        <p className="text-blue-100">Your personalized career dashboard</p>
        <div className="mt-4 flex gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Award size={18} /> 3 Active Paths
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={18} /> 15-Day Streak 🔥
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 flex items-center gap-3 bg-white border rounded-lg px-4 py-3">
          <Search size={20} className="text-gray-400" />
          <input type="text" placeholder="Search careers..." className="flex-1 outline-none" />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 bg-white border rounded-lg hover:border-blue-500">
          <Filter size={18} /> Filter
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SAMPLE_CAREERS.map((career) => (
          <div
            key={career.id}
            className="bg-white border rounded-xl p-6 hover:shadow-lg cursor-pointer transition-all"
          >
            <div className="flex justify-between items-center mb-3">
              <div className="text-3xl">{career.icon}</div>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  career.progress > 0 ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {career.progress > 0 ? "In Progress" : "Not Started"}
              </span>
            </div>
            <h3 className="text-lg font-bold mb-2">{career.title}</h3>
            <p className="text-sm text-gray-600 mb-4">Category: {career.category}</p>
            {career.progress > 0 ? (
              <div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${career.progress}%` }}
                  ></div>
                </div>
                <button className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Continue ({career.progress}%)
                </button>
              </div>
            ) : (
              <button className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Start Path
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const Progress = () => (
    <div className={`p-6 ${darkMode ? "bg-slate-900" : "bg-gray-50"} min-h-screen`}>
      <h1 className={`text-3xl font-bold mb-8 ${darkMode ? "text-white" : "text-gray-900"}`}>
        My Progress
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Careers Active", value: "3" },
          { label: "Steps Completed", value: "28" },
          { label: "Streak", value: "🔥 15" },
          { label: "Time Spent", value: "45h" },
        ].map((stat, i) => (
          <div key={i} className="bg-white border rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-500">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border rounded-xl p-6">
        <h3 className="font-bold text-lg mb-4">Career Breakdown</h3>
        <div className="space-y-4">
          {SAMPLE_CAREERS.map((c) => (
            <div key={c.id}>
              <div className="flex justify-between mb-1">
                <span>{c.icon} {c.title}</span>
                <span className="text-blue-500 font-semibold">{c.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${c.progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
