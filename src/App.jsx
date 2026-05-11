import React, { Component, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Bell,
  BookOpen,
  Bot,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Contact,
  Database,
  Download,
  Eye,
  Filter,
  GraduationCap,
  Heart,
  LayoutDashboard,
  LineChart as LineChartIcon,
  Lock,
  LogIn,
  Menu,
  Moon,
  Plus,
  Rocket,
  Save,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  Sun,
  Target,
  Trash2,
  TrendingUp,
  User,
  Users,
  Wand2,
  X
} from "lucide-react";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip
} from "chart.js";
import { Bar, Doughnut, Radar } from "react-chartjs-2";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis
} from "recharts";
import { careers, dbTables, skillsInDemand, stats } from "./data/careers";
import { quizQuestions, recommendationRules } from "./data/quiz";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip
);

const navItems = [
  { id: "home", label: "Home", icon: Rocket },
  { id: "auth", label: "Authentication", icon: LogIn },
  { id: "dashboard", label: "Student Dashboard", icon: LayoutDashboard },
  { id: "quiz", label: "Career Quiz", icon: Wand2 },
  { id: "results", label: "Results", icon: Target },
  { id: "careers", label: "Careers", icon: BriefcaseBusiness },
  { id: "skills", label: "Skill Gap", icon: Activity },
  { id: "resume", label: "Resume Builder", icon: Contact },
  { id: "admin", label: "Admin Panel", icon: ShieldCheck },
  { id: "database", label: "Database UI", icon: Database },
  { id: "about", label: "About", icon: Sparkles },
  { id: "faq", label: "FAQ", icon: BookOpen },
  { id: "contact", label: "Contact", icon: Bell }
];

const trendData = [
  { month: "Jan", ai: 40, design: 28, security: 34 },
  { month: "Feb", ai: 52, design: 36, security: 42 },
  { month: "Mar", ai: 62, design: 44, security: 55 },
  { month: "Apr", ai: 74, design: 55, security: 67 },
  { month: "May", ai: 88, design: 63, security: 81 },
  { month: "Jun", ai: 96, design: 76, security: 92 }
];

const activities = ["Quiz completed with 91% confidence", "Saved Data Scientist roadmap", "Updated SQL skill level", "Downloaded career report"];
const userSkills = ["React", "SQL", "Communication", "Python"];

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activePage, setActivePage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState(careers[0]);
  const [saved, setSaved] = useState(["Software Engineer", "Data Scientist"]);
  const [toast, setToast] = useState("Welcome to Career Compass");

  const goTo = (page) => {
    setActivePage(page);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const appClass = darkMode ? "dark" : "";

  return (
    <div className={appClass}>
      <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-500 dark:bg-[#050816] dark:text-white">
        <Background />
        <Header darkMode={darkMode} setDarkMode={setDarkMode} goTo={goTo} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Sidebar activePage={activePage} goTo={goTo} menuOpen={menuOpen} />
        <ErrorBoundary>
          <main className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:pl-72 lg:pr-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePage}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.32 }}
              >
                {activePage === "home" && <Home goTo={goTo} />}
                {activePage === "auth" && <AuthPage />}
                {activePage === "dashboard" && <StudentDashboard saved={saved} goTo={goTo} />}
                {activePage === "quiz" && <QuizPage goTo={goTo} setSelectedCareer={setSelectedCareer} setToast={setToast} />}
                {activePage === "results" && <ResultsPage career={selectedCareer} saved={saved} setSaved={setSaved} setToast={setToast} goTo={goTo} />}
                {activePage === "careers" && <CareersPage setSelectedCareer={setSelectedCareer} goTo={goTo} />}
                {activePage === "details" && <CareerDetails career={selectedCareer} />}
                {activePage === "skills" && <SkillGap />}
                {activePage === "resume" && <ResumeBuilder setToast={setToast} />}
                {activePage === "admin" && <AdminPanel setToast={setToast} />}
                {activePage === "database" && <DatabaseUi />}
                {activePage === "about" && <AboutPage />}
                {activePage === "faq" && <FaqPage />}
                {activePage === "contact" && <ContactPage setToast={setToast} />}
              </motion.div>
            </AnimatePresence>
          </main>
        </ErrorBoundary>
        <Chatbot />
        <Toast message={toast} setToast={setToast} />
      </div>
    </div>
  );
}

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <main className="relative z-10 mx-auto max-w-4xl px-4 pb-16 pt-28 sm:px-6 lg:pl-72 lg:pr-8">
          <div className="panel">
            <Pill icon={Sparkles} label="Runtime issue caught" />
            <h1 className="mt-4 text-3xl font-black">Something in the UI failed to render</h1>
            <p className="mt-3 rounded-2xl bg-rose-500/10 p-4 font-mono text-sm text-rose-600 dark:text-rose-200">
              {this.state.error.message}
            </p>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="aurora animated-grid absolute inset-0 animate-shimmer opacity-80 dark:opacity-60" />
      <div className="absolute left-[8%] top-24 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />
      <div className="absolute right-[4%] top-48 h-80 w-80 rounded-full bg-fuchsia-400/20 blur-3xl" />
      <div className="absolute bottom-0 left-[35%] h-96 w-96 rounded-full bg-teal-400/20 blur-3xl" />
    </div>
  );
}

