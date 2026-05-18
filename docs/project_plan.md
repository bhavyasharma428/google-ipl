# FanVerse: The Ultimate Second-Screen Live Sports Experience

## Overview
FanVerse is a dynamic, interactive second-screen web application designed to transform passive sports viewing into an active, immersive experience. Built specifically for live sporting events (like the IPL), it offers real-time engagement, social competition, and AI-driven personalization.

## Core Features (MVP)

### 1. Real-Time Prediction Engine
*   **Ball-by-Ball Predictions:** Users predict the outcome of the next ball (e.g., dot, 1 run, 4, 6, wicket).
*   **Prediction Combos:** Chain predictions together for exponential points (e.g., Dot -> 1 -> Wicket).
*   **2D Stadium Swipe:** A visual 2D interface where users swipe to predict where the ball will be hit. Points are awarded based on proximity.

### 2. AI-Powered Personalization (Powered by Gemini API)
*   **Fan Aura System:** Gemini analyzes a user's prediction style (risky, safe, clutch) and assigns them a unique "Aura" or personality (e.g., "Aggressive Predictor", "Safe Analyst").
*   **AI Commentator:** Gemini generates real-time, personalized commentary tailored to the user's "Aura" and current match situation. (e.g., telling an aggressive fan to "GO BIG THIS BALL").
*   **Match Memories & Story Mode:** Gemini auto-generates a narrative of the user's season or match experience, creating a personalized "legacy" summary.

### 3. Dynamic Engagement Modes
*   **Hype Engine:** When tension rises (e.g., 18 runs needed off 6 balls), the app enters "HYPE MODE" featuring visual effects, double XP, and faster prediction timers.
*   **Chaos Mode:** Randomly activated periods with high-risk rewards, weird prediction prompts, and double points.

### 4. Economy & Progression
*   **IPL Coins & Fan Stock Exchange (FanSE):** Users earn coins through predictions and can invest them in player "stocks" whose value fluctuates based on live match events.
*   **Moment NFTs (Digital Badges):** Earn non-crypto collectible badges for being part of historic moments (e.g., "Witnessed Rinku's 5 Sixes").

## Technical Architecture

### Frontend (User Interface)
*   **Tech Stack:** React (via Vite) for robust state management.
*   **Styling:** Vanilla CSS, modern, vibrant aesthetics. Dark mode with neon accents (Glassmorphism, smooth gradients, micro-animations for predictions and score updates).
*   **Responsiveness:** Mobile-first approach since this is a second-screen companion app.

### Backend & Logic (Simulated for MVP)
*   **Match Data:** Simulated live cricket feed (mock data stream).
*   **AI Integration:** Direct integration with Google Gemini API for the *Fan Aura System* and *AI Commentator*.
*   **State Management:** React Context or Zustand.

## Implementation Roadmap

**Phase 1: Foundation & UI Setup**
*   Initialize project (Vite + React).
*   Design the premium dark-mode UI with smooth gradients and glassmorphism.
*   Build the core layout: Live Score Header, Prediction Arena, and Activity Feed.

**Phase 2: Core Gameplay Loop**
*   Implement ball-by-ball prediction logic and the 2D stadium swipe interface.
*   Create the scoring system and IPL Coin economy.

**Phase 3: AI Integration (Gemini)**
*   Integrate Gemini API.
*   Build the *Fan Aura System* to profile users.
*   Develop the *AI Commentator* to feed dynamic, personalized text based on the mock live feed.

**Phase 4: Polish & "Wow" Factor**
*   Add Hype/Chaos modes with CSS animations (screen shake, color pulses).
*   Implement the Fan Stock Exchange (FanSE) UI.
*   Final testing and responsive design adjustments.
