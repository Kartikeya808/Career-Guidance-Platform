// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage.jsx"; // ensure file exists in src
import { fetchCareers } from "./api.js";
import {
  Book, Video, FileText, Wrench, Check, Circle, Clock, Users, BookOpen,
  TrendingUp, Plus, Edit2, Trash2, Search, Menu, X, Sun, Moon, LogOut,
  Home, BarChart3, User, ChevronDown, ChevronRight, ExternalLink, Upload,
  Bookmark, Award, Calendar, Filter, Bell, Settings, Shield
} from 'lucide-react';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* other routes */}
      </Routes>
    </BrowserRouter>
  );
}
export default function App() {
  const [user, setUser] = useState(null);
  const [careers, setCareers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUser({ email: "saved-user" });
  }, []);

  useEffect(() => {
    if (user) {
      const load = async () => {
        try {
          const data = await fetchCareers();
          setCareers(data);
        } catch (err) {
          console.error("Error fetching careers:", err);
        }
      };
      load();
    }
  }, [user]);

  if (!user) return <LoginPage onLogin={setUser} />;

  // ======================= SAMPLE DATA =======================
  const SAMPLE_CAREERS = [
    { id: 1, title: "Software Development Engineer", icon: "💻", description: "Master full-stack web development and become a professional software engineer.", category: "Technology", steps: 12, duration: "6 months", difficulty: "Intermediate", progress: 50, popularity: 345 },
    { id: 2, title: "Lawyer", icon: "⚖️", description: "Navigate the legal world with comprehensive training in law, litigation, and legal research.", category: "Law", steps: 15, duration: "8 months", difficulty: "Advanced", progress: 0, popularity: 156 },
    { id: 3, title: "UX/UI Designer", icon: "🎨", description: "Create beautiful and intuitive user experiences with design thinking.", category: "Design", steps: 10, duration: "4 months", difficulty: "Beginner", progress: 75, popularity: 289 },
    { id: 4, title: "Data Scientist", icon: "📊", description: "Analyze data and build ML models to solve real-world problems.", category: "Technology", steps: 14, duration: "7 months", difficulty: "Advanced", progress: 0, popularity: 234 },
  ];

  const SAMPLE_ROADMAP = [
    { id: 1, number: 1, title: "Programming Fundamentals", description: "Learn basic programming concepts using JavaScript.", duration: "2 weeks", status: "completed", resources: 4, objectives: ["Understand variables", "Control flow", "Write functions"] },
    { id: 2, number: 2, title: "Data Structures & Algorithms", description: "Master data structures and algorithms.", duration: "3 weeks", status: "in-progress", resources: 6, objectives: ["Implement arrays", "Understand Big O", "Solve problems"] },
    { id: 3, number: 3, title: "HTML & CSS Mastery", description: "Build responsive web pages using HTML5 and CSS3.", duration: "2 weeks", status: "not-started", resources: 5, objectives: ["Semantic HTML", "Modern CSS", "Responsive layouts"] },
    { id: 4, number: 4, title: "JavaScript DOM Manipulation", description: "Interact with web pages dynamically using the DOM.", duration: "2 weeks", status: "not-started", resources: 3, objectives: ["Modify elements", "Handle events", "Dynamic interfaces"] },
    { id: 5, number: 5, title: "React Fundamentals", description: "Master React.js components, props, and hooks.", duration: "3 weeks", status: "not-started", resources: 7, objectives: ["Build components", "Use hooks", "Handle props"] },
  ];

  const SAMPLE_RESOURCES = [
    { id: 1, type: "article", title: "Big O Notation Explained", description: "Guide to algorithmic complexity", source: "GeeksforGeeks", difficulty: "Beginner", rating: 5, url: "https://geeksforgeeks.org", bookmarked: false },
    { id: 2, type: "video", title: "Data Structures Full Course", description: "Complete DS video course", source: "freeCodeCamp", difficulty: "Intermediate", rating: 5, duration: "2h 15m", url: "https://youtube.com", bookmarked: true },
    { id: 3, type: "pdf", title: "Algorithm Design Manual", description: "Definitive guide to algorithm design", source: "Steven Skiena", difficulty: "Advanced", rating: 5, bookmarked: false },
    { id: 4, type: "tool", title: "Visualgo - Algorithm Visualizer", description: "Interactive algorithm visualizer", source: "visualgo.net", difficulty: "All Levels", rating: 5, url: "https://visualgo.net", bookmarked: true },
  ];

  // ======================= STATES =======================
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [userRole, setUserRole] = useState("student");
  const [darkMode, setDarkMode] = useState(false);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [selectedStep, setSelectedStep] = useState(null);
  const [expandedStep, setExpandedStep] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const navigateTo = (page, career = null) => {
    setCurrentPage(page);
    setSelectedCareer(career);
    setSidebarOpen(false);
  };

  const openResourceModal = (step) => {
    setSelectedStep(step);
    setShowResourceModal(true);
  };

  const filteredCareers = SAMPLE_CAREERS.filter(
    (career) =>
      (selectedCategory === "All" || career.category === selectedCategory) &&
      (searchQuery === "" ||
        career.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // ======================= NAVBAR =======================
  const Navbar = () => (
    <nav
      className={`${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
        } border-b px-6 py-4 flex items-center justify-between sticky top-0 z-40`}
    >
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
            C
          </div>
          <span
            className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
          >
            CareerPath
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => navigateTo("dashboard")}
            className={`flex items-center gap-2 ${currentPage === "dashboard"
                ? "text-blue-500"
                : darkMode
                  ? "text-gray-300"
                  : "text-gray-600"
              } hover:text-blue-500`}
          >
            <Home size={18} /> Dashboard
          </button>
          {userRole === "student" && (
            <button
              onClick={() => navigateTo("progress")}
              className={`flex items-center gap-2 ${currentPage === "progress"
                  ? "text-blue-500"
                  : darkMode
                    ? "text-gray-300"
                    : "text-gray-600"
                } hover:text-blue-500`}
            >
              <BarChart3 size={18} /> Progress
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className={`relative p-2 rounded-lg ${darkMode ? "hover:bg-slate-700" : "hover:bg-gray-100"}`}>
          <Bell size={20} className={darkMode ? "text-gray-300" : "text-gray-600"} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-lg ${darkMode
              ? "bg-slate-700 text-yellow-400"
              : "bg-gray-100 text-gray-600"
            } hover:opacity-80`}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button
          onClick={() => setUserRole(userRole === "student" ? "admin" : "student")}
          className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm font-medium"
        >
          <Shield size={16} /> {userRole === "student" ? "Admin" : "Student"} Mode
        </button>
      </div>
    </nav>
  );

  // ======================= STUDENT DASHBOARD =======================
  const StudentDashboard = () => (
    <div className={`p-6 ${darkMode ? "bg-slate-900" : "bg-slate-50"} min-h-screen`}>
      <div className={`${darkMode
          ? "bg-gradient-to-r from-blue-900 to-blue-700"
          : "bg-gradient-to-r from-blue-500 to-blue-600"
        } rounded-xl p-8 mb-8 text-white shadow-xl`}>
        <h1 className="text-3xl font-bold mb-2">👋 Welcome back, Alex!</h1>
        <p className="text-blue-100 text-lg">Every expert was once a beginner</p>
        <div className="mt-4 flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Award size={18} />
            <span>3 Active Paths</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <span>15 Day Streak 🔥</span>
          </div>
        </div>
      </div>

      {/* search + filter */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div
            className={`flex-1 flex items-center gap-3 ${darkMode
                ? "bg-slate-800 border-slate-700"
                : "bg-white border-gray-200"
              } border rounded-lg px-4 py-3`}
          >
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search careers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`flex-1 outline-none ${darkMode ? "bg-slate-800 text-white" : "bg-white"
                }`}
            />
          </div>
          <button
            className={`flex items-center gap-2 px-4 py-3 ${darkMode
                ? "bg-slate-800 border-slate-700"
                : "bg-white border-gray-200"
              } border rounded-lg hover:border-blue-500`}
          >
            <Filter size={18} />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {["All", "Technology", "Business", "Design", "Law", "Healthcare"].map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${cat === selectedCategory
                    ? "bg-blue-500 text-white"
                    : darkMode
                      ? "bg-slate-800 text-gray-300"
                      : "bg-white text-gray-600"
                  } border ${darkMode ? "border-slate-700" : "border-gray-200"}`}
              >
                {cat}
              </button>
            )
          )}
        </div>
      </div>

      {/* grid of careers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCareers.map((career) => (
          <div
            key={career.id}
            className={`${darkMode
                ? "bg-slate-800 border-slate-700"
                : "bg-white border-gray-200"
              } border rounded-xl p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer`}
            onClick={() => navigateTo("roadmap", career)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl">{career.icon}</div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${career.difficulty === "Beginner"
                    ? "bg-green-100 text-green-700"
                    : career.difficulty === "Intermediate"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
              >
                {career.difficulty}
              </span>
            </div>
            <h3
              className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"
                }`}
            >
              {career.title}
            </h3>
            <p
              className={`${darkMode ? "text-gray-400" : "text-gray-600"
                } text-sm mb-4 line-clamp-2`}
            >
              {career.description}
            </p>
            <div className="flex items-center gap-4 text-sm mb-4 flex-wrap">
              <span
                className={`flex items-center gap-1 ${darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
              >
                <BookOpen size={16} />
                {career.steps} Steps
              </span>
              <span
                className={`flex items-center gap-1 ${darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
              >
                <Clock size={16} />
                {career.duration}
              </span>
              <span
                className={`flex items-center gap-1 ${darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
              >
                <Users size={16} />
                {career.popularity}
              </span>
            </div>
            {career.progress > 0 ? (
              <>
                <div
                  className={`w-full ${darkMode ? "bg-slate-700" : "bg-gray-200"
                    } rounded-full h-2 mb-2`}
                >
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${career.progress}%` }}
                  ></div>
                </div>
                <button className="w-full mt-2 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
                  Continue ({career.progress}%)
                </button>
              </>
            ) : (
              <button className="w-full mt-2 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
                Start Journey
              </button>
            )}
          </div>
        ))}
      </div>

      {filteredCareers.length === 0 && (
        <div
          className={`text-center py-12 ${darkMode ? "text-gray-400" : "text-gray-600"
            }`}
        >
          <Search size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg">No careers found</p>
        </div>
      )}
    </div>
  );

  // ======================= RENDER =======================
  return (
    <div className={`min-h-screen ${darkMode ? "bg-slate-900" : "bg-slate-50"}`}>
      <Navbar />
      {currentPage === "dashboard" &&
        (userRole === "student" ? <StudentDashboard /> : <div>Admin View Placeholder</div>)}
    </div>
  );
}

