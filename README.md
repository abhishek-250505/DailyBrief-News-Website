📰 DailyBrief – News Web Application

DailyBrief is a full-stack news web application that allows users to explore real-time news across different categories and countries. The goal of this project was to build a fast, clean, and user-friendly platform where users can easily stay updated with the latest news based on their interests.

The application uses a backend API proxy to securely fetch data from external news sources, ensuring that sensitive API keys are not exposed on the frontend.

🚀 Features
🌍 Category & Country-based News – Browse news by categories like sports, technology, business, etc.
🔍 Search Functionality – Debounced search to reduce unnecessary API calls
🔥 Trending Section – Highlights top news in the hero section
🔐 Authentication – Secure login/signup using Firebase Auth and JWT
⭐ Bookmark System – Save favorite articles for later
💬 Comments Section – Users can add and view comments on articles
🔊 Text-to-Speech – Listen to news articles as audio
⚡ Optimized API Usage – Reduced redundant calls using proxying and efficient state handling
🛠️ Tech Stack

Frontend:

React.js
Tailwind CSS
Zustand / Context API

Backend:

Node.js
Express.js
REST APIs

Database:

MongoDB (Mongoose)

Authentication:

Firebase Authentication
JSON Web Tokens (JWT)

Deployment:

Frontend: Vercel
Backend: Render
🌐 Live Demo

👉 https://daily-brief-news-website.vercel.app/