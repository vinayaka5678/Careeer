import {
  Binary,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Database,
  HeartPulse,
  Megaphone,
  Palette,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TrendingUp
} from "lucide-react";

export const careers = [
  {
    id: 1,
    title: "Software Engineer",
    domain: "Technology",
    icon: Code2,
    match: 96,
    salary: "$75k - $160k",
    demand: "Very High",
    scope: "Cloud, AI platforms, SaaS, fintech, automation",
    skills: ["JavaScript", "React", "SQL", "APIs", "System Design"],
    missingSkills: ["Data Structures", "Cloud Deployment"],
    courses: ["Full Stack Web Development", "Database Management Systems", "Cloud Foundations"],
    tools: ["VS Code", "GitHub", "MySQL", "Docker", "Postman"],
    description: "Builds reliable applications, backend services, and scalable user experiences used by organizations and consumers.",
    roadmap: ["Programming basics", "DSA", "Frontend + backend", "Databases", "Cloud projects", "Internship portfolio"],
    opportunities: ["Frontend Developer", "Backend Developer", "Full Stack Engineer", "Mobile Engineer"],
    growth: [40, 48, 61, 76, 88, 96]
  },
  {
    id: 2,
    title: "Data Scientist",
    domain: "Analytics",
    icon: BrainCircuit,
    match: 91,
    salary: "$80k - $170k",
    demand: "High",
    scope: "AI analytics, prediction systems, data products, business intelligence",
    skills: ["Python", "Statistics", "SQL", "Machine Learning", "Visualization"],
    missingSkills: ["Model Evaluation", "Feature Engineering"],
    courses: ["Python for Data Science", "Applied Machine Learning", "Statistics for Analytics"],
    tools: ["Jupyter", "MySQL", "Power BI", "TensorFlow", "Pandas"],
    description: "Transforms raw data into predictions, dashboards, and insights that help teams make smarter decisions.",
    roadmap: ["Math basics", "Python", "SQL", "EDA", "ML models", "Deployment"],
    opportunities: ["Data Analyst", "ML Engineer", "BI Developer", "Research Analyst"],
    growth: [36, 46, 57, 70, 83, 94]
  },
  {
    id: 3,
    title: "UI/UX Designer",
    domain: "Design",
    icon: Palette,
    match: 89,
    salary: "$60k - $135k",
    demand: "High",
    scope: "Product design, mobile apps, SaaS dashboards, design systems",
    skills: ["Figma", "Research", "Wireframing", "Prototyping", "Usability"],
    missingSkills: ["Design Systems", "User Testing"],
    courses: ["Google UX Design", "Product Design Masterclass", "Human Computer Interaction"],
    tools: ["Figma", "FigJam", "Maze", "Notion", "Miro"],
    description: "Designs intuitive digital experiences by combining user research, visual design, and product thinking.",
    roadmap: ["Design principles", "User research", "Wireframes", "Prototypes", "Portfolio", "Product strategy"],
    opportunities: ["UX Designer", "Product Designer", "UX Researcher", "Interaction Designer"],
    growth: [42, 52, 62, 72, 82, 91]
  },
  {
    id: 4,
    title: "Doctor",
    domain: "Healthcare",
    icon: Stethoscope,
    match: 84,
    salary: "$95k - $240k",
    demand: "Very High",
    scope: "Hospitals, clinics, public health, medical research, telemedicine",
    skills: ["Biology", "Diagnosis", "Communication", "Ethics", "Patient Care"],
    missingSkills: ["Clinical Practice", "Medical Entrance Prep"],
    courses: ["Pre-Med Biology", "Human Anatomy", "Clinical Communication"],
    tools: ["EHR Systems", "Diagnostic Tools", "Medical Imaging", "Lab Systems"],
    description: "Diagnoses and treats patients while improving health outcomes through science and clinical judgment.",
    roadmap: ["Biology foundation", "Entrance exam", "Medical degree", "Residency", "Specialization"],
    opportunities: ["General Physician", "Surgeon", "Pediatrician", "Medical Researcher"],
    growth: [30, 42, 55, 67, 82, 93]
  },
  {
    id: 5,
    title: "Cybersecurity Analyst",
    domain: "Security",
    icon: ShieldCheck,
    match: 87,
    salary: "$78k - $155k",
    demand: "Very High",
    scope: "Security operations, cloud security, risk management, incident response",
    skills: ["Networking", "Linux", "Threat Analysis", "SQL", "Risk Assessment"],
    missingSkills: ["SIEM", "Ethical Hacking"],
    courses: ["CompTIA Security+", "Ethical Hacking Basics", "Network Defense"],
    tools: ["Wireshark", "Splunk", "Nmap", "Kali Linux", "Burp Suite"],
    description: "Protects systems and data by monitoring threats, investigating incidents, and improving defenses.",
    roadmap: ["Networking", "Linux", "Security basics", "Labs", "SOC tools", "Certifications"],
    opportunities: ["SOC Analyst", "Security Engineer", "Cloud Security Analyst", "Risk Analyst"],
    growth: [38, 49, 63, 75, 86, 95]
  },
  {
    id: 6,
    title: "Digital Marketer",
    domain: "Business",
    icon: Megaphone,
    match: 82,
    salary: "$50k - $125k",
    demand: "High",
    scope: "Growth marketing, brand strategy, ecommerce, analytics-led campaigns",
    skills: ["SEO", "Content", "Analytics", "Creativity", "Campaigns"],
    missingSkills: ["A/B Testing", "Marketing Automation"],
    courses: ["Digital Marketing Fundamentals", "Google Analytics", "Growth Marketing"],
    tools: ["Google Analytics", "HubSpot", "Canva", "Mailchimp", "Meta Ads"],
    description: "Grows products and brands through campaigns, content, analytics, and customer acquisition strategy.",
    roadmap: ["Marketing basics", "SEO", "Content", "Ads", "Analytics", "Campaign portfolio"],
    opportunities: ["SEO Specialist", "Growth Marketer", "Brand Strategist", "Content Marketer"],
    growth: [35, 45, 58, 69, 79, 88]
  }
];

export const stats = [
  { label: "Careers mapped", value: "120+", icon: BriefcaseBusiness },
  { label: "Students guided", value: "18k+", icon: Sparkles },
  { label: "Top industries", value: "16", icon: TrendingUp },
  { label: "Skill paths", value: "450+", icon: Binary }
];

export const skillsInDemand = ["AI & ML", "SQL", "Cloud Computing", "Cybersecurity", "UX Research", "Data Visualization", "Communication", "Product Thinking"];

export const dbTables = [
  { name: "Users", columns: "user_id, name, email, password_hash, role, created_at", rows: 18425, icon: Database },
  { name: "Careers", columns: "career_id, title, domain, salary_range, demand_level", rows: 120, icon: BriefcaseBusiness },
  { name: "Quiz_Questions", columns: "question_id, category, question_text, option_json", rows: 64, icon: Binary },
  { name: "Quiz_Results", columns: "result_id, user_id, career_id, score, attempted_at", rows: 38210, icon: TrendingUp },
  { name: "Skills", columns: "skill_id, skill_name, domain, difficulty", rows: 450, icon: Sparkles },
  { name: "Recommendations", columns: "recommendation_id, user_id, career_id, confidence", rows: 27188, icon: BrainCircuit },
  { name: "Saved_Careers", columns: "saved_id, user_id, career_id, saved_at", rows: 9405, icon: HeartPulse }
];
