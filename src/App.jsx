import React, { useState } from "react";
import {
  Home, BarChart3, Sun, Moon, Search, BookOpen, FileText, Target, Users,
  LogOut, ChevronRight, TrendingUp, Clock, Award, ExternalLink, Check, X
} from "lucide-react";
// Mock career data with complete roadmaps and resources
const INITIAL_CAREERS = [
  {
    id: "web-dev",
    title: "Full Stack Web Developer",
    category: "Technology",
    duration: "6 months",
    steps: 8,
    description: "Master modern web development with HTML, CSS, JavaScript, React, Node.js, and databases. Build real-world applications and launch your tech career.",
    difficulty: "Beginner to Advanced",
    salary: "$70k - $120k/year",
    roadmap: [
      { id: 1, title: "HTML & CSS Basics", description: "Learn the foundation of web pages with HTML structure and CSS styling", duration: "2 weeks", completed: false },
      { id: 2, title: "JavaScript Fundamentals", description: "Master JavaScript basics, DOM manipulation, and ES6+ features", duration: "3 weeks", completed: false },
      { id: 3, title: "React.js Framework", description: "Build interactive UIs with React components, hooks, and state management", duration: "4 weeks", completed: false },
      { id: 4, title: "Backend with Node.js", description: "Create REST APIs with Express.js and understand server-side programming", duration: "3 weeks", completed: false },
      { id: 5, title: "Database Management", description: "Work with MongoDB and SQL databases for data persistence", duration: "3 weeks", completed: false },
      { id: 6, title: "Authentication & Security", description: "Implement JWT, OAuth, and secure your applications", duration: "2 weeks", completed: false },
      { id: 7, title: "Build Portfolio Projects", description: "Create 3-5 full-stack projects to showcase your skills", duration: "5 weeks", completed: false },
      { id: 8, title: "Deploy & Job Hunt", description: "Deploy apps to production and prepare for technical interviews", duration: "2 weeks", completed: false }
    ],
    resources: [
      { title: "freeCodeCamp Web Development", type: "course", url: "https://www.freecodecamp.org", description: "Free comprehensive web development curriculum" },
      { title: "MDN Web Docs", type: "documentation", url: "https://developer.mozilla.org", description: "Complete web development reference" },
      { title: "The Odin Project", type: "course", url: "https://www.theodinproject.com", description: "Free full-stack curriculum with projects" },
      { title: "React Official Tutorial", type: "tutorial", url: "https://react.dev", description: "Learn React from the official documentation" },
      { title: "Node.js Documentation", type: "documentation", url: "https://nodejs.org", description: "Official Node.js guides and API reference" }
    ]
  },
  {
    id: "data-science",
    title: "Data Scientist",
    category: "Technology",
    duration: "8 months",
    steps: 7,
    description: "Learn Python, statistics, machine learning, and data visualization. Analyze data and build predictive models for data-driven decision making.",
    difficulty: "Intermediate",
    salary: "$85k - $150k/year",
    roadmap: [
      { id: 1, title: "Python Programming", description: "Master Python syntax, data structures, and object-oriented programming", duration: "3 weeks", completed: false },
      { id: 2, title: "Statistics & Mathematics", description: "Learn probability, statistical inference, and linear algebra", duration: "4 weeks", completed: false },
      { id: 3, title: "Data Analysis with Pandas", description: "Manipulate and analyze data using Pandas and NumPy", duration: "3 weeks", completed: false },
      { id: 4, title: "Data Visualization", description: "Create compelling visualizations with Matplotlib and Seaborn", duration: "2 weeks", completed: false },
      { id: 5, title: "Machine Learning Basics", description: "Understand supervised and unsupervised learning algorithms", duration: "5 weeks", completed: false },
      { id: 6, title: "Deep Learning & Neural Networks", description: "Build neural networks with TensorFlow and PyTorch", duration: "4 weeks", completed: false },
      { id: 7, title: "Real-World Projects", description: "Complete Kaggle competitions and build a portfolio", duration: "6 weeks", completed: false }
    ],
    resources: [
      { title: "Kaggle Learn", type: "course", url: "https://www.kaggle.com/learn", description: "Free micro-courses on data science topics" },
      { title: "Python for Data Analysis", type: "book", url: "https://wesmckinney.com/book/", description: "Comprehensive guide by Wes McKinney" },
      { title: "Coursera Data Science", type: "course", url: "https://www.coursera.org", description: "Specialization from Johns Hopkins University" },
      { title: "Fast.ai", type: "course", url: "https://www.fast.ai", description: "Practical deep learning for coders" },
      { title: "Scikit-learn Documentation", type: "documentation", url: "https://scikit-learn.org", description: "Machine learning library reference" }
    ]
  },
  {
    id: "financial-analyst",
    title: "Financial Analyst",
    category: "Finance",
    duration: "6 months",
    steps: 7,
    description: "Analyze financial statements, forecast company performance, and support investment decisions using financial models and data visualization tools.",
    difficulty: "Intermediate",
    salary: "$60k - $100k/year",
    roadmap: [
      { id: 1, title: "Finance Fundamentals", description: "Understand accounting, economics, and financial principles.", duration: "2 weeks", completed: false },
      { id: 2, title: "Excel & Data Analysis", description: "Learn Excel modeling, data visualization, and basic analytics.", duration: "2 weeks", completed: false },
      { id: 3, title: "Financial Modelling", description: "Build valuation models and forecasting spreadsheets.", duration: "3 weeks", completed: false },
      { id: 4, title: "Corporate Finance", description: "Learn capital budgeting, risk management, and portfolio theory.", duration: "3 weeks", completed: false },
      { id: 5, title: "Investment Analysis", description: "Study stock valuation, bonds, and equity research.", duration: "3 weeks", completed: false },
      { id: 6, title: "Advanced Tools", description: "Use Power BI, Tableau, and Python for financial data.", duration: "3 weeks", completed: false },
      { id: 7, title: "Projects & Portfolio", description: "Build real-world finance projects and reports.", duration: "2 weeks", completed: false }
    ],
    resources: [
      { title: "Coursera – Financial Analysis Specialization", type: "course", url: "https://www.coursera.org/specializations/financial-analysis", description: "Master financial modeling and valuation skills." },
      { title: "Investopedia – Finance Tutorials", type: "website", url: "https://www.investopedia.com", description: "Extensive finance and investing guides." },
      { title: "CFI – Financial Modelling & Valuation", type: "course", url: "https://courses.corporatefinanceinstitute.com/", description: "Professional finance certification courses." }
    ]
  },

  {
    id: "investment-banker",
    title: "Investment Banker",
    category: "Finance",
    duration: "9 months",
    steps: 8,
    description: "Assist corporations in raising capital, advising on M&A deals, and analyzing market trends to drive financial growth.",
    difficulty: "Advanced",
    salary: "$90k - $150k/year",
    roadmap: [
      { id: 1, title: "Accounting & Financial Statements", description: "Understand income statements, balance sheets, and cash flow.", duration: "3 weeks", completed: false },
      { id: 2, title: "Corporate Valuation", description: "Learn DCF, comparable company analysis, and precedent transactions.", duration: "3 weeks", completed: false },
      { id: 3, title: "Mergers & Acquisitions", description: "Explore M&A process, deal structuring, and negotiations.", duration: "4 weeks", completed: false },
      { id: 4, title: "Pitch Books & Client Reports", description: "Create professional reports for investors and executives.", duration: "3 weeks", completed: false },
      { id: 5, title: "Excel Modelling", description: "Advanced Excel and VBA for financial modeling.", duration: "2 weeks", completed: false },
      { id: 6, title: "Internship / Projects", description: "Simulate investment bank case studies.", duration: "4 weeks", completed: false },
      { id: 7, title: "Networking & Job Prep", description: "Build a LinkedIn profile and prepare for interviews.", duration: "2 weeks", completed: false },
      { id: 8, title: "Final Assessment", description: "Complete a valuation project and submit.", duration: "2 weeks", completed: false }
    ],
    resources: [
      { title: "Wall Street Oasis", type: "forum", url: "https://www.wallstreetoasis.com/", description: "Community for finance professionals and students." },
      { title: "CFI Investment Banking Course", type: "course", url: "https://courses.corporatefinanceinstitute.com/", description: "Professional investment banking certification." },
      { title: "Breaking Into Wall Street", type: "course", url: "https://breakingintowallstreet.com/", description: "In-depth training for aspiring bankers." }
    ]
  },

  {
    id: "quant-developer",
    title: "Quant Developer",
    category: "Fintech",
    duration: "10 months",
    steps: 8,
    description: "Design trading algorithms, optimize portfolios, and use Python/C++ to implement quantitative models in financial markets.",
    difficulty: "Advanced",
    salary: "$100k - $180k/year",
    roadmap: [
      { id: 1, title: "Mathematics & Probability", description: "Master linear algebra, calculus, and probability theory.", duration: "3 weeks", completed: false },
      { id: 2, title: "Programming Foundations", description: "Learn Python and C++ for quantitative analysis.", duration: "4 weeks", completed: false },
      { id: 3, title: "Data Structures & Algorithms", description: "Optimize computational models and logic efficiency.", duration: "4 weeks", completed: false },
      { id: 4, title: "Financial Engineering", description: "Understand derivatives, options, and risk models.", duration: "4 weeks", completed: false },
      { id: 5, title: "Machine Learning for Finance", description: "Apply regression, classification, and reinforcement learning to trading.", duration: "5 weeks", completed: false },
      { id: 6, title: "Backtesting Systems", description: "Simulate and test strategies using financial data.", duration: "3 weeks", completed: false },
      { id: 7, title: "Portfolio Optimization", description: "Use Markowitz models and risk-return tradeoff.", duration: "2 weeks", completed: false },
      { id: 8, title: "Deployment", description: "Automate models and integrate APIs for trading.", duration: "2 weeks", completed: false }
    ],
    resources: [
      { title: "QuantStart", type: "website", url: "https://www.quantstart.com/", description: "Quant tutorials and career advice." },
      { title: "EP Chan’s Blog", type: "blog", url: "https://epchan.blogspot.com/", description: "Insights into algorithmic trading and quantitative finance." },
      { title: "edX Computational Finance", type: "course", url: "https://online.edx.org/course/computational-finance", description: "University-level quantitative finance content." }
    ]
  },

  {
    id: "hr-manager",
    title: "HR Manager",
    category: "Business",
    duration: "4 months",
    steps: 6,
    description: "Lead recruitment, employee engagement, and compliance strategies to build a productive workforce.",
    difficulty: "Beginner to Intermediate",
    salary: "$50k - $90k/year",
    roadmap: [
      { id: 1, title: "HR Foundations", description: "Learn the role and responsibilities of HR professionals.", duration: "2 weeks", completed: false },
      { id: 2, title: "Recruitment & Onboarding", description: "Manage hiring processes, interviews, and onboarding.", duration: "2 weeks", completed: false },
      { id: 3, title: "Performance Management", description: "Set KPIs and conduct appraisals.", duration: "2 weeks", completed: false },
      { id: 4, title: "Employee Relations", description: "Handle grievances and improve workplace culture.", duration: "2 weeks", completed: false },
      { id: 5, title: "HR Analytics", description: "Use data to make workforce decisions.", duration: "2 weeks", completed: false },
      { id: 6, title: "Training & Development", description: "Plan learning programs and career growth paths.", duration: "2 weeks", completed: false }
    ],
    resources: [
      { title: "Coursera – Human Resource Management", type: "course", url: "https://www.coursera.org/specializations/human-resource-management", description: "Comprehensive HR specialization." },
      { title: "LinkedIn Learning – HR Foundations", type: "course", url: "https://www.linkedin.com/learning/topics/human-resources", description: "Quick and practical HR lessons." },
      { title: "SHRM – HR Resources", type: "website", url: "https://www.shrm.org/", description: "Official HR standards and best practices." }
    ]
  },

  {
    id: "chartered-accountant",
    title: "Chartered Accountant (CA)",
    category: "Accounting",
    duration: "3 years",
    steps: 10,
    description: "Specialize in taxation, auditing, and financial management to provide advisory and compliance services.",
    difficulty: "Advanced",
    salary: "$80k - $150k/year",
    roadmap: [
      { id: 1, title: "CA Foundation", description: "Learn basic accounting, economics, and business law.", duration: "6 months", completed: false },
      { id: 2, title: "CA Intermediate", description: "Master corporate accounting, auditing, and taxation.", duration: "1 year", completed: false },
      { id: 3, title: "Articleship Training", description: "Gain hands-on industry experience.", duration: "1 year", completed: false },
      { id: 4, title: "Final Preparation", description: "Prepare for ICAI final exams.", duration: "6 months", completed: false },
      { id: 5, title: "Specialization", description: "Choose a field: taxation, audit, or finance.", duration: "3 months", completed: false },
      { id: 6, title: "Soft Skills", description: "Enhance communication and presentation skills.", duration: "2 months", completed: false },
      { id: 7, title: "Industry Tools", description: "Learn Tally, QuickBooks, and ERP systems.", duration: "3 months", completed: false },
      { id: 8, title: "Compliance", description: "Understand GST, Income Tax, and Corporate Laws.", duration: "3 months", completed: false },
      { id: 9, title: "Mock Tests", description: "Take practice exams to gauge readiness.", duration: "2 months", completed: false },
      { id: 10, title: "Career Placement", description: "Apply for roles in firms and corporates.", duration: "2 months", completed: false }
    ],
    resources: [
      { title: "ICAI Official Website", type: "website", url: "https://www.icai.org/", description: "Official source for CA syllabus and updates." },
      { title: "CAclubindia", type: "community", url: "https://www.caclubindia.com/", description: "Discussion forum for CA students and professionals." },
      { title: "Unacademy CA Courses", type: "course", url: "https://unacademy.com/goal/ca-foundation", description: "CA Foundation and Intermediate prep courses." }
    ]
  }
  {
    id: "digital-marketing",
    title: "Digital Marketing Specialist",
    category: "Marketing",
    duration: "4 months",
    steps: 6,
    description: "Master SEO, social media marketing, content creation, email campaigns, and analytics. Drive business growth through digital channels.",
    difficulty: "Beginner",
    salary: "$45k - $85k/year",
    roadmap: [
      { id: 1, title: "Marketing Fundamentals", description: "Understand target audiences, buyer personas, and marketing funnels", duration: "2 weeks", completed: false },
      { id: 2, title: "SEO & Content Marketing", description: "Learn keyword research, on-page SEO, and content strategy", duration: "3 weeks", completed: false },
      { id: 3, title: "Social Media Marketing", description: "Master Facebook, Instagram, LinkedIn, and Twitter advertising", duration: "3 weeks", completed: false },
      { id: 4, title: "Google Ads & PPC", description: "Create and optimize paid advertising campaigns", duration: "2 weeks", completed: false },
      { id: 5, title: "Email Marketing & Automation", description: "Build email sequences and marketing automation workflows", duration: "2 weeks", completed: false },
      { id: 6, title: "Analytics & Reporting", description: "Track KPIs with Google Analytics and create data-driven reports", duration: "4 weeks", completed: false }
    ],
    resources: [
      { title: "Google Digital Garage", type: "course", url: "https://learndigital.withgoogle.com", description: "Free digital marketing certification" },
      { title: "HubSpot Academy", type: "course", url: "https://academy.hubspot.com", description: "Free marketing and sales courses" },
      { title: "Moz SEO Learning Center", type: "tutorial", url: "https://moz.com/learn/seo", description: "Complete SEO guide from Moz" },
      { title: "Facebook Blueprint", type: "course", url: "https://www.facebook.com/business/learn", description: "Official Facebook advertising training" },
      { title: "Neil Patel Blog", type: "blog", url: "https://neilpatel.com/blog", description: "Digital marketing tips and strategies" }
    ]
  },
  {
    id: "ux-ui-design",
    title: "UX/UI Designer",
    category: "Design",
    duration: "5 months",
    steps: 7,
    description: "Create beautiful and intuitive user experiences. Learn user research, wireframing, prototyping, and design systems using Figma and Adobe XD.",
    difficulty: "Beginner to Intermediate",
    salary: "$60k - $110k/year",
    roadmap: [
      { id: 1, title: "Design Principles", description: "Learn color theory, typography, layout, and visual hierarchy", duration: "2 weeks", completed: false },
      { id: 2, title: "User Research Methods", description: "Conduct interviews, surveys, and usability testing", duration: "3 weeks", completed: false },
      { id: 3, title: "Wireframing & Prototyping", description: "Create low and high-fidelity prototypes in Figma", duration: "3 weeks", completed: false },
      { id: 4, title: "UI Design & Design Systems", description: "Build consistent component libraries and style guides", duration: "4 weeks", completed: false },
      { id: 5, title: "Interaction Design", description: "Design animations, micro-interactions, and user flows", duration: "2 weeks", completed: false },
      { id: 6, title: "Mobile & Responsive Design", description: "Design for multiple devices and screen sizes", duration: "3 weeks", completed: false },
      { id: 7, title: "Portfolio Development", description: "Build a stunning portfolio with case studies", duration: "3 weeks", completed: false }
    ],
    resources: [
      { title: "Google UX Design Certificate", type: "course", url: "https://grow.google/uxdesign", description: "Professional certificate program" },
      { title: "Figma Community", type: "tutorial", url: "https://www.figma.com/community", description: "Free design resources and templates" },
      { title: "Nielsen Norman Group", type: "blog", url: "https://www.nngroup.com/articles", description: "UX research and best practices" },
      { title: "Refactoring UI", type: "book", url: "https://www.refactoringui.com", description: "Design tips for developers" },
      { title: "Laws of UX", type: "reference", url: "https://lawsofux.com", description: "Psychology principles for designers" }
    ]
  },
  {
    id: "cyber-security",
    title: "Cybersecurity Analyst",
    category: "Technology",
    duration: "7 months",
    steps: 8,
    description: "Protect systems and networks from cyber threats. Learn ethical hacking, network security, incident response, and security best practices.",
    difficulty: "Intermediate to Advanced",
    salary: "$75k - $130k/year",
    roadmap: [
      { id: 1, title: "Networking Fundamentals", description: "Understand TCP/IP, DNS, firewalls, and network protocols", duration: "3 weeks", completed: false },
      { id: 2, title: "Linux & Command Line", description: "Master Linux systems and bash scripting", duration: "2 weeks", completed: false },
      { id: 3, title: "Security Basics", description: "Learn cryptography, authentication, and access control", duration: "3 weeks", completed: false },
      { id: 4, title: "Ethical Hacking", description: "Practice penetration testing and vulnerability assessment", duration: "4 weeks", completed: false },
      { id: 5, title: "Network Security", description: "Configure VPNs, IDS/IPS, and secure network architecture", duration: "3 weeks", completed: false },
      { id: 6, title: "Incident Response", description: "Handle security breaches and forensic analysis", duration: "3 weeks", completed: false },
      { id: 7, title: "Security Tools", description: "Use Wireshark, Metasploit, Nmap, and Burp Suite", duration: "4 weeks", completed: false },
      { id: 8, title: "Certifications & Practice", description: "Prepare for Security+, CEH, or CISSP certifications", duration: "6 weeks", completed: false }
    ],
    resources: [
      { title: "TryHackMe", type: "platform", url: "https://tryhackme.com", description: "Hands-on cybersecurity training" },
      { title: "Hack The Box", type: "platform", url: "https://www.hackthebox.com", description: "Penetration testing labs" },
      { title: "OWASP Top 10", type: "reference", url: "https://owasp.org/www-project-top-ten", description: "Web security vulnerabilities" },
      { title: "Cybrary", type: "course", url: "https://www.cybrary.it", description: "Free cybersecurity courses" },
      { title: "Professor Messer", type: "video", url: "https://www.professormesser.com", description: "Free Security+ training videos" }
    ]
  },
  {
    id: "content-writing",
    title: "Content Writer & Copywriter",
    category: "Creative",
    duration: "3 months",
    steps: 5,
    description: "Craft compelling content for blogs, websites, ads, and social media. Learn SEO writing, storytelling, and persuasive copywriting techniques.",
    difficulty: "Beginner",
    salary: "$40k - $75k/year",
    roadmap: [
      { id: 1, title: "Writing Fundamentals", description: "Master grammar, style, tone, and clarity in writing", duration: "2 weeks", completed: false },
      { id: 2, title: "Content Strategy", description: "Plan content calendars and understand audience needs", duration: "2 weeks", completed: false },
      { id: 3, title: "SEO Writing", description: "Write content optimized for search engines", duration: "3 weeks", completed: false },
      { id: 4, title: "Copywriting Techniques", description: "Learn persuasive writing for ads, emails, and sales pages", duration: "3 weeks", completed: false },
      { id: 5, title: "Portfolio & Freelancing", description: "Build a portfolio and find clients on platforms like Upwork", duration: "2 weeks", completed: false }
    ],
    resources: [
      { title: "Copyblogger", type: "blog", url: "https://copyblogger.com", description: "Content marketing and copywriting tips" },
      { title: "Hemingway Editor", type: "tool", url: "https://hemingwayapp.com", description: "Improve writing clarity and readability" },
      { title: "Grammarly", type: "tool", url: "https://www.grammarly.com", description: "Grammar and writing assistant" },
      { title: "Everybody Writes", type: "book", url: "https://annhandley.com", description: "Content creation guide by Ann Handley" },
      { title: "Upwork", type: "platform", url: "https://www.upwork.com", description: "Find freelance writing jobs" }
    ]
  }
];