function Header({ darkMode, setDarkMode, goTo, menuOpen, setMenuOpen }) {
  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/30 bg-white/70 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/70">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <button className="flex items-center gap-3" onClick={() => goTo("home")} aria-label="Career Compass home">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 via-indigo-500 to-fuchsia-500 text-white shadow-neon">
            <Sparkles size={22} />
          </span>
          <span>
            <span className="block text-left text-lg font-black tracking-tight">Career Compass</span>
            <span className="hidden text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400 sm:block">AI Recommendation System</span>
          </span>
        </button>
        <div className="flex items-center gap-2">
          <button className="hidden rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-semibold shadow-sm dark:border-white/10 dark:bg-white/10 md:flex" onClick={() => goTo("quiz")}>
            Start Career Quiz
          </button>
          <button className="focus-ring rounded-full border border-slate-200 bg-white/80 p-3 text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/10 dark:text-white" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle dark mode">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="focus-ring rounded-full border border-slate-200 bg-white/80 p-3 shadow-sm lg:hidden dark:border-white/10 dark:bg-white/10" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}

function Sidebar({ activePage, goTo, menuOpen }) {
  return (
    <aside className={`fixed bottom-0 left-0 top-[76px] z-30 w-72 max-w-[85vw] transform border-r border-white/30 bg-white/75 p-4 backdrop-blur-2xl transition-transform dark:border-white/10 dark:bg-slate-950/75 lg:translate-x-0 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <nav className="no-scrollbar flex h-full flex-col gap-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = activePage === item.id || (item.id === "careers" && activePage === "details");
          return (
            <button
              key={item.id}
              onClick={() => goTo(item.id)}
              className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${active ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-neon" : "text-slate-700 hover:bg-white/80 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"}`}
            >
              <Icon size={18} />
              <span className="font-semibold">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

function Home({ goTo }) {
  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/50 bg-white/60 p-6 shadow-glass backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/50 md:p-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-7">
            <Pill icon={Sparkles} label="AI-powered DBMS mini project" />
            <div>
              <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-7xl">
                Discover Your Perfect <span className="gradient-text">Career Path</span>
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                Career Compass combines intelligent quiz logic, skill analysis, database-ready records, and dashboard insights to guide students toward high-fit careers.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <PrimaryButton onClick={() => goTo("quiz")} icon={ArrowRight}>Start Career Quiz</PrimaryButton>
              <SecondaryButton onClick={() => goTo("careers")} icon={Search}>Explore Careers</SecondaryButton>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((item) => <StatCard key={item.label} {...item} />)}
            </div>
          </div>
          <HeroOrbit />
        </div>
      </section>

      <SectionTitle eyebrow="Trending Careers" title="Fast-growing paths students are choosing" />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {careers.slice(0, 6).map((career) => (
          <CareerCard key={career.id} career={career} onDetails={() => {}} compact />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Panel title="Skills in Demand" icon={TrendingUp}>
          <div className="flex flex-wrap gap-3">
            {skillsInDemand.map((skill) => <span key={skill} className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-700 dark:border-indigo-400/30 dark:bg-indigo-400/10 dark:text-indigo-200">{skill}</span>)}
          </div>
        </Panel>
        <Panel title="Career Roadmap Preview" icon={LineChartIcon}>
          <ResponsiveContainer width="100%" height={230}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="growth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.25)" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Area type="monotone" dataKey="ai" stroke="#6366f1" fill="url(#growth)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {["The quiz gave me a roadmap I could actually present to my mentor.", "The dashboard made my DBMS project feel like a real product.", "Skill gap analysis helped me choose SQL and UI courses first."].map((quote, index) => (
          <motion.div whileHover={{ y: -6 }} key={quote} className="panel">
            <div className="mb-4 flex gap-1 text-amber-400">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={18} fill="currentColor" />)}</div>
            <p className="text-slate-600 dark:text-slate-300">"{quote}"</p>
            <p className="mt-5 font-bold">Student {index + 1}</p>
          </motion.div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

function HeroOrbit() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      <div className="absolute inset-8 animate-pulseGlow rounded-full border border-white/60 bg-white/50 backdrop-blur-2xl dark:border-white/10 dark:bg-white/5" />
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 34, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border border-dashed border-indigo-300/70 dark:border-indigo-300/25" />
      {careers.slice(0, 6).map((career, index) => {
        const Icon = career.icon;
        const positions = ["left-8 top-16", "right-4 top-24", "left-0 bottom-32", "right-12 bottom-20", "left-1/2 top-0 -translate-x-1/2", "left-1/2 bottom-0 -translate-x-1/2"];
        return (
          <motion.div key={career.id} className={`absolute ${positions[index]} glass flex items-center gap-3 rounded-2xl p-3`} animate={{ y: [0, -10, 0] }} transition={{ duration: 4 + index, repeat: Infinity }}>
            <span className="rounded-xl bg-gradient-to-br from-sky-400 to-indigo-600 p-2 text-white"><Icon size={18} /></span>
            <span className="hidden text-sm font-bold sm:block">{career.title}</span>
          </motion.div>
        );
      })}
      <div className="absolute left-1/2 top-1/2 w-52 -translate-x-1/2 -translate-y-1/2 rounded-[2rem] bg-gradient-to-br from-slate-950 to-indigo-950 p-5 text-center text-white shadow-neon dark:from-white/10 dark:to-indigo-500/20">
        <Bot className="mx-auto mb-3 text-sky-300" size={38} />
        <p className="text-4xl font-black">96%</p>
        <p className="text-sm text-slate-300">best match confidence</p>
      </div>
    </div>
  );
}

function StudentDashboard({ saved, goTo }) {
  const barData = {
    labels: ["Coding", "Analytics", "Creativity", "Biology", "Business"],
    datasets: [{ label: "Skill score", data: [86, 72, 68, 42, 61], backgroundColor: ["#38bdf8", "#6366f1", "#d946ef", "#14b8a6", "#f59e0b"], borderRadius: 10 }]
  };
  const radarData = {
    labels: ["Logic", "Design", "SQL", "Communication", "Research", "Leadership"],
    datasets: [{ label: "Current profile", data: [88, 70, 82, 74, 66, 62], backgroundColor: "rgba(99,102,241,.18)", borderColor: "#6366f1" }]
  };
  return (
    <div className="space-y-8">
      <DashboardTop title="Welcome back, Vinay" subtitle="Your AI career workspace is ready for today's decisions." />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Metric label="Career match" value="96%" icon={Target} />
        <Metric label="Saved careers" value={saved.length} icon={Heart} />
        <Metric label="Quiz attempts" value="7" icon={BookOpen} />
        <Metric label="Roadmap progress" value="64%" icon={TrendingUp} />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Panel title="Recommended Careers" icon={Sparkles}>
          <div className="space-y-4">
            {careers.slice(0, 3).map((career) => <CareerRow key={career.id} career={career} onClick={() => goTo("results")} />)}
          </div>
        </Panel>
        <Panel title="Progress Tracker" icon={Activity}>
          {["Complete quiz", "Select target career", "Build skill roadmap", "Create resume", "Apply to internships"].map((item, i) => (
            <div key={item} className="mb-4 flex items-center gap-3">
              <span className={`flex h-8 w-8 items-center justify-center rounded-full ${i < 3 ? "bg-emerald-500 text-white" : "bg-slate-200 dark:bg-white/10"}`}>{i < 3 ? <Check size={16} /> : i + 1}</span>
              <span className="font-semibold text-slate-700 dark:text-slate-200">{item}</span>
            </div>
          ))}
        </Panel>
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <Panel title="Skill Analysis Chart.js" icon={LineChartIcon}><Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} /></Panel>
        <Panel title="Personality Fit Radar" icon={Target}><Radar data={radarData} options={{ responsive: true }} /></Panel>
      </div>
      <Panel title="Recent Activity" icon={Bell}>
        <div className="grid gap-3 md:grid-cols-2">
          {activities.map((activity) => <div key={activity} className="rounded-2xl border border-slate-200 bg-white/60 p-4 text-sm font-semibold dark:border-white/10 dark:bg-white/5">{activity}</div>)}
        </div>
      </Panel>
    </div>
  );
}

function QuizPage({ goTo, setSelectedCareer, setToast }) {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({});
  const current = quizQuestions[step];
  const progress = ((step + 1) / quizQuestions.length) * 100;

  const answer = (option) => {
    const nextScores = { ...scores, [option.career]: (scores[option.career] || 0) + option.score };
    setScores(nextScores);
    if (step < quizQuestions.length - 1) {
      setStep(step + 1);
    } else {
      const winner = Object.entries(nextScores).sort((a, b) => b[1] - a[1])[0]?.[0] || "Software Engineer";
      setSelectedCareer(careers.find((career) => career.title === winner) || careers[0]);
      setToast("Recommendation generated with AI-style confidence");
      goTo("results");
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <DashboardTop title="Interactive Career Quiz" subtitle="Answer a few interest, skill, personality, and academic strength questions." />
      <div className="panel overflow-hidden">
        <div className="mb-6 h-3 rounded-full bg-slate-200 dark:bg-white/10">
          <motion.div className="h-3 rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-fuchsia-500" animate={{ width: `${progress}%` }} />
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={current.id} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
            <Pill icon={BookOpen} label={current.category} />
            <h2 className="mt-5 text-2xl font-black md:text-4xl">{current.question}</h2>
            <div className="mt-8 grid gap-4">
              {current.options.map((option) => (
                <button key={option.label} onClick={() => answer(option)} className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white/80 p-5 text-left font-bold transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-neon dark:border-white/10 dark:bg-white/5">
                  <span>{option.label}</span>
                  <ChevronRight className="text-indigo-500 transition group-hover:translate-x-1" />
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <Panel title="Smart Recommendation Logic" icon={BrainIcon}>
        <div className="grid gap-3 md:grid-cols-2">
          {recommendationRules.map((rule) => <div key={rule} className="rounded-2xl bg-slate-100 p-4 text-sm font-semibold dark:bg-white/5">{rule}</div>)}
        </div>
      </Panel>
    </div>
  );
}

function ResultsPage({ career, saved, setSaved, setToast, goTo }) {
  const growthData = career.growth.map((value, index) => ({ year: `Y${index + 1}`, value }));
  const isSaved = saved.includes(career.title);
  return (
    <div className="space-y-8">
      <DashboardTop title="Your Career Recommendation" subtitle="Based on quiz categories, skill fit, academic strengths, and confidence scoring." />
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="panel">
          <div className="flex items-center gap-4">
            <span className="rounded-3xl bg-gradient-to-br from-sky-400 to-indigo-600 p-4 text-white"><career.icon size={34} /></span>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-500">Best Match</p>
              <h2 className="text-4xl font-black">{career.title}</h2>
            </div>
          </div>
          <div className="my-8 mx-auto max-w-xs"><Doughnut data={{ labels: ["Match", "Gap"], datasets: [{ data: [career.match, 100 - career.match], backgroundColor: ["#6366f1", "rgba(148,163,184,.25)"], borderWidth: 0 }] }} /></div>
          <div className="grid gap-3 sm:grid-cols-3">
            <Mini label="Salary" value={career.salary} />
            <Mini label="Demand" value={career.demand} />
            <Mini label="Scope" value="Strong" />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <PrimaryButton icon={Save} onClick={() => { if (!isSaved) setSaved([...saved, career.title]); setToast("Career saved"); }}>{isSaved ? "Saved" : "Save Career"}</PrimaryButton>
            <SecondaryButton icon={Eye} onClick={() => goTo("details")}>View Details</SecondaryButton>
            <SecondaryButton icon={Download} onClick={() => setToast("Report download UI triggered")}>Download Report</SecondaryButton>
          </div>
        </div>
        <Panel title="Career Growth Graph" icon={TrendingUp}>
          <ResponsiveContainer width="100%" height={310}>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.25)" />
              <XAxis dataKey="year" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Line type="monotone" dataKey="value" stroke="#38bdf8" strokeWidth={4} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </Panel>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Required Skills" icon={Sparkles}><SkillPills skills={career.skills} /></Panel>
        <Panel title="Recommended Courses" icon={GraduationCap}><Timeline items={career.courses} /></Panel>
      </div>
      <Panel title="Learning Roadmap Timeline" icon={Rocket}><Timeline items={career.roadmap} horizontal /></Panel>
    </div>
  );
}

function CareersPage({ setSelectedCareer, goTo }) {
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState("All");
  const domains = ["All", ...new Set(careers.map((career) => career.domain))];
  const filtered = careers.filter((career) => (domain === "All" || career.domain === domain) && career.title.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="space-y-7">
      <DashboardTop title="Explore Careers" subtitle="Search and filter career records as if powered by MySQL tables." />
      <div className="panel flex flex-col gap-3 md:flex-row">
        <label className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 dark:border-white/10 dark:bg-white/5">
          <Search size={18} /><input className="w-full bg-transparent py-3 outline-none" placeholder="Search careers" value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
        <div className="flex items-center gap-2 overflow-x-auto">
          <Filter size={18} />
          {domains.map((item) => <button key={item} onClick={() => setDomain(item)} className={`rounded-full px-4 py-2 text-sm font-bold transition ${domain === item ? "bg-indigo-600 text-white" : "bg-white/70 dark:bg-white/10"}`}>{item}</button>)}
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((career) => <CareerCard key={career.id} career={career} onDetails={() => { setSelectedCareer(career); goTo("details"); }} />)}
      </div>
    </div>
  );
}

function CareerDetails({ career }) {
  return (
    <div className="space-y-8">
      <div className="panel">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <span className="rounded-3xl bg-gradient-to-br from-sky-400 to-indigo-600 p-5 text-white"><career.icon size={40} /></span>
            <div>
              <h1 className="text-4xl font-black">{career.title}</h1>
              <p className="mt-2 max-w-3xl text-slate-600 dark:text-slate-300">{career.description}</p>
            </div>
          </div>
          <div className="rounded-2xl bg-emerald-500/10 px-5 py-3 text-center">
            <p className="text-sm font-bold text-emerald-500">Demand Level</p>
            <p className="text-xl font-black">{career.demand}</p>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Salary Info" icon={TrendingUp}><p className="text-3xl font-black gradient-text">{career.salary}</p><p className="mt-3 text-slate-600 dark:text-slate-300">{career.scope}</p></Panel>
        <Panel title="Tools Used" icon={Settings}><SkillPills skills={career.tools} /></Panel>
        <Panel title="Job Opportunities" icon={BriefcaseBusiness}><Timeline items={career.opportunities} /></Panel>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Required Skills" icon={Sparkles}><SkillPills skills={career.skills} /></Panel>
        <Panel title="Courses and Certifications" icon={GraduationCap}><Timeline items={career.courses} /></Panel>
      </div>
      <Panel title="Infographic Career Roadmap" icon={Rocket}><Timeline items={career.roadmap} horizontal /></Panel>
    </div>
  );
}

function SkillGap() {
  const [careerId, setCareerId] = useState(1);
  const career = careers.find((item) => item.id === Number(careerId)) || careers[0];
  const comparison = career.skills.map((skill, index) => ({ skill, current: userSkills.includes(skill) ? 85 : 35 + index * 6, required: 90 }));
  return (
    <div className="space-y-8">
      <DashboardTop title="Skill Gap Analysis" subtitle="Compare current skills with required skills and generate learning path suggestions." />
      <div className="panel flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <label className="font-bold">Desired Career</label>
        <select className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 outline-none dark:border-white/10 dark:bg-slate-900" value={careerId} onChange={(e) => setCareerId(e.target.value)}>
          {careers.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
        </select>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <Panel title="Skill Comparison" icon={Activity}>
          <div className="space-y-5">
            {comparison.map((item) => <ProgressPair key={item.skill} {...item} />)}
          </div>
        </Panel>
        <Panel title="Missing Skills and Learning Path" icon={GraduationCap}>
          <SkillPills skills={career.missingSkills} />
          <Timeline items={career.courses} />
        </Panel>
      </div>
    </div>
  );
}

function ResumeBuilder({ setToast }) {
  const [resume, setResume] = useState({ name: "Vinay Kumar", role: "Aspiring Software Engineer", email: "vinay@example.com", skills: "React, SQL, JavaScript, DBMS", project: "Career Compass AI Recommendation System" });
  return (
    <div className="space-y-8">
      <DashboardTop title="Resume Builder" subtitle="Create a modern student resume with live preview and template-ready fields." />
      <div className="grid gap-6 xl:grid-cols-2">
        <Panel title="Resume Form" icon={Contact}>
          <div className="grid gap-4">
            {Object.entries(resume).map(([key, value]) => (
              <label key={key} className="grid gap-2 text-sm font-bold capitalize">
                {key}
                <input className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 outline-none transition focus:border-indigo-400 dark:border-white/10 dark:bg-white/5" value={value} onChange={(e) => setResume({ ...resume, [key]: e.target.value })} />
              </label>
            ))}
            <PrimaryButton icon={Download} onClick={() => setToast("Resume download UI triggered")}>Download Resume</PrimaryButton>
          </div>
        </Panel>
        <div className="rounded-2xl bg-white p-7 text-slate-900 shadow-glass">
          <div className="border-b border-slate-200 pb-5">
            <h2 className="text-4xl font-black">{resume.name}</h2>
            <p className="mt-1 text-lg font-bold text-indigo-600">{resume.role}</p>
            <p className="mt-2 text-slate-500">{resume.email}</p>
          </div>
          <div className="mt-6 grid gap-5">
            <div><h3 className="font-black uppercase tracking-[0.2em] text-slate-500">Skills</h3><p className="mt-2">{resume.skills}</p></div>
            <div><h3 className="font-black uppercase tracking-[0.2em] text-slate-500">Featured Project</h3><p className="mt-2">{resume.project}</p></div>
            <div><h3 className="font-black uppercase tracking-[0.2em] text-slate-500">Profile</h3><p className="mt-2">Career-focused student with strong DBMS foundations, product thinking, and practical project experience.</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminPanel({ setToast }) {
  const users = ["Aarav Sharma", "Meera Patel", "Rohan Singh", "Sara Khan"];
  return (
    <div className="space-y-8">
      <DashboardTop title="Admin Panel" subtitle="Manage users, careers, quiz questions, recommendations, and analytics." />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Metric label="Total users" value="18,425" icon={Users} />
        <Metric label="Career records" value="120" icon={BriefcaseBusiness} />
        <Metric label="Quiz questions" value="64" icon={BookOpen} />
        <Metric label="Recommendations" value="27,188" icon={Target} />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <Panel title="Analytics Dashboard" icon={LineChartIcon}>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.25)" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Area type="monotone" dataKey="ai" stroke="#6366f1" fill="#6366f133" />
              <Area type="monotone" dataKey="security" stroke="#06b6d4" fill="#06b6d433" />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>
        <Panel title="Career Management" icon={BriefcaseBusiness}>
          <div className="mb-4 flex gap-2">
            <SecondaryButton icon={Plus} onClick={() => setToast("Add career modal UI opened")}>Add Career</SecondaryButton>
            <SecondaryButton icon={Filter}>Filter</SecondaryButton>
          </div>
          <DataTable rows={careers.slice(0, 5).map((career) => [career.title, career.domain, career.demand])} headers={["Career", "Domain", "Demand"]} />
        </Panel>
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <Panel title="User Management" icon={Users}><DataTable rows={users.map((user, i) => [user, i === 0 ? "Admin" : "Student", `${82 + i * 3}%`])} headers={["Name", "Role", "Profile"]} actions /></Panel>
        <Panel title="Quiz Question Management" icon={BookOpen}><DataTable rows={quizQuestions.map((q) => [q.category, q.question.slice(0, 38) + "...", q.options.length])} headers={["Category", "Question", "Options"]} actions /></Panel>
      </div>
    </div>
  );
}

function DatabaseUi() {
  return (
    <div className="space-y-8">
      <DashboardTop title="Database Structure" subtitle="Professional UI representation of MySQL-ready tables and relationships." />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {dbTables.map((table) => {
          const Icon = table.icon;
          return (
            <motion.div whileHover={{ y: -5 }} key={table.name} className="panel">
              <div className="flex items-center gap-3">
                <span className="rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-600 p-3 text-white"><Icon size={22} /></span>
                <div><h3 className="text-xl font-black">{table.name}</h3><p className="text-sm text-slate-500 dark:text-slate-400">{table.rows.toLocaleString()} rows</p></div>
              </div>
              <p className="mt-5 rounded-2xl bg-slate-100 p-4 font-mono text-xs leading-6 dark:bg-white/5">{table.columns}</p>
            </motion.div>
          );
        })}
      </div>
      <Panel title="Add / Edit Record Form" icon={Database}>
        <div className="grid gap-4 md:grid-cols-3">
          {["Table", "Primary Key", "Column Values"].map((label) => <input key={label} className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 outline-none dark:border-white/10 dark:bg-white/5" placeholder={label} />)}
        </div>
      </Panel>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="space-y-8">
      <DashboardTop title="About Career Compass" subtitle="A portfolio-ready AI career recommendation platform designed for DBMS project evaluation." />
      <div className="grid gap-6 lg:grid-cols-3">
        {["Student-first recommendations", "Database-ready entities", "Presentation-grade dashboards"].map((item) => <Panel key={item} title={item} icon={Sparkles}><p className="text-slate-600 dark:text-slate-300">Built with React, Tailwind, Chart.js, Recharts, Framer Motion, and MySQL-friendly module design.</p></Panel>)}
      </div>
    </div>
  );
}

function FaqPage() {
  const faqs = [
    ["Is this connected to MySQL?", "The frontend is backend-ready and includes schema.sql for MySQL implementation."],
    ["Can admin manage careers?", "Yes, the admin panel includes management tables and modal-ready controls."],
    ["How are recommendations shown?", "The UI maps quiz answers to careers and displays visual confidence scores."]
  ];
  return <div className="space-y-5"><DashboardTop title="FAQ" subtitle="Common questions for project presentation." />{faqs.map(([q, a]) => <div key={q} className="panel"><h3 className="text-xl font-black">{q}</h3><p className="mt-2 text-slate-600 dark:text-slate-300">{a}</p></div>)}</div>;
}

function ContactPage({ setToast }) {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <DashboardTop title="Contact" subtitle="A polished contact form for feedback, mentorship, and collaboration." />
      <Panel title="Send Message" icon={Bell}>
        <div className="grid gap-4">
          <input className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 outline-none dark:border-white/10 dark:bg-white/5" placeholder="Name" />
          <input className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 outline-none dark:border-white/10 dark:bg-white/5" placeholder="Email" />
          <textarea className="min-h-36 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 outline-none dark:border-white/10 dark:bg-white/5" placeholder="Message" />
          <PrimaryButton icon={ArrowRight} onClick={() => setToast("Message sent UI triggered")}>Send Message</PrimaryButton>
        </div>
      </Panel>
    </div>
  );
}

function AuthPage() {
  const [tab, setTab] = useState("login");
  const tabs = [
    { id: "login", label: "Login" },
    { id: "register", label: "Registration" },
    { id: "forgot", label: "Forgot Password" }
  ];
  return (
    <div className="space-y-8">
      <DashboardTop title="Authentication System" subtitle="Role-ready student/admin forms with validation-style UI states." />
      <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-2 rounded-full border border-white/40 bg-white/65 p-2 dark:border-white/10 dark:bg-white/10">
        {tabs.map((item) => (
          <button key={item.id} onClick={() => setTab(item.id)} className={`rounded-full px-5 py-2 text-sm font-black transition ${tab === item.id ? "bg-indigo-600 text-white" : "text-slate-600 dark:text-slate-300"}`}>
            {item.label}
          </button>
        ))}
      </div>
      <LoginRegisterForgot type={tab} />
    </div>
  );
}

function LoginRegisterForgot({ type = "login" }) {
  const isLogin = type === "login";
  return (
    <div className="mx-auto max-w-md panel">
      <h2 className="text-3xl font-black">{isLogin ? "Login" : type === "register" ? "Create Account" : "Reset Password"}</h2>
      <div className="mt-6 grid gap-4">
        {!isLogin && type !== "forgot" && <Input icon={User} placeholder="Full name" />}
        <Input icon={Bell} placeholder="Email address" />
        {type !== "forgot" && <Input icon={Lock} placeholder="Password" type="password" />}
        {type === "register" && <select className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 dark:border-white/10 dark:bg-slate-900"><option>Student/User</option><option>Admin</option></select>}
        <PrimaryButton icon={LogIn}>{isLogin ? "Login" : type === "register" ? "Register" : "Send Reset Link"}</PrimaryButton>
      </div>
    </div>
  );
}

function CareerCard({ career, onDetails, compact = false }) {
  const Icon = career.icon;
  return (
    <motion.div whileHover={{ y: -6 }} className="panel">
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-600 p-3 text-white"><Icon size={24} /></span>
        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-black text-emerald-500">{career.match}%</span>
      </div>
      <h3 className="mt-5 text-2xl font-black">{career.title}</h3>
      <p className="mt-2 text-sm font-semibold text-indigo-500">{career.domain} • {career.salary}</p>
      <p className="mt-3 text-slate-600 dark:text-slate-300">{career.description}</p>
      {!compact && <button onClick={onDetails} className="mt-5 flex items-center gap-2 font-bold text-indigo-500">View Details <ArrowRight size={16} /></button>}
    </motion.div>
  );
}

function CareerRow({ career, onClick }) {
  const Icon = career.icon;
  return (
    <button onClick={onClick} className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white/70 p-4 text-left transition hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-white/5">
      <span className="flex items-center gap-3"><span className="rounded-xl bg-indigo-500/10 p-2 text-indigo-500"><Icon size={20} /></span><span><span className="block font-black">{career.title}</span><span className="text-sm text-slate-500">{career.domain}</span></span></span>
      <span className="font-black text-emerald-500">{career.match}%</span>
    </button>
  );
}

function Panel({ title, icon: Icon, children }) {
  return (
    <div className="panel">
      <div className="mb-5 flex items-center gap-3">
        <span className="rounded-2xl bg-indigo-500/10 p-2 text-indigo-500"><Icon size={20} /></span>
        <h2 className="text-xl font-black">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function DashboardTop({ title, subtitle }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <Pill icon={Sparkles} label="Career Compass AI" />
        <h1 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">{title}</h1>
        <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-300">{subtitle}</p>
      </div>
      <div className="flex items-center gap-2 rounded-full border border-white/50 bg-white/70 px-4 py-2 text-sm font-bold dark:border-white/10 dark:bg-white/10">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /> Live Demo
      </div>
    </div>
  );
}

function SectionTitle({ eyebrow, title }) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.22em] text-indigo-500">{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">{title}</h2>
      </div>
      <div className="hidden h-px flex-1 bg-gradient-to-r from-indigo-300/70 to-transparent md:block" />
    </div>
  );
}

function Metric({ label, value, icon: Icon }) {
  return (
    <motion.div whileHover={{ y: -5 }} className="panel">
      <div className="flex items-center justify-between">
        <span className="rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-600 p-3 text-white"><Icon size={22} /></span>
        <Sparkles className="text-fuchsia-400" size={18} />
      </div>
      <p className="mt-5 text-3xl font-black">{value}</p>
      <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">{label}</p>
    </motion.div>
  );
}

function StatCard({ label, value, icon: Icon }) {
  return <div className="rounded-2xl border border-white/50 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5"><Icon className="mb-3 text-indigo-500" /><p className="text-2xl font-black">{value}</p><p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{label}</p></div>;
}

function Mini({ label, value }) {
  return <div className="rounded-2xl bg-slate-100 p-4 dark:bg-white/5"><p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{label}</p><p className="mt-2 font-black">{value}</p></div>;
}

function Pill({ icon: Icon, label }) {
  return <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-indigo-600 dark:border-indigo-300/20 dark:bg-indigo-400/10 dark:text-indigo-200"><Icon size={14} />{label}</span>;
}

function PrimaryButton({ children, icon: Icon, onClick }) {
  return <button onClick={onClick} className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3 font-black text-white shadow-neon transition hover:-translate-y-1">{children}{Icon && <Icon size={18} />}</button>;
}

function SecondaryButton({ children, icon: Icon, onClick }) {
  return <button onClick={onClick} className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/75 px-5 py-3 font-black text-slate-800 transition hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-white/10 dark:text-white">{Icon && <Icon size={18} />}{children}</button>;
}

function SkillPills({ skills }) {
  return <div className="flex flex-wrap gap-3">{skills.map((skill) => <span key={skill} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold dark:bg-white/10">{skill}</span>)}</div>;
}

function Timeline({ items, horizontal = false }) {
  return <div className={`grid gap-3 ${horizontal ? "md:grid-cols-3 xl:grid-cols-6" : ""}`}>{items.map((item, i) => <div key={item} className="flex gap-3 rounded-2xl bg-slate-100 p-4 dark:bg-white/5"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-black text-white">{i + 1}</span><span className="font-semibold">{item}</span></div>)}</div>;
}

function ProgressPair({ skill, current, required }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm font-bold"><span>{skill}</span><span>{current}% / {required}%</span></div>
      <div className="h-3 rounded-full bg-slate-200 dark:bg-white/10"><div className="h-3 rounded-full bg-gradient-to-r from-sky-400 to-indigo-600" style={{ width: `${current}%` }} /></div>
    </div>
  );
}

function DataTable({ headers, rows, actions = false }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead className="bg-slate-100 dark:bg-white/10"><tr>{headers.map((h) => <th key={h} className="p-3 font-black">{h}</th>)}{actions && <th className="p-3 font-black">Actions</th>}</tr></thead>
        <tbody>{rows.map((row, i) => <tr key={i} className="border-t border-slate-200 dark:border-white/10">{row.map((cell) => <td key={cell} className="p-3 font-semibold text-slate-600 dark:text-slate-300">{cell}</td>)}{actions && <td className="flex gap-2 p-3"><Eye size={17} /><Trash2 size={17} /></td>}</tr>)}</tbody>
      </table>
    </div>
  );
}

function Input({ icon: Icon, placeholder, type = "text" }) {
  return <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 dark:border-white/10 dark:bg-white/5"><Icon size={18} /><input type={type} placeholder={placeholder} className="w-full bg-transparent py-3 outline-none" /></label>;
}

function Chatbot() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-5 right-5 z-40">
      {open && <div className="mb-3 w-[min(340px,calc(100vw-2rem))] rounded-3xl border border-white/40 bg-white/85 p-4 shadow-glass backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/85"><div className="flex items-center gap-3"><Bot className="text-indigo-500" /><b>AI Career Assistant</b></div><p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Ask about careers, required skills, salary ranges, or DBMS entities. This is a chatbot-ready UI shell.</p><input className="mt-4 w-full rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 outline-none dark:border-white/10 dark:bg-white/5" placeholder="Type your question..." /></div>}
      <button onClick={() => setOpen(!open)} className="rounded-full bg-gradient-to-r from-sky-500 to-fuchsia-500 p-4 text-white shadow-neon"><Bot /></button>
    </div>
  );
}

function Toast({ message, setToast }) {
  if (!message) return null;
  return (
    <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onClick={() => setToast("")} className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full border border-white/40 bg-slate-950/90 px-5 py-3 text-sm font-bold text-white shadow-neon backdrop-blur-xl">
      {message}
    </motion.button>
  );
}

function Footer() {
  return <footer className="rounded-3xl border border-white/40 bg-white/60 p-6 text-center text-sm font-semibold text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">Career Compass • DBMS Mini Project • GitHub • LinkedIn • Contact</footer>;
}

function BrainIcon(props) {
  return <Bot {...props} />;
}

export default App;
