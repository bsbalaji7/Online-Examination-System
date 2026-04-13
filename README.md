# ONLINE EXAMINATION SYSTEM
Full-Stack Web Application (Spring Boot + React)
Overview

The Online Examination System is a full-stack web application designed to conduct and manage online exams efficiently. It provides a secure, scalable, and user-friendly platform for both administrators and students, featuring automated evaluation and real-time result processing.

Key Features
Role-Based Authentication (JWT)
Secure login system with separate access for Admin and Students.
Admin Panel
Create and manage exams
Add, update, and delete questions
Control exam duration and settings
Student Module
Attempt timed exams
Seamless exam interface
Auto-submit on timeout
Automatic Evaluation
Objective answers are evaluated instantly with results stored in the database.
Random Question Generation
Each student receives a randomized set of questions to ensure fairness.
Result Management & Analytics
Store results in MySQL
View performance insights and scores
Tech Stack
Frontend
React.js
CSS / UI Components
Backend
Spring Boot
REST APIs
Database
MySQL
Security
JSON Web Token (JWT) Authentication
System Modules
Admin Module
Manage exams and questions
Monitor student performance
Student Module
Take exams
View results
Installation & Setup
Clone the repository
git clone https://github.com/your-username/online-exam-system.git
Backend setup (Spring Boot)
cd backend
mvn spring-boot:run
Frontend setup (React)
cd frontend
npm install
npm run dev
Future Enhancements
Subjective answer evaluation using AI
Live proctoring system
Leaderboard and ranking system
Email/SMS notifications
Multi-language support
Conclusion

The Online Examination System provides a secure and efficient solution for conducting online exams with automated evaluation, role-based access, and performance analytics.
