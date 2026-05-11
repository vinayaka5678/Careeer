CREATE DATABASE IF NOT EXISTS career_compass;
USE career_compass;

CREATE TABLE users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(160) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('student', 'admin') DEFAULT 'student',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE careers (
  career_id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(120) NOT NULL,
  domain VARCHAR(80) NOT NULL,
  description TEXT,
  salary_range VARCHAR(80),
  demand_level VARCHAR(50),
  future_scope TEXT
);

CREATE TABLE skills (
  skill_id INT PRIMARY KEY AUTO_INCREMENT,
  skill_name VARCHAR(100) NOT NULL,
  domain VARCHAR(80),
  difficulty ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'beginner'
);

CREATE TABLE career_skills (
  career_id INT,
  skill_id INT,
  importance_score INT DEFAULT 5,
  PRIMARY KEY (career_id, skill_id),
  FOREIGN KEY (career_id) REFERENCES careers(career_id),
  FOREIGN KEY (skill_id) REFERENCES skills(skill_id)
);

CREATE TABLE quiz_questions (
  question_id INT PRIMARY KEY AUTO_INCREMENT,
  category VARCHAR(80) NOT NULL,
  question_text TEXT NOT NULL,
  option_json JSON NOT NULL
);

CREATE TABLE quiz_results (
  result_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  career_id INT NOT NULL,
  score DECIMAL(5,2) NOT NULL,
  attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (career_id) REFERENCES careers(career_id)
);

CREATE TABLE recommendations (
  recommendation_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  career_id INT NOT NULL,
  confidence DECIMAL(5,2) NOT NULL,
  reason TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (career_id) REFERENCES careers(career_id)
);

CREATE TABLE saved_careers (
  saved_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  career_id INT NOT NULL,
  saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (career_id) REFERENCES careers(career_id)
);
