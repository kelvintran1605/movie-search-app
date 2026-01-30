# 🎬 Movie Search App (Movix)

A modern movie discovery web app where users can explore trending films, search for movies, view detailed information, and save favorites to a personal watchlist.

Built with React, TypeScript, and the TMDB API.

---

## 🔗 Live Demo
👉 http://movie-search-app-six-opal.vercel.app

---

## 🖼️ Screenshots
  ### Home
  <img width="1912" height="979" alt="image" src="https://github.com/user-attachments/assets/0e068988-93f1-4191-98cc-f65e74dbf417" />
  
  ### Discover movies page
  <img width="1917" height="941" alt="image" src="https://github.com/user-attachments/assets/b2df00f5-24bf-498d-bca4-0b418b1f9ba1" />
  
  ### Sign in popup
  <img width="1281" height="935" alt="image" src="https://github.com/user-attachments/assets/1f82a1d5-5b74-4a6a-a524-88ec59b155cd" />

  ### Movie detail
  <img width="1878" height="952" alt="image" src="https://github.com/user-attachments/assets/9b54eff7-6d7f-4f53-982f-460126778b62" />

  ### Cast detail
  <img width="1903" height="942" alt="image" src="https://github.com/user-attachments/assets/5c114afc-2fbb-493b-af6c-be058bed6147" />

---

## ✨ Features

- 🔍 Real-time movie search
- 🎞 Browse trending, popular, and now playing movies
- 📄 Detailed movie pages with ratings, overview, and cast
- ❤️ Personal watchlist (saved per user)
- 🔐 Authentication with Supabase
- 🌙 Dark / Light mode
- ⚡ Loading skeletons, error states
- 📱 Fully responsive design

---

## 🛠 Tech Stack

**Frontend**
- React + TypeScript
- Vite
- Tailwind CSS
- React Router
- RTK Query
- Context API

**Backend / Services**
- TMDB API
- Supabase (Auth + Database)

---
## Environment Variables

To run this project, create a .env file in the root directory and add the following:

```bash
VITE_TMDB_KEY=your_tmdb_api_key_here
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_public_key
VITE_SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_SECRET=your_google_client_secret
```
---
##  Run Locally

Clone the project

```bash
1️⃣ Clone the project
git clone https://github.com/kelvintran1605/movie-search-app.git
cd movie-search-app

2️⃣ Install dependencies
npm install

3️⃣ Start the development server
npm run dev
```
The app will be running at:
👉 http://localhost:5173
