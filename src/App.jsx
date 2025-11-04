// src/App.jsx
import React, { useEffect, useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, Link, useParams } from "react-router-dom";
import {
  Home, BarChart3, Bell, Sun, Moon, Shield, Search, Filter, Clock, Users, BookOpen,
  Award, Calendar, Plus, Edit2, Trash2, Check, ExternalLink, Bookmark, Book, Video, FileText, Wrench,
  Menu, X, ChevronRight, ChevronDown, LogOut
} from "lucide-react";

import { loginUser, registerUser, fetchCareers, addCareer } from "./api.js";

/* -----------------------------
   Small presentational helpers
   ----------------------------- */
const Button = ({ children, className = "", ...props }) => (
  <button {...props} className={`px-4 py-2 rounded-md font-medium ${className}`}>{children}</button>
);

const Input = ({ label, value, onChange, type = "text", placeholder = "" }) => (
  <div className="mb-3">
    {label && <label className="block text-sm mb-1">{label}</label>}
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full border rounded px-3 py-2"
    />
  </div>
);

/* -----------------------------
   Auth pages
   ----------------------------- */
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e?.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await loginUser(email, password); // expects { token, user }
      if (data?.token) {
        localStorage.setItem("token", data.token);
        onLogin(data.user || { email });
        navigate("/dashboard");
      } else {
        throw new Error("No token returned");
      }
    } catch (err) {
      setError(err?.message || err?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md bg-white border rounded-lg p-6 shadow">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <div className="text-red-600 mb-3">{error}</div>}
        <form onSubmit={submit}>
          <Input label="Email" type="email" value={email} onChange={setEmail} />
          <Input label="Password" type="password" value={password} onChange={setPassword} />
          <div className="flex items-center gap-3">
            <Button type="submit" className="bg-blue-600 text-white" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
            <Button type="button" onClick={() => navigate("/register")} className="bg-gray-100">Register</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e?.preventDefault();
    setError(""); setOk(""); setLoading(true);
    try {
      const res = await registerUser({ name, email, password, role });
      setOk("Registered successfully — redirecting to login...");
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      setError(err?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md bg-white border rounded-lg p-6 shadow">
        <h2 className="text-2xl font-bold mb-4">Create account</h2>
        {error && <div className="text-red-600 mb-3">{error}</div>}
        {ok && <div className="text-green-600 mb-3">{ok}</div>}
        <form onSubmit={submit}>
          <Input label="Full name" value={name} onChange={setName} />
          <Input label="Email" type="email" value={email} onChange={setEmail} />
          <Input label="Password" type="password" value={password} onChange={setPassword} />
          <div className="mb-3">
            <label className="block text-sm mb-1">Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full border rounded px-3 py-2">
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <Button type="submit" className="bg-green-600 text-white" disabled={loading}>{loading ? "Registering..." : "Register"}</Button>
            <Button type="button" onClick={() => navigate("/")} className="bg-gray-100">Back to Login</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* -----------------------------
   ProtectedRoute (simple)
   ----------------------------- */
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/" replace />;
  return children;
}

/* -----------------------------
   Navbar
   ----------------------------- */
function Navbar({ user, onLogout, dark, setDark }) {
  const navigate = useNavigate();
  return (
    <header className={`flex items-center justify-between px-6 py-3 border-b ${dark ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-gray-200"}`}>
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 rounded bg-blue-600 text-white flex items-center justify-center font-bold">C</div>
        <div>
          <div className="font-bold">Career Guidance</div>
          <div className="text-xs text-gray-400">Personalized roadmaps</div>
        </div>
        <nav className="hidden md:flex gap-3 ml-6">
          <button onClick={() => navigate("/dashboard")} className="flex items-center gap-2 text-sm hover:text-blue-600"><Home size={16} /> Dashboard</button>
          <button onClick={() => navigate("/progress")} className="flex items-center gap-2 text-sm hover:text-blue-600"><BarChart3 size={16} /> Progress</button>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <button title="Notifications" className="p-2 rounded hover:bg-gray-100" onClick={() => alert("No new notifications")}>
          <Bell size={18} />
        </button>
        <button onClick={() => setDark(!dark)} className="p-2 rounded hover:bg-gray-100">{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
        <div className="hidden md:flex items-center gap-2">
          <div className="text-sm">{user?.email ?? "User"}</div>
          <button onClick={onLogout} className="px-3 py-1 bg-red-500 text-white rounded text-sm flex items-center gap-2"><LogOut size={14} /> Logout</button>
        </div>
        <div className="md:hidden">
          <Menu size={20} />
        </div>
      </div>
    </header>
  );
}

/* -----------------------------
   Dashboard & Cards
   ----------------------------- */
function CareerCard({ career, onOpen, onResources }) {
  return (
    <div className="border rounded-lg p-4 hover:shadow transition">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-lg font-semibold">{career.title}</div>
          <div className="text-xs text-gray-500">{career.category}</div>
        </div>
        <div className="text-sm text-right">
          <div>{career.duration}</div>
          <div className="text-xs text-gray-400">{career.steps} steps</div>
        </div>
      </div>
      <p className="text-sm mt-3 text-gray-600">{career.description}</p>

      <div className="mt-4 flex gap-2">
        <Button onClick={() => onOpen(career)} className="bg-blue-600 text-white">Open Roadmap</Button>
        <Button onClick={() => onResources(career)} className="bg-gray-100">Resources</Button>
      </div>
    </div>
  );
}

function DashboardPage({ dark }) {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [globalError, setGlobalError] = useState(null);

  const load = async () => {
    setLoading(true);
    setGlobalError(null);
    try {
      const data = await fetchCareers();
      const arr = Array.isArray(data) ? data : (data.careers ?? []);
      setCareers(arr);
    } catch (err) {
      setGlobalError(err?.message || "Failed to load careers");
      setCareers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = careers.filter(c =>
    (filter === "All" || c.category === filter) &&
    (query.trim() === "" || c.title.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className={`p-6 ${dark ? "bg-slate-900 text-white" : "bg-slate-50 text-black"} min-h-screen`}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Explore careers</h1>
          <p className="text-sm text-gray-500">Choose a path and start learning</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => navigate("/add")} className="bg-green-600 text-white">Add Career</Button>
          <Button onClick={load} className="bg-gray-100">Refresh</Button>
        </div>
      </div>

      <div className="mb-4 flex gap-3">
        <div className={`flex items-center gap-2 p-2 border rounded ${dark ? "bg-slate-800 border-slate-700" : "bg-white"}`}>
          <Search size={16} className="text-gray-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search careers..." className={`outline-none ${dark ? "bg-slate-800 text-white" : "bg-white"}`} />
        </div>
        <div>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border rounded p-2 bg-white">
            <option value="All">All</option>
            {Array.from(new Set(careers.map(c => c.category))).map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
      </div>

      {globalError && <div className="mb-4 text-red-600">{globalError}</div>}

      {loading ? (
        <div>Loading careers...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(c => <CareerCard key={c._id || c.id || c.title} career={c} onOpen={(x) => navigate(`/careers/${encodeURIComponent(c._id || c.id)}`)} onResources={(x) => navigate(`/careers/${encodeURIComponent(c._id || c.id)}/resources`)} />)}
        </div>
      )}
    </div>
  );
}

/* -----------------------------
   Add Career Page
   ----------------------------- */
function AddCareerPage({ onCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [steps, setSteps] = useState(6);
  const [duration, setDuration] = useState("3 months");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e?.preventDefault();
    setErr("");
    if (!title || !description) {
      setErr("Title and description required");
      return;
    }
    setLoading(true);
    try {
      await addCareer({ title, description, category, steps, duration });
      onCreated?.();
      navigate("/dashboard");
    } catch (err) {
      setErr(err?.message || "Failed to add career");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add New Career</h2>
      {err && <div className="text-red-600 mb-3">{err}</div>}
      <form onSubmit={submit} className="bg-white p-4 border rounded">
        <Input label="Title" value={title} onChange={setTitle} />
        <Input label="Category" value={category} onChange={setCategory} />
        <Input label="Duration" value={duration} onChange={setDuration} />
        <Input label="Steps" type="number" value={steps} onChange={(v) => setSteps(Number(v))} />
        <div className="mb-3">
          <label className="block text-sm mb-1">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border rounded px-3 py-2" rows="6" />
        </div>
        <div className="flex gap-2">
          <Button type="submit" className="bg-blue-600 text-white" disabled={loading}>{loading ? "Saving..." : "Save"}</Button>
          <Button type="button" onClick={() => navigate("/dashboard")} className="bg-gray-100">Cancel</Button>
        </div>
      </form>
    </div>
  );
}

/* -----------------------------
   Career Detail (Roadmap + Resources)
   ----------------------------- */
function CareerDetail() {
  const { id } = useParams();
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [globalErr, setGlobalErr] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setGlobalErr(null);
      try {
        const all = await fetchCareers();
        const list = Array.isArray(all) ? all : (all.careers ?? []);
        const found = list.find(c => (c._id && c._id === id) || (c.id && String(c.id) === id) || encodeURIComponent(c._id || c.id) === id);
        if (!found) {
          // try matching by title decode
          const byTitle = list.find(c => encodeURIComponent(c.title) === id);
          setCareer(byTitle || null);
        } else {
          setCareer(found);
        }
      } catch (err) {
        setGlobalErr(err?.message || "Failed to load career");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (globalErr) return <div className="p-6 text-red-600">{globalErr}</div>;
  if (!career) return <div className="p-6">Career not found</div>;

  const roadmap = career.roadmap && Array.isArray(career.roadmap) ? career.roadmap : [
    { id: 1, title: "Intro", description: "Get started" },
    { id: 2, title: "Core Concepts", description: "Learn fundamentals" },
    { id: 3, title: "Projects", description: "Build projects" },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button onClick={() => window.history.back()} className="mb-4 text-sm underline">← Back</button>
      <div className="border rounded p-4 bg-white">
        <h2 className="text-2xl font-bold">{career.title}</h2>
        <p className="text-sm text-gray-500 mb-4">{career.category} • {career.duration} • {career.steps} steps</p>
        <p className="mb-4">{career.description}</p>

        <h3 className="font-semibold mb-2">Roadmap</h3>
        <div className="space-y-3">
          {roadmap.map(step => (
            <div key={step.id} className="p-3 border rounded bg-gray-50">
              <div className="flex justify-between">
                <div className="font-semibold">{step.title}</div>
                <div className="text-xs text-gray-400">Step {step.id}</div>
              </div>
              <div className="text-sm text-gray-600 mt-1">{step.description}</div>
            </div>
          ))}
        </div>

        <h3 className="font-semibold mt-6 mb-2">Resources</h3>
        <div className="space-y-2">
          {(career.resources && career.resources.length > 0) ? career.resources.map((r, i) => (
            <div key={i} className="flex items-center justify-between p-2 border rounded">
              <div>
                <div className="font-medium">{r.title || r.name || `Resource ${i+1}`}</div>
                {r.description && <div className="text-xs text-gray-500">{r.description}</div>}
              </div>
              <div className="flex gap-2">
                {r.url ? <a className="text-sm bg-blue-600 text-white px-3 py-1 rounded" href={r.url} target="_blank" rel="noreferrer">Open</a> : <span className="text-sm px-3 py-1 rounded bg-gray-100">No link</span>}
                <button className="text-sm px-3 py-1 bg-gray-100 rounded">Save</button>
              </div>
            </div>
          )) : (
            <div className="text-sm text-gray-500">No resources added yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}

/* -----------------------------
   Progress & Admin placeholder
   ----------------------------- */
function ProgressPage() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Progress</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded">Completed: <strong>12</strong></div>
        <div className="p-4 border rounded">In Progress: <strong>2</strong></div>
        <div className="p-4 border rounded">Streak: <strong>7 days</strong></div>
      </div>
    </div>
  );
}

function AdminDashboard() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Admin</h2>
      <div className="p-4 border rounded">Admin tools placeholder (manage careers & resources)</div>
    </div>
  );
}

/* -----------------------------
   Root App
   ----------------------------- */
export default function App() {
  const [user, setUser] = useState(null);
  const [dark, setDark] = useState(false);
  const navigate = useNavigate ? null : null; // noop in main body, we use Router below

  useEffect(() => {
    // Try restore user from token presence
    const token = localStorage.getItem("token");
    if (token) {
      // Optionally you could call an endpoint to validate token / fetch user
      setUser({ email: "you@example.com" });
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    // navigate to login - but since this component is nested under Router below, we'll use <Navigate />
    window.location.href = "/"; // quick simple way to return to login route
  };

  return (
    <Router>
      <div className={`${dark ? "bg-slate-900 text-white" : "bg-gray-50 text-black"} min-h-screen`}>
        {/* For logged-in routes we show Navbar */}
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={(u) => setUser(u)} />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Navbar user={user} onLogout={handleLogout} dark={dark} setDark={setDark} />
              <DashboardPage dark={dark} />
            </ProtectedRoute>
          } />

          <Route path="/add" element={
            <ProtectedRoute>
              <Navbar user={user} onLogout={handleLogout} dark={dark} setDark={setDark} />
              <AddCareerPage onCreated={() => {/* handled by navigate inside AddCareerPage */}} />
            </ProtectedRoute>
          } />

          <Route path="/careers/:id" element={
            <ProtectedRoute>
              <Navbar user={user} onLogout={handleLogout} dark={dark} setDark={setDark} />
              <CareerDetail />
            </ProtectedRoute>
          } />

          <Route path="/progress" element={
            <ProtectedRoute>
              <Navbar user={user} onLogout={handleLogout} dark={dark} setDark={setDark} />
              <ProgressPage />
            </ProtectedRoute>
          } />

          <Route path="/admin" element={
            <ProtectedRoute>
              <Navbar user={user} onLogout={handleLogout} dark={dark} setDark={setDark} />
              <AdminDashboard />
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} replace />} />
        </Routes>
      </div>
    </Router>
  );
}
