# FanVerse: AI-Powered Second-Screen Sports Companion

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

## 🚀 Running Locally

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/bhavyasharma428/google-ipl.git
   cd google-ipl
   \`\`\`

2. **Setup the Backend:**
   \`\`\`bash
   cd server
   npm install
   \`\`\`
   Create a \`.env\` file in the \`server\` directory and add your Google Gemini API Key:
   \`\`\`env
   GEMINI_API_KEY=your_api_key_here
   \`\`\`
   Start the backend:
   \`\`\`bash
   npm start
   # or node index.js
   \`\`\`

3. **Setup the Frontend:**
   Open a new terminal and navigate to the project root:
   \`\`\`bash
   npm install
   npm run dev
   \`\`\`
   Access the app at \`http://localhost:5173/\`.

## 🌐 Deployment (Vercel)
To deploy this project:
1. Deploy the `server` directory to Render or Heroku (ensuring you add the `GEMINI_API_KEY` to the environment variables).
2. Update the frontend fetch calls (in `src/store.js`, `src/App.jsx`, `src/pages/*.jsx`) from `http://localhost:3001` to your deployed backend URL.
3. Deploy the root frontend directory to Vercel.

---
*Built as a business prototype for next-generation sports engagement.*
