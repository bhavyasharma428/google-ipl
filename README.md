# About Event

This project is build on Google cloud event : BUILD WITH AI: Agentic Premier League (jaipur) on 17th May 2026 
It is a multi-city, high-energy developer challenge happening across India, often described as an in-person "vibe coding" event. Instead of a traditional, quiet hackathon, it combines the energy of a live sports watch party with fast-paced software development.

# Challenge 

Design a system that enhances how users experience live sporting events beyond passive viewing. The solution should create meaningful second-screen interactions during matches, enabling fans to engage with key moments, participate in real-time activities, and feel more connected to the game as it unfolds.

# Solution : FanVerse

FanVerse is a revolutionary "second-screen" live sports engagement platform designed to transform passive cricket viewership into an active, monetizable, and hyper-personalized experience. Instead of just watching a match, fans can predict ball-by-ball outcomes, trade player stocks, collect digital swag, and interact with an AI-driven commentator tailored to their specific personality.

## 🌟 Key Features

* **Real-Time Ball-by-Ball Predictions:** Users can predict the exact outcome of the next ball (Dot, 1, 2, 4, 6, Wicket, Wide, etc.). The frontend syncs with a custom Node.js backend that simulates live match pacing and automatically resolves predictions.
* **Fan Aura Profiling:** An integrated Google Gemini AI engine analyzes a user's prediction history to assign them a "Fan Aura" (e.g., "Aggressive Predictor", "Safe Analyst").
* **AI Dynamic Commentary:** Google Gemini generates highly energetic, personalized commentary for every single ball, reacting to the user's prediction and current match tension.
* **Fan Stock Exchange (FanSE):** A live simulated stock market where users can invest IPL Coins into player stocks. Prices dynamically fluctuate based on market trends.
* **Live Fan Wars:** Join factions (e.g., CSK Yellow Army, MI Paltan) and contribute your correct prediction points to a massive global leaderboard.
* **Fan Skill Rentals:** Rent elite predictors ("Mentors") to see their live logic and mirror their predictions during high-tension moments.
* **Swag Store & Economy:** Earn IPL Coins via correct predictions and spend them in the Swag Store on virtual/real-world collectibles.

## 🏗️ Architecture

The project is built on a modern, high-performance web stack:

* **Frontend:** React + Vite, styled with custom CSS (Glassmorphism, Neon accents).
* **State Management:** Zustand (for global cart, coin economy, and user portfolio tracking).
* **Routing:** React Router (Dashboard, FanSE, Swag Store, Checkout, Profile, Settings, Rentals, Fan Wars).
* **Backend:** Node.js + Express.js. Acts as a secure proxy to the Gemini AI API and handles live match simulations/scraping.
* **AI Engine:** Google Gemini (1.5 Flash) integration via the `@google/generative-ai` SDK.
* **Getting live data :** using https://www.cricbuzz.com/cricket-match/live-scores

## Website link

vercel : https://google-ipl-mu.vercel.app/

## 🌐 Deployment (Vercel)

Deployed the `server` directory to Render (for `GEMINI_API_KEY` ).

## note

There is a scraping timeout in cricbuzz the website may take time to load live scores