// Helper Components
const Button = ({ children, className = "", ...props }) => (
  <button {...props} className={`px-4 py-2 rounded-lg font-medium transition-all ${className}`}>
    {children}
  </button>
);

const Input = ({ label, value, onChange, type = "text", placeholder = "" }) => (
  <div className="mb-3">
    {label && <label className="block text-sm font-medium mb-1">{label}</label>}
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

// Auth Pages
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e?.preventDefault();
    if (email && password) {
      onLogin({ email, name: email.split('@')[0] });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-8 shadow-xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Target className="text-white" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Login to continue your learning journey</p>
        </div>
        <form onSubmit={submit}>
          <Input label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
          <Input label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" />
          <div className="mt-6">
            <Button type="submit" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 w-full py-3">
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Navbar
function Navbar({ user, onLogout, dark, setDark, currentPage, setCurrentPage }) {
  return (
    <header className={`sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b backdrop-blur-lg ${dark ? "bg-slate-900/95 border-slate-800 text-white" : "bg-white/95 border-gray-200"}`}>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold">
            <Target size={24} />
          </div>
          <div>
            <div className="font-bold text-lg">Career Guide</div>
            <div className="text-xs text-gray-500">Your Path to Success</div>
          </div>
        </div>
        <nav className="hidden md:flex gap-6">
          <button 
            onClick={() => setCurrentPage('dashboard')} 
            className={`flex items-center gap-2 text-sm font-medium transition ${currentPage === 'dashboard' ? 'text-blue-600' : 'hover:text-blue-600'}`}
          >
            <Home size={16} /> Dashboard
          </button>
          <button 
            onClick={() => setCurrentPage('progress')} 
            className={`flex items-center gap-2 text-sm font-medium transition ${currentPage === 'progress' ? 'text-blue-600' : 'hover:text-blue-600'}`}
          >
            <BarChart3 size={16} /> Progress
          </button>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={() => setDark(!dark)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition">
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <div className="hidden md:flex items-center gap-3 ml-2">
          <div className="text-sm font-medium">{user?.name || user?.email || "User"}</div>
          <button onClick={onLogout} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm flex items-center gap-2 transition">
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>
    </header>
  );
}

// Career Card Component
function CareerCard({ career, onOpen, dark }) {
  return (
    <div 
      className={`border rounded-2xl p-6 hover:shadow-xl transition-all cursor-pointer ${dark ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`} 
      onClick={() => onOpen(career)}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold mb-1">{career.title}</h3>
          <div className="flex items-center gap-2 text-xs">
            <span className={`px-2 py-1 rounded-full ${dark ? "bg-blue-900 text-blue-200" : "bg-blue-100 text-blue-700"}`}>
              {career.category}
            </span>
            <span className="text-gray-500">{career.difficulty}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold text-green-600">{career.salary}</div>
          <div className="text-xs text-gray-500">{career.duration}</div>
        </div>
      </div>
      
      <p className={`text-sm mb-4 line-clamp-2 ${dark ? "text-gray-400" : "text-gray-600"}`}>
        {career.description}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-slate-700">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <BookOpen size={14} /> {career.steps} steps
          </span>
          <span className="flex items-center gap-1">
            <FileText size={14} /> {career.resources.length} resources
          </span>
        </div>
        <ChevronRight size={20} className="text-blue-600" />
      </div>
    </div>
  );
}

// Dashboard Page
function DashboardPage({ dark, onSelectCareer }) {
  const [careers] = useState(INITIAL_CAREERS);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const categories = ["All", ...new Set(careers.map(c => c.category))];
  
  const filtered = careers.filter(c =>
    (filter === "All" || c.category === filter) &&
    (query.trim() === "" || c.title.toLowerCase().includes(query.toLowerCase()))
  );

  const stats = [
    { label: "Available Careers", value: careers.length, icon: Target, color: "blue" },
    { label: "Learning Paths", value: careers.reduce((sum, c) => sum + c.steps, 0), icon: BookOpen, color: "green" },
    { label: "Resources", value: careers.reduce((sum, c) => sum + c.resources.length, 0), icon: FileText, color: "purple" }
  ];

  return (
    <div className={`min-h-screen ${dark ? "bg-slate-900 text-white" : "bg-gray-50 text-black"}`}>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Explore Career Paths</h1>
          <p className={`text-lg ${dark ? "text-gray-400" : "text-gray-600"}`}>
            Choose a career and start your journey to success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className={`p-6 rounded-2xl border ${dark ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className={`text-3xl font-bold mb-1 ${stat.color === 'blue' ? 'text-blue-600' : stat.color === 'green' ? 'text-green-600' : 'text-purple-600'}`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
                <stat.icon size={40} className={`${stat.color === 'blue' ? 'text-blue-600' : stat.color === 'green' ? 'text-green-600' : 'text-purple-600'} opacity-20`} />
              </div>
            </div>
          ))}
        </div>

        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className={`flex-1 flex items-center gap-3 px-4 py-3 border rounded-xl ${dark ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
            <Search size={20} className="text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search careers..."
              className={`flex-1 outline-none bg-transparent ${dark ? "text-white" : "text-black"}`}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition ${
                  filter === cat
                    ? "bg-blue-600 text-white"
                    : dark ? "bg-slate-800 text-gray-300 hover:bg-slate-700" : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(c => (
            <CareerCard
              key={c.id}
              career={c}
              onOpen={onSelectCareer}
              dark={dark}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No careers found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Career Detail Page
function CareerDetail({ career, dark, onBack }) {
  const [activeTab, setActiveTab] = useState("roadmap");
  const [roadmapSteps, setRoadmapSteps] = useState(career.roadmap);

  const toggleStepComplete = (stepId) => {
    setRoadmapSteps(roadmapSteps.map(step => 
      step.id === stepId ? { ...step, completed: !step.completed } : step
    ));
  };

  const completedSteps = roadmapSteps.filter(s => s.completed).length;
  const progressPercent = Math.round((completedSteps / roadmapSteps.length) * 100);

  return (
    <div className={`min-h-screen ${dark ? "bg-slate-900 text-white" : "bg-gray-50 text-black"}`}>
      <div className="p-6 max-w-6xl mx-auto">
        <button onClick={onBack} className="mb-6 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
          ← Back to Dashboard
        </button>

        <div className={`p-8 rounded-2xl border mb-6 ${dark ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
          <div className="flex flex-col md:flex-row justify-between items-start mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{career.title}</h1>
              <div className="flex items-center gap-3 text-sm mb-4">
                <span className={`px-3 py-1 rounded-full ${dark ? "bg-blue-900 text-blue-200" : "bg-blue-100 text-blue-700"}`}>
                  {career.category}
                </span>
                <span className="text-gray-500">{career.difficulty}</span>
                <span className="flex items-center gap-1 text-gray-500">
                  <Clock size={14} /> {career.duration}
                </span>
              </div>
              <p className={`text-base mb-4 ${dark ? "text-gray-300" : "text-gray-700"}`}>
                {career.description}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600 mb-1">{career.salary}</div>
              <div className="text-sm text-gray-500">Avg. Salary Range</div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span className="font-semibold">{completedSteps}/{roadmapSteps.length} steps completed ({progressPercent}%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="flex gap-2 border-b border-gray-200 dark:border-slate-700 mb-6">
            <button
              onClick={() => setActiveTab("roadmap")}
              className={`px-4 py-2 font-medium transition ${
                activeTab === "roadmap"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Roadmap
            </button>
            <button
              onClick={() => setActiveTab("resources")}
              className={`px-4 py-2 font-medium transition ${
                activeTab === "resources"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Resources
            </button>
          </div>

          {activeTab === "roadmap" && (
            <div className="space-y-4">
              {roadmapSteps.map((step, idx) => (
                <div
                  key={step.id}
                  className={`p-5 border rounded-xl transition-all ${
                    step.completed
                      ? dark ? "bg-green-900/20 border-green-700" : "bg-green-50 border-green-200"
                      : dark ? "bg-slate-700 border-slate-600" : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <button
                        onClick={() => toggleStepComplete(step.id)}
                        className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          step.completed
                            ? "bg-green-600 border-green-600"
                            : "border-gray-300 hover:border-blue-600"
                        }`}
                      >
                        {step.completed && <Check size={16} className="text-white" />}
                      </button>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className={`text-lg font-semibold ${step.completed ? "line-through" : ""}`}>
                            {step.title}
                          </h3>
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                            Step {idx + 1}
                          </span>
                        </div>
                        <p className={`text-sm mb-2 ${dark ? "text-gray-400" : "text-gray-600"}`}>
                          {step.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock size={12} />
                          <span>{step.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "resources" && (
            <div className="space-y-3">
              {career.resources.map((resource, idx) => (
                <div
                  key={idx}
                  className={`p-5 border rounded-xl flex items-center justify-between ${
                    dark ? "bg-slate-700 border-slate-600" : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{resource.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        dark ? "bg-purple-900 text-purple-200" : "bg-purple-100 text-purple-700"
                      }`}>
                        {resource.type}
                      </span>
                    </div>
                    <p className={`text-sm ${dark ? "text-gray-400" : "text-gray-600"}`}>
                      {resource.description}
                    </p>
                  </div>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition"
                  >
                    <span>Visit</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Progress Page
function ProgressPage({ dark }) {
  const stats = [
    { label: "Careers Explored", value: 6, icon: Target, color: "blue" },
    { label: "Steps Completed", value: 12, icon: Check, color: "green" },
    { label: "Resources Saved", value: 8, icon: BookOpen, color: "purple" },
    { label: "Learning Streak", value: "7 days", icon: Award, color: "orange" }
  ];

  return (
    <div className={`min-h-screen ${dark ? "bg-slate-900 text-white" : "bg-gray-50 text-black"}`}>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Progress</h1>
          <p className={`text-lg ${dark ? "text-gray-400" : "text-gray-600"}`}>
            Track your learning journey and achievements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className={`p-6 rounded-2xl border ${dark ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
              <div className="flex flex-col items-center text-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                  stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  stat.color === 'green' ? 'bg-green-100 text-green-600' :
                  stat.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  <stat.icon size={24} />
                </div>
                <div className={`text-3xl font-bold mb-1 ${
                  stat.color === 'blue' ? 'text-blue-600' :
                  stat.color === 'green' ? 'text-green-600' :
                  stat.color === 'purple' ? 'text-purple-600' :
                  'text-orange-600'
                }`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className={`p-8 rounded-2xl border ${dark ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { action: "Completed step", career: "Full Stack Web Developer", step: "React.js Framework", time: "2 hours ago" },
              { action: "Started learning", career: "Data Scientist", step: "Python Programming", time: "1 day ago" },
              { action: "Saved resource", career: "Digital Marketing Specialist", step: "Google Digital Garage", time: "2 days ago" },
              { action: "Completed step", career: "UX/UI Designer", step: "Design Principles", time: "3 days ago" }
            ].map((activity, idx) => (
              <div key={idx} className={`p-4 border rounded-lg ${dark ? "border-slate-700" : "border-gray-200"}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium mb-1">{activity.action}: {activity.step}</div>
                    <div className="text-sm text-gray-500">{activity.career}</div>
                  </div>
                  <div className="text-xs text-gray-400">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App Component
export default function App() {
  const [user, setUser] = useState(null);
  const [dark, setDark] = useState(false);
  const [currentPage, setCurrentPage] = useState('login');
  const [selectedCareer, setSelectedCareer] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedCareer(null);
    setCurrentPage('login');
  };

  const handleSelectCareer = (career) => {
    setSelectedCareer(career);
    setCurrentPage('career-detail');
  };

  const handleBackToDashboard = () => {
    setSelectedCareer(null);
    setCurrentPage('dashboard');
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className={`${dark ? "bg-slate-900 text-white" : "bg-gray-50 text-black"} min-h-screen`}>
      <Navbar 
        user={user} 
        onLogout={handleLogout} 
        dark={dark} 
        setDark={setDark}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      
      {currentPage === 'dashboard' && (
        <DashboardPage dark={dark} onSelectCareer={handleSelectCareer} />
      )}
      
      {currentPage === 'career-detail' && selectedCareer && (
        <CareerDetail career={selectedCareer} dark={dark} onBack={handleBackToDashboard} />
      )}
      
      {currentPage === 'progress' && (
        <ProgressPage dark={dark} />
      )}
    </div>
  );
}
