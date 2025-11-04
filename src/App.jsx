import React, { useState, useEffect } from "react";
import LoginPage from "./LoginPage.jsx"; // make sure file exists in src
import { fetchCareers } from "./api.js";

import { Book, Video, FileText, Wrench, Check, Circle, Clock, Users, BookOpen, TrendingUp, Plus, Edit2, Trash2, Search, Menu, X, Sun, Moon, LogOut, Home, BarChart3, User, ChevronDown, ChevronRight, ExternalLink, Upload, Bookmark, Award, Calendar, Filter, Bell, Settings, Shield } from 'lucide-react';
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
//my old code
  if (!user) return <LoginPage onLogin={setUser} />;
// Sample Data aligned with SRS
const SAMPLE_CAREERS = [
  {
    id: 1,
    title: "Software Development Engineer",
    icon: "💻",
    description: "Master full-stack web development and become a professional software engineer. Follow structured roadmap from fundamentals to advanced concepts.",
    category: "Technology",
    steps: 12,
    duration: "6 months",
    difficulty: "Intermediate",
    progress: 50,
    popularity: 345
  },
  {
    id: 2,
    title: "Lawyer",
    icon: "⚖️",
    description: "Navigate the legal world with comprehensive training in law, litigation, and legal research.",
    category: "Law",
    steps: 15,
    duration: "8 months",
    difficulty: "Advanced",
    progress: 0,
    popularity: 156
  },
  {
    id: 3,
    title: "UX/UI Designer",
    icon: "🎨",
    description: "Create beautiful and intuitive user experiences for digital products with design thinking.",
    category: "Design",
    steps: 10,
    duration: "4 months",
    difficulty: "Beginner",
    progress: 75,
    popularity: 289
  },
  {
    id: 4,
    title: "Data Scientist",
    icon: "📊",
    description: "Analyze data and build machine learning models to solve real-world problems.",
    category: "Technology",
    steps: 14,
    duration: "7 months",
    difficulty: "Advanced",
    progress: 0,
    popularity: 234
  }
];

const SAMPLE_ROADMAP = [
  {
    id: 1,
    number: 1,
    title: "Programming Fundamentals",
    description: "Learn basic programming concepts including variables, loops, conditionals, and functions using JavaScript.",
    duration: "2 weeks",
    status: "completed",
    resources: 4,
    objectives: ["Understand variables and data types", "Master control flow", "Write functions"]
  },
  {
    id: 2,
    number: 2,
    title: "Data Structures & Algorithms",
    description: "Master fundamental data structures and common algorithms. Essential for technical interviews.",
    duration: "3 weeks",
    status: "in-progress",
    resources: 6,
    objectives: ["Implement arrays, stacks, queues", "Understand Big O notation", "Solve problems"]
  },
  {
    id: 3,
    number: 3,
    title: "HTML & CSS Mastery",
    description: "Build beautiful, responsive web pages using HTML5 and CSS3.",
    duration: "2 weeks",
    status: "not-started",
    resources: 5,
    objectives: ["Write semantic HTML", "Style with modern CSS", "Create responsive layouts"]
  },
  {
    id: 4,
    number: 4,
    title: "JavaScript DOM Manipulation",
    description: "Learn to interact with web pages dynamically using the DOM.",
    duration: "2 weeks",
    status: "not-started",
    resources: 3,
    objectives: ["Select and modify elements", "Handle events", "Create dynamic interfaces"]
  },
  {
    id: 5,
    number: 5,
    title: "React Fundamentals",
    description: "Master React.js, including components, props, state, and hooks.",
    duration: "3 weeks",
    status: "not-started",
    resources: 7,
    objectives: ["Build components", "Manage state with hooks", "Handle props"]
  }
];

const SAMPLE_RESOURCES = [
  {
    id: 1,
    type: "article",
    title: "Big O Notation Explained",
    description: "Comprehensive guide to algorithmic complexity",
    source: "GeeksforGeeks",
    difficulty: "Beginner",
    rating: 5,
    url: "https://geeksforgeeks.org",
    bookmarked: false
  },
  {
    id: 2,
    type: "video",
    title: "Data Structures Full Course",
    description: "Complete video course covering all major data structures",
    source: "freeCodeCamp",
    difficulty: "Intermediate",
    rating: 5,
    duration: "2h 15m",
    url: "https://youtube.com",
    bookmarked: true
  },
  {
    id: 3,
    type: "pdf",
    title: "Algorithm Design Manual",
    description: "The definitive guide to algorithm design",
    source: "Steven Skiena",
    difficulty: "Advanced",
    rating: 5,
    bookmarked: false
  },
  {
    id: 4,
    type: "tool",
    title: "Visualgo - Algorithm Visualizer",
    description: "Interactive visualization tool for algorithms",
    source: "visualgo.net",
    difficulty: "All Levels",
    rating: 5,
    url: "https://visualgo.net",
    bookmarked: true
  }
];

export default function CareerGuidancePlatform() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [userRole, setUserRole] = useState('student');
  const [darkMode, setDarkMode] = useState(false);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [selectedStep, setSelectedStep] = useState(null);
  const [expandedStep, setExpandedStep] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const navigateTo = (page, career = null) => {
    setCurrentPage(page);
    setSelectedCareer(career);
    setSidebarOpen(false);
  };

  const openResourceModal = (step) => {
    setSelectedStep(step);
    setShowResourceModal(true);
  };

  const filteredCareers = SAMPLE_CAREERS.filter(career => 
    (selectedCategory === 'All' || career.category === selectedCategory) &&
    (searchQuery === '' || career.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const Navbar = () => (
    <nav className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border-b px-6 py-4 flex items-center justify-between sticky top-0 z-40`}>
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">C</div>
          <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>CareerPath</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <button onClick={() => navigateTo('dashboard')} className={`flex items-center gap-2 ${currentPage === 'dashboard' ? 'text-blue-500' : (darkMode ? 'text-gray-300' : 'text-gray-600')} hover:text-blue-500`}>
            <Home size={18} />
            Dashboard
          </button>
          {userRole === 'student' && (
            <button onClick={() => navigateTo('progress')} className={`flex items-center gap-2 ${currentPage === 'progress' ? 'text-blue-500' : (darkMode ? 'text-gray-300' : 'text-gray-600')} hover:text-blue-500`}>
              <BarChart3 size={18} />
              Progress
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className={`relative p-2 rounded-lg ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`}>
          <Bell size={20} className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-lg ${darkMode ? 'bg-slate-700 text-yellow-400' : 'bg-gray-100 text-gray-600'} hover:opacity-80`}>
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button onClick={() => setUserRole(userRole === 'student' ? 'admin' : 'student')} className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm font-medium">
          <Shield size={16} />
          {userRole === 'student' ? 'Admin' : 'Student'} Mode
        </button>
        <button className="md:hidden p-2" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );

  const StudentDashboard = () => (
    <div className={`p-6 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'} min-h-screen`}>
      <div className={`${darkMode ? 'bg-gradient-to-r from-blue-900 to-blue-700' : 'bg-gradient-to-r from-blue-500 to-blue-600'} rounded-xl p-8 mb-8 text-white shadow-xl`}>
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

      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className={`flex-1 flex items-center gap-3 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-lg px-4 py-3`}>
            <Search size={20} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search careers..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`flex-1 outline-none ${darkMode ? 'bg-slate-800 text-white' : 'bg-white'}`} 
            />
          </div>
          <button className={`flex items-center gap-2 px-4 py-3 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-lg hover:border-blue-500`}>
            <Filter size={18} />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {['All', 'Technology', 'Business', 'Design', 'Law', 'Healthcare'].map(cat => (
            <button 
              key={cat} 
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                cat === selectedCategory 
                  ? 'bg-blue-500 text-white' 
                  : (darkMode ? 'bg-slate-800 text-gray-300' : 'bg-white text-gray-600')
              } border ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCareers.map(career => (
          <div key={career.id} className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-xl p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer`} onClick={() => navigateTo('roadmap', career)}>
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl">{career.icon}</div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                career.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                career.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {career.difficulty}
              </span>
            </div>
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{career.title}</h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-4 line-clamp-2`}>{career.description}</p>
            <div className="flex items-center gap-4 text-sm mb-4 flex-wrap">
              <span className={`flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <BookOpen size={16} />
                {career.steps} Steps
              </span>
              <span className={`flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <Clock size={16} />
                {career.duration}
              </span>
              <span className={`flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <Users size={16} />
                {career.popularity}
              </span>
            </div>
            {career.progress > 0 ? (
              <>
                <div className={`w-full ${darkMode ? 'bg-slate-700' : 'bg-gray-200'} rounded-full h-2 mb-2`}>
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: `${career.progress}%`}}></div>
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
        <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <Search size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg">No careers found</p>
        </div>
      )}
    </div>
  );

  const RoadmapViewer = () => {
    if (!selectedCareer) return null;

    const completedSteps = SAMPLE_ROADMAP.filter(s => s.status === 'completed').length;
    const progress = Math.round((completedSteps / SAMPLE_ROADMAP.length) * 100);

    return (
      <div className={`p-6 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'} min-h-screen`}>
        <div className="max-w-6xl mx-auto">
          <button onClick={() => navigateTo('dashboard')} className={`flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'} hover:text-blue-500 mb-4`}>
            ← Back to Dashboard
          </button>
          
          <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-xl p-6 mb-6`}>
            <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="text-5xl">{selectedCareer.icon}</div>
                <div>
                  <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCareer.title}</h1>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>{selectedCareer.description}</p>
                </div>
              </div>
              <button className={`px-4 py-2 ${darkMode ? 'bg-slate-700 text-gray-300' : 'bg-gray-100 text-gray-600'} rounded-lg text-sm hover:bg-red-500 hover:text-white`}>
                Reset Progress
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Overall Progress</span>
                  <span className="text-sm font-bold text-blue-500">{progress}%</span>
                </div>
                <div className={`w-full ${darkMode ? 'bg-slate-700' : 'bg-gray-200'} rounded-full h-3`}>
                  <div className="bg-blue-500 h-3 rounded-full" style={{width: `${progress}%`}}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {SAMPLE_ROADMAP.map((step, idx) => (
                <div key={step.id} className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-xl p-6 ${expandedStep === step.id ? 'ring-2 ring-blue-500' : ''}`}>
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                        step.status === 'completed' ? 'bg-green-500 text-white' :
                        step.status === 'in-progress' ? 'bg-blue-500 text-white' :
                        (darkMode ? 'bg-slate-700 text-gray-400' : 'bg-gray-200 text-gray-600')
                      }`}>
                        {step.status === 'completed' ? <Check size={20} /> : step.number}
                      </div>
                      {idx < SAMPLE_ROADMAP.length - 1 && (
                        <div className={`w-0.5 h-16 mt-2 ${step.status === 'completed' ? 'bg-green-500' : (darkMode ? 'bg-slate-700' : 'bg-gray-200')}`}></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                        <div>
                          <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{step.title}</h3>
                          <div className="flex items-center gap-3 mt-1 flex-wrap">
                            <span className={`text-sm ${
                              step.status === 'completed' ? 'text-green-500' :
                              step.status === 'in-progress' ? 'text-blue-500' :
                              (darkMode ? 'text-gray-400' : 'text-gray-600')
                            } font-medium`}>
                              {step.status === 'completed' ? '✓ Completed' :
                               step.status === 'in-progress' ? '🔵 In Progress' :
                               '⚪ Not Started'}
                            </span>
                            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              <Clock size={14} className="inline mr-1" />
                              {step.duration}
                            </span>
                          </div>
                        </div>
                        <button onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)} className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} hover:text-blue-500`}>
                          {expandedStep === step.id ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                        </button>
                      </div>
                      
                      {expandedStep === step.id && (
                        <div className="mt-4 space-y-4">
                          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{step.description}</p>
                          
                          <div>
                            <h4 className={`text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Learning Objectives:</h4>
                            <ul className={`space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                              {step.objectives.map((obj, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-blue-500">•</span>
                                  <span>{obj}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex gap-3 flex-wrap">
                            <button onClick={() => openResourceModal(step)} className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm font-medium">
                              <Book size={16} />
                              View Resources ({step.resources})
                            </button>
                            {step.status !== 'completed' && (
                              <button className={`flex items-center gap-2 px-4 py-2 ${darkMode ? 'bg-slate-700 text-gray-300' : 'bg-gray-100 text-gray-700'} hover:bg-green-500 hover:text-white rounded-lg text-sm font-medium`}>
                                <Check size={16} />
                                Mark Complete
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
                <h3 className={`font-bold text-lg mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>📊 Progress Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Completed</span>
                    <span className="font-bold text-green-500">{completedSteps}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>In Progress</span>
                    <span className="font-bold text-blue-500">1</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Remaining</span>
                    <span className={`font-bold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{SAMPLE_ROADMAP.length - completedSteps - 1}</span>
                  </div>
                </div>
              </div>

              <div className={`${darkMode ? 'bg-gradient-to-br from-blue-900 to-purple-900' : 'bg-gradient-to-br from-blue-500 to-purple-600'} rounded-xl p-6 text-white`}>
                <h3 className="font-bold text-lg mb-2">💡 Daily Tip</h3>
                <p className="text-blue-100">Practice coding daily for at least 30 minutes to build consistency.</p>
              </div>

              <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
                <h3 className={`font-bold text-lg mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Related Careers</h3>
                <div className="space-y-2">
                  {['DevOps Engineer', 'Data Scientist', 'Mobile Developer'].map(career => (
                    <button key={career} className={`w-full text-left px-3 py-2 ${darkMode ? 'hover:bg-slate-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'} rounded-lg text-sm`}>
                      → {career}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ResourceModal = () => {
    if (!showResourceModal || !selectedStep) return null;

    const getResourceIcon = (type) => {
      switch(type) {
        case 'article': return <FileText className="text-blue-500" size={24} />;
        case 'video': return <Video className="text-red-500" size={24} />;
        case 'pdf': return <Book className="text-orange-500" size={24} />;
        case 'tool': return <Wrench className="text-green-500" size={24} />;
        default: return <FileText size={24} />;
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setShowResourceModal(false)}>
        <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden`} onClick={e => e.stopPropagation()}>
          <div className={`${darkMode ? 'border-slate-700' : 'border-gray-200'} border-b p-6 flex items-center justify-between`}>
            <div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Resources: {selectedStep.title}</h2>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>{selectedStep.resources} curated resources</p>
            </div>
            <button onClick={() => setShowResourceModal(false)} className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              <X size={24} />
            </button>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="flex gap-2 mb-6 flex-wrap">
              {['All', 'Articles', 'Videos', 'PDFs', 'Tools'].map(type => (
                <button key={type} className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  type === 'All' 
                    ? 'bg-blue-500 text-white' 
                    : (darkMode ? 'bg-slate-700 text-gray-300 hover:bg-slate-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')
                }`}>
                  {type}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SAMPLE_RESOURCES.map(resource => (
                <div key={resource.id} className={`${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'} border rounded-lg p-4 hover:shadow-md transition-all`}>
                  <div className="flex items-start gap-3 mb-3">
                    {getResourceIcon(resource.type)}
                    <div className="flex-1">
                      <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>{resource.title}</h4>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>{resource.description}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs px-2 py-1 rounded ${darkMode ? 'bg-slate-600 text-gray-300' : 'bg-white text-gray-700'}`}>{resource.source}</span>
                        <span className="text-xs text-yellow-500">{'⭐'.repeat(resource.rating)}</span>
                        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{resource.difficulty}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {resource.url && (
                      <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm font-medium">
                        Open <ExternalLink size={14} />
                      </button>
                    )}
                    <button className={`px-3 py-2 ${resource.bookmarked ? 'bg-yellow-500 text-white' : (darkMode ? 'bg-slate-600 text-gray-300 border-slate-500' : 'bg-white text-gray-700 border-gray-300')} border rounded-lg hover:bg-yellow-500 hover:text-white text-sm`}>
                      <Bookmark size={16} fill={resource.bookmarked ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ProgressPage = () => (
    <div className={`p-6 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'} min-h-screen`}>
      <div className="max-w-6xl mx-auto">
        <h1 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>My Progress</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Careers Active', value: '3', icon: <BookOpen size={24} /> },
            { label: 'Steps Completed', value: '28', icon: <Check size={24} /> },
            { label: 'Day Streak', value: '🔥 15', icon: null },
            { label: 'Time Invested', value: '45h', icon: <Clock size={24} /> }
          ].map((stat, idx) => (
            <div key={idx} className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
              <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>{stat.icon}</div>
              <div className={`text-3xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
            <h3 className={`font-bold text-lg mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Career Breakdown</h3>
            <div className="space-y-4">
              {SAMPLE_CAREERS.filter(c => c.progress > 0).map(career => (
                <div key={career.id}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {career.icon} {career.title}
                    </span>
                    <span className="text-sm font-bold text-blue-500">{career.progress}%</span>
                  </div>
                  <div className={`w-full ${darkMode ? 'bg-slate-700' : 'bg-gray-200'} rounded-full h-2`}>
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: `${career.progress}%`}}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
            <h3 className={`font-bold text-lg mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recent Activity</h3>
            <div className="space-y-3">
              {[
                { action: 'Completed "Data Structures"', time: '2 hours ago', icon: '✓', color: 'text-green-500' },
                { action: 'Started "React Fundamentals"', time: '1 day ago', icon: '📚', color: 'text-blue-500' },
                { action: 'Completed "HTML & CSS"', time: '2 days ago', icon: '✓', color: 'text-green-500' },
                { action: 'Added "UX Designer" career', time: '3 days ago', icon: '🎨', color: 'text-purple-500' }
              ].map((activity, idx) => (
                <div key={idx} className={`flex items-start gap-3 p-3 ${darkMode ? 'bg-slate-700' : 'bg-gray-50'} rounded-lg`}>
                  <span className={`${activity.color} text-lg`}>{activity.icon}</span>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{activity.action}</p>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
          <h3 className={`font-bold text-lg mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>🏆 Achievements</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🥇', title: 'First Step', desc: 'Complete your first step' },
              { icon: '⭐', title: 'Week Warrior', desc: '7-day streak' },
              { icon: '🔥', title: 'On Fire', desc: '15-day streak' },
              { icon: '🎯', title: 'Focused', desc: 'Complete a career path' }
            ].map((badge, idx) => (
              <div key={idx} className={`${darkMode ? 'bg-slate-700' : 'bg-gray-50'} rounded-lg p-4 text-center`}>
                <div className="text-3xl mb-2">{badge.icon}</div>
                <div className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{badge.title}</div>
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>{badge.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const AdminDashboard = () => (
    <div className={`p-6 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'} min-h-screen`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Admin Dashboard</h1>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium flex items-center gap-2">
            <Plus size={20} />
            Add Career
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Careers', value: '45', action: 'Add' },
            { label: 'Total Students', value: '1,234', action: null },
            { label: 'Total Resources', value: '567', action: 'Add' },
            { label: 'Active Today', value: '89', action: null }
          ].map((stat, idx) => (
            <div key={idx} className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-xl p-6`}>
              <div className={`text-3xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-3`}>{stat.label}</div>
              {stat.action && (
                <button className="text-blue-500 text-sm font-medium hover:text-blue-600">+ {stat.action}</button>
              )}
            </div>
          ))}
        </div>

        <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-xl p-6 mb-8`}>
          <h3 className={`font-bold text-lg mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Most Popular Careers</h3>
          <div className="space-y-3">
            {[
              { name: 'Software Engineer', count: 345, width: 100 },
              { name: 'Data Scientist', count: 234, width: 68 },
              { name: 'UX Designer', count: 189, width: 55 },
              { name: 'Product Manager', count: 156, width: 45 }
            ].map((career, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{career.name}</span>
                  <span className={`text-sm font-bold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{career.count}</span>
                </div>
                <div className={`w-full ${darkMode ? 'bg-slate-700' : 'bg-gray-200'} rounded-full h-2`}>
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: `${career.width}%`}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-xl overflow-hidden`}>
          <div className={`p-6 border-b ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
            <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recent Activity</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`${darkMode ? 'bg-slate-700' : 'bg-gray-50'}`}>
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase`}>Career</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase`}>Action</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase`}>By</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase`}>Date</th>
                  <th className={`px-6 py-3 text-right text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase`}>Actions</th>
                </tr>
              </thead>
              <tbody className={`${darkMode ? 'divide-slate-700' : 'divide-gray-200'} divide-y`}>
                {[
                  { career: 'Blockchain Developer', action: 'Added', by: 'Admin1', date: 'Today' },
                  { career: 'Digital Marketing', action: 'Updated', by: 'Admin2', date: 'Today' },
                  { career: 'Nursing', action: 'Added', by: 'Admin1', date: 'Yesterday' }
                ].map((row, idx) => (
                  <tr key={idx} className={`${darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-50'}`}>
                    <td className={`px-6 py-4 text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{row.career}</td>
                    <td className={`px-6 py-4 text-sm`}>
                      <span className={`px-2 py-1 rounded ${row.action === 'Added' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                        {row.action}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{row.by}</td>
                    <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{row.date}</td>
                    <td className="px-6 py-4 text-right text-sm">
                      <button className="text-blue-500 hover:text-blue-600 mr-3">
                        <Edit2 size={16} />
                      </button>
                      <button className="text-red-500 hover:text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <Navbar />
      {currentPage === 'dashboard' && (userRole === 'student' ? <StudentDashboard /> : <AdminDashboard />)}
      {currentPage === 'roadmap' && <RoadmapViewer />}
      {currentPage === 'progress' && <ProgressPage />}
      <ResourceModal />
    </div>
  );
}
