import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage.jsx";
import RegisterPage from "./RegisterPage.jsx";
import { fetchCareers } from "./api.js";
import {
  BookOpen,
  Clock,
  Users,
  Search,
  Filter,
  Plus,
  Check,
  ChevronRight,
  ChevronDown,
  Book,
  FileText,
  Video,
  Wrench,
  ExternalLink,
  Bookmark,
  X,
  Bell,
  Moon,
  Sun,
  Shield,
  Home,
  BarChart3,
  Award,
  Calendar,
} from "lucide-react";

const SAMPLE_CAREERS = [
  {
    id: 1,
    title: "Software Development Engineer",
    icon: "💻",
    description:
      "Master full-stack web development and become a professional software engineer.",
    category: "Technology",
    steps: 12,
    duration: "6 months",
    difficulty: "Intermediate",
    progress: 50,
    popularity: 345,
  },
  {
    id: 2,
    title: "Lawyer",
    icon: "⚖️",
    description:
      "Navigate the legal world with comprehensive training in law and legal research.",
    category: "Law",
    steps: 15,
    duration: "8 months",
    difficulty: "Advanced",
    progress: 0,
    popularity: 156,
  },
];

function Navbar({ darkMode, setDarkMode }) {
  const navigate = useNavigate();

  return (
    <nav
      className={`border-b flex items-center justify-between px-6 py-4 ${
        darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
      }`}
    >
      <div className="flex items-center gap-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 font-bold text-blue-500"
        >
          <Home size={18} /> Dashboard
        </button>
        <button
          onClick={() => navigate("/progress")}
          className="flex items-center gap-2 font-bold text-gray-600 hover:text-blue-500"
        >
          <BarChart3 size={18} /> Progress
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-lg ${
            darkMode
              ? "bg-slate-700 text-yellow-400"
              : "bg-gray-100 text-gray-600"
          } hover:opacity-80`}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button
          className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
          title="Notifications"
        >
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </nav>
  );
}

function Dashboard({ darkMode }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCareers = SAMPLE_CAREERS.filter(
    (career) =>
      (selectedCategory === "All" || career.category === selectedCategory) &&
      (searchQuery === "" ||
        career.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div
      className={`p-6 min-h-screen ${
        darkMode ? "bg-slate-900" : "bg-slate-50"
      }`}
    >
      <div
        className={`rounded-xl p-8 mb-8 text-white shadow-xl ${
          darkMode
            ? "bg-gradient-to-r from-blue-900 to-blue-700"
            : "bg-gradient-to-r from-blue-500 to-blue-600"
        }`}
      >
        <h1 className="text-3xl font-bold mb-2">👋 Welcome back, Twin!</h1>
        <p className="text-blue-100 text-lg">
          Every expert was once a beginner.
        </p>
        <div className="mt-4 flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Award size={18} /> <span>3 Active Paths</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={18} /> <span>15 Day Streak 🔥</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Search careers..."
          className={`flex-1 border rounded-lg px-4 py-2 ${
            darkMode
              ? "bg-slate-800 border-slate-700 text-white"
              : "bg-white border-gray-200"
          }`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className={`flex items-center gap-2 px-4 py-2 border rounded-lg ${
            darkMode
              ? "bg-slate-800 border-slate-700"
              : "bg-white border-gray-200"
          }`}
        >
          <Filter size={18} /> Filter
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCareers.map((career) => (
          <div
            key={career.id}
            className={`border rounded-xl p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer ${
              darkMode ? "bg-slate-800 border-slate-700" : "bg-white"
            }`}
            onClick={() => navigate(`/roadmap/${career.id}`)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="text-4xl">{career.icon}</div>
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                {career.difficulty}
              </span>
            </div>
            <h3
              className={`text-lg font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {career.title}
            </h3>
            <p
              className={`text-sm mb-3 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {career.description}
            </p>
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 font-medium">
              {career.progress > 0
                ? `Continue (${career.progress}%)`
                : "Start Journey"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function RoadmapViewer({ darkMode }) {
  const navigate = useNavigate();
  const sampleSteps = [
    {
      id: 1,
      title: "Programming Fundamentals",
      description: "Learn basics of variables, loops, and conditionals.",
      status: "completed",
    },
    {
      id: 2,
      title: "Data Structures",
      description: "Understand arrays, stacks, and queues.",
      status: "in-progress",
    },
  ];

  return (
    <div
      className={`p-6 min-h-screen ${
        darkMode ? "bg-slate-900" : "bg-slate-50"
      }`}
    >
      <button
        onClick={() => navigate("/dashboard")}
        className={`mb-4 flex items-center gap-2 ${
          darkMode ? "text-gray-400" : "text-gray-600"
        } hover:text-blue-500`}
      >
        ← Back to Dashboard
      </button>
      <div
        className={`border rounded-xl p-6 ${
          darkMode ? "bg-slate-800 border-slate-700" : "bg-white"
        }`}
      >
        <h2
          className={`text-2xl font-bold mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Roadmap
        </h2>
        {sampleSteps.map((step) => (
          <div key={step.id} className="mb-4">
            <div className="flex justify-between">
              <h3
                className={`font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {step.title}
              </h3>
              <span
                className={`text-sm ${
                  step.status === "completed"
                    ? "text-green-500"
                    : step.status === "in-progress"
                    ? "text-blue-500"
                    : "text-gray-400"
                }`}
              >
                {step.status}
              </span>
            </div>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUser({ email: "saved-user" });
  }, []);

  return (
    <Router>
      {!user ? (
        <Routes>
          <Route path="/" element={<LoginPage onLogin={setUser} />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      ) : (
        <>
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <Routes>
            <Route path="/dashboard" element={<Dashboard darkMode={darkMode} />} />
            <Route path="/progress" element={<div>Progress Page (soon)</div>} />
            <Route
              path="/roadmap/:id"
              element={<RoadmapViewer darkMode={darkMode} />}
            />
          </Routes>
        </>
      )}
    </Router>
  );
}

export default App;
