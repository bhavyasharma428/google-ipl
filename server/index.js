require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// --- GEMINI AI ENDPOINTS ---
app.post('/api/ai/commentary', async (req, res) => {
  try {
    const { matchState, userAura, userPrediction } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `
      You are a highly energetic, personalized AI cricket commentator for a second-screen sports app.
      Match State:
      - Over: ${matchState.over}
      - Score: ${matchState.score}/${matchState.wickets}
      - Batsman: ${matchState.batsman}
      - Tension Level: ${matchState.tension}
      
      User's 'Fan Aura': ${userAura}
      User's prediction for the NEXT ball: ${userPrediction || 'None yet'}
      
      Generate ONE short, punchy line of commentary (max 2 sentences) directly addressing the user ("you"). 
      Make it sound like an adrenaline-fueled broadcast tailored specifically to their Fan Aura.
    `;
    
    const result = await model.generateContent(prompt);
    const text = await result.response.text();
    res.json({ success: true, text });
  } catch (error) {
    console.error("Gemini Commentary Error:", error);
    res.status(500).json({ success: false, text: "The tension is too high! Keep predicting!" });
  }
});

app.post('/api/ai/aura', async (req, res) => {
  try {
    const { predictionHistory } = req.body;
    if (!predictionHistory || predictionHistory.length < 3) return res.json({ success: true, aura: "Rookie Watcher" });
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const historyString = predictionHistory.map(p => `Predicted: ${p.prediction}, Result: ${p.actual}, Won: ${p.won}`).join(' | ');
    
    const prompt = `
      Analyze this cricket fan's prediction history and assign them a 2-3 word "Fan Aura" title.
      Examples: "Aggressive Predictor", "Safe Analyst", "Chaos Lover", "Clutch God".
      History: ${historyString}
      Return ONLY the title string, nothing else.
    `;
    
    const result = await model.generateContent(prompt);
    const text = await result.response.text();
    res.json({ success: true, aura: text.trim() });
  } catch (error) {
    console.error("Gemini Aura Error:", error);
    res.status(500).json({ success: false, aura: "Mysterious Fan" });
  }
});

// --- LIVE MATCH TRACKING (SCRAPING + SIMULATION FALLBACK) ---
let currentMatchState = {
  ballId: 1,
  over: 18,
  ballInOver: 0,
  score: 172,
  wickets: 5,
  batsman: 'V. Kohli',
  bowler: 'J. Bumrah',
  requiredRate: '11.5',
  tension: 'High',
  previousOutcome: null,
  nextBallTime: Date.now() + 15000,
  isLiveScraped: false
};

const OUTCOMES = ['Dot', '1 Run', '2 Runs', '3 Runs', '4 Runs', '6 Runs', 'Wicket', 'Wide', 'No-Ball'];

const pollLiveScore = async () => {
  try {
    // Attempt to scrape real live match data from Cricbuzz
    // Note: In production, we would hit a specific match URL and parse the exact ball commentary.
    const { data } = await axios.get('https://www.cricbuzz.com/cricket-match/live-scores', { timeout: 3000 });
    const $ = cheerio.load(data);
    const liveMatch = $('.cb-mtch-lst.cb-tms-itm').first();
    
    if (liveMatch.length > 0) {
      // Very basic extraction of live score (if a match is actually ongoing)
      const scoreStr = liveMatch.find('.cb-hmscg-bat-txt').text(); // e.g. "140-3 (18.2)"
      
      // If we successfully parsed a live score, we could deduce the last ball outcome here.
      // For the prototype, if we hit Cricbuzz, we'll mark it as scraped but still generate 
      // an outcome to keep the game loop moving smoothly if the API is slow.
      currentMatchState.isLiveScraped = true;
      // In a real app, logic goes here: `if (newScore > oldScore) return "1 Run"` etc.
    } else {
      currentMatchState.isLiveScraped = false;
    }
  } catch (err) {
    // Fallback to simulation if scraping fails/blocks
    currentMatchState.isLiveScraped = false;
  }

  // --- Process the next ball outcome ---
  const actualResult = OUTCOMES[Math.floor(Math.random() * OUTCOMES.length)];
  
  currentMatchState.previousOutcome = actualResult;
  currentMatchState.ballId += 1;
  currentMatchState.nextBallTime = Date.now() + 15000;
  currentMatchState.tension = Math.random() > 0.5 ? 'High' : 'Medium';
  
  if (!['Wide', 'No-Ball'].includes(actualResult)) {
    currentMatchState.ballInOver += 1;
    if (currentMatchState.ballInOver >= 6) {
      currentMatchState.over += 1;
      currentMatchState.ballInOver = 0;
    }
  }
  
  if (actualResult === 'Wicket') currentMatchState.wickets += 1;
  else if (actualResult.includes('Run')) currentMatchState.score += parseInt(actualResult);
  else if (['Wide', 'No-Ball'].includes(actualResult)) currentMatchState.score += 1;
};

// Poll every 15 seconds to sync with live match pace
setInterval(pollLiveScore, 15000);

app.get('/api/match/state', (req, res) => {
  res.json({
    success: true,
    state: currentMatchState,
    timeLeftMs: Math.max(0, currentMatchState.nextBallTime - Date.now())
  });
});

// --- EXISTING ENDPOINTS ---
let playerStocks = [
  { id: 'p1', name: 'V. Kohli', price: 145.50, trend: '+2.4%', isUp: true },
  { id: 'p2', name: 'J. Bumrah', price: 180.20, trend: '+5.1%', isUp: true },
  { id: 'p3', name: 'M. Dhoni', price: 120.00, trend: '-1.2%', isUp: false }
];

app.get('/api/fanse/stocks', (req, res) => {
  playerStocks = playerStocks.map(stock => {
    const change = (Math.random() * 4 - 2); 
    const newPrice = Math.max(10, stock.price + change);
    const percentChange = (change / stock.price) * 100;
    return {
      ...stock,
      price: parseFloat(newPrice.toFixed(2)),
      trend: `${percentChange > 0 ? '+' : ''}${percentChange.toFixed(1)}%`,
      isUp: change > 0
    };
  });
  res.json({ success: true, stocks: playerStocks });
});

const storeItems = [
  { id: 's1', name: 'RCB Official Jersey', price: 5000, image: '👕', category: 'Apparel' },
  { id: 's2', name: 'CSK Vintage Cap', price: 1500, image: '🧢', category: 'Accessories' }
];

app.get('/api/store/items', (req, res) => {
  res.json({ success: true, items: storeItems });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
