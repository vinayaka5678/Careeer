export const quizQuestions = [
  {
    id: 1,
    category: "Interests",
    question: "Do you enjoy coding and solving logical problems?",
    options: [
      { label: "Yes, I love building software", career: "Software Engineer", score: 5 },
      { label: "Somewhat, if it solves real problems", career: "Data Scientist", score: 3 },
      { label: "Not really", career: "UI/UX Designer", score: 1 }
    ]
  },
  {
    id: 2,
    category: "Skills",
    question: "Which activity feels most natural to you?",
    options: [
      { label: "Analyzing data and patterns", career: "Data Scientist", score: 5 },
      { label: "Designing screens and experiences", career: "UI/UX Designer", score: 5 },
      { label: "Promoting products creatively", career: "Digital Marketer", score: 4 }
    ]
  },
  {
    id: 3,
    category: "Personality",
    question: "Would you rather work with systems, people, or campaigns?",
    options: [
      { label: "Secure systems and networks", career: "Cybersecurity Analyst", score: 5 },
      { label: "Patients and healthcare decisions", career: "Doctor", score: 5 },
      { label: "Audience growth and brand stories", career: "Digital Marketer", score: 5 }
    ]
  },
  {
    id: 4,
    category: "Academic strengths",
    question: "Which subject do you enjoy most?",
    options: [
      { label: "Computer Science", career: "Software Engineer", score: 5 },
      { label: "Biology", career: "Doctor", score: 5 },
      { label: "Mathematics and Statistics", career: "Data Scientist", score: 5 }
    ]
  },
  {
    id: 5,
    category: "Interests",
    question: "Do you prefer creativity or analytics?",
    options: [
      { label: "Creativity and visual thinking", career: "UI/UX Designer", score: 5 },
      { label: "Analytics and measurable results", career: "Data Scientist", score: 5 },
      { label: "Both, with business impact", career: "Digital Marketer", score: 4 }
    ]
  }
];

export const recommendationRules = [
  "Coding interest + Computer Science strength -> Software Engineer",
  "Statistics + pattern analysis -> Data Scientist",
  "Creativity + user empathy -> UI/UX Designer",
  "Biology + patient care -> Doctor",
  "Networks + risk mindset -> Cybersecurity Analyst",
  "Business + campaigns -> Digital Marketer"
];
