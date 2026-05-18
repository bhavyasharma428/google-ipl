import { useState, useEffect, useRef } from 'react';
import { Activity, Radio, Lock } from 'lucide-react';
import { useStore } from '../store';
import { generateCommentary, analyzeFanAura } from '../gemini';

const PREDICTION_OPTIONS = ['Dot', '1 Run', '2 Runs', '3 Runs', '4 Runs', '6 Runs', 'Wicket', 'Wide', 'No-Ball'];

export default function Dashboard() {
  const { addCoins, userAura, setUserAura, predictionHistory, addPrediction } = useStore();
  
  const [matchState, setMatchState] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [lockedPrediction, setLockedPrediction] = useState(null);
  const [lastResult, setLastResult] = useState(null);
  
  const [commentary, setCommentary] = useState('Waiting for your first prediction...');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const currentBallIdRef = useRef(0);

  useEffect(() => {
    const fetchMatchState = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/match/state');
        const data = await res.json();
        if (data.success) {
          const newState = data.state;
          setMatchState(newState);
          setTimeLeft(Math.floor(data.timeLeftMs / 1000));
          
          // Detect new ball
          if (newState.ballId > currentBallIdRef.current) {
            // A new ball just happened! Resolve prediction if one was locked
            if (currentBallIdRef.current !== 0 && lockedPrediction) {
              resolvePrediction(lockedPrediction, newState.previousOutcome);
            }
            
            currentBallIdRef.current = newState.ballId;
            setLockedPrediction(null); // Reset for the next ball
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchMatchState();
    const interval = setInterval(fetchMatchState, 1000);
    return () => clearInterval(interval);
  }, [lockedPrediction]); // Dependency needed because setInterval closure needs fresh lockedPrediction

  const resolvePrediction = async (prediction, actualResult) => {
    const isCorrect = prediction === actualResult;
    const pointsWon = isCorrect ? 250 : -50;
    
    addCoins(pointsWon);
    setLastResult({ won: isCorrect, points: pointsWon, actual: actualResult });
    addPrediction({ prediction, actual: actualResult, won: isCorrect });
    
    setIsGenerating(true);
    let currentAura = userAura;
    // We can't access predictionHistory easily here due to closure, but useStore.getState() could be used.
    // Assuming userAura is relatively stable, we update it async
    if (predictionHistory.length % 3 === 0 && predictionHistory.length > 0) {
      currentAura = await analyzeFanAura(predictionHistory);
      setUserAura(currentAura);
    }
    
    const aiCommentary = await generateCommentary(matchState, currentAura, prediction);
    setCommentary(aiCommentary);
    setIsGenerating(false);
    
    setTimeout(() => setLastResult(null), 5000);
  };

  const handlePredict = (opt) => {
    if (lockedPrediction) return; // Cannot change once locked
    setLockedPrediction(opt);
  };

  return (
    <div className="dashboard-grid">
      <section className="matches-panel glass-panel">
        <h2><Radio size={18} color="var(--danger)" /> Live Match Hub</h2>
        {!matchState ? <p>Loading match...</p> : (
          <div className="match-card active">
            <div className="match-title">IPL 2026 Final</div>
            <div className="match-teams"><span>RCB</span><span>MI</span></div>
            <div className="match-scores" style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: '12px 0' }}>
              <span>{matchState.score}/{matchState.wickets}</span>
            </div>
            <div className="match-status-text">Over: {matchState.over}.{matchState.ballInOver} | RR: {matchState.requiredRate}</div>
            <div style={{ marginTop: '8px', color: matchState.tension === 'High' ? 'var(--danger)' : 'var(--warning)' }}>
              Tension: {matchState.tension}
            </div>
          </div>
        )}
      </section>

      <section className="center-column">
        <div className="prediction-arena glass-panel">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
            <div style={{color: 'var(--accent)', fontWeight: 800}}>PREDICT NEXT BALL</div>
            <div style={{background: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: 20}}>
              ⏱️ {timeLeft}s
            </div>
          </div>
          
          <div className="live-action-header" style={{ fontSize: '2rem' }}>
            {matchState ? `${matchState.batsman} vs ${matchState.bowler}` : '...'}
          </div>
          
          <div className="prediction-grid">
            {PREDICTION_OPTIONS.map(opt => (
              <button 
                key={opt} 
                className={`predict-btn ${lockedPrediction === opt ? 'selected' : ''}`} 
                onClick={() => handlePredict(opt)}
                disabled={lockedPrediction !== null}
                style={{ opacity: lockedPrediction && lockedPrediction !== opt ? 0.3 : 1 }}
              >
                {lockedPrediction === opt ? <><Lock size={14} style={{marginRight: 4, verticalAlign: 'middle'}}/> {opt}</> : opt}
              </button>
            ))}
          </div>
        </div>

        <div className="ai-commentary glass-panel">
          <Activity className="ai-icon" size={24} />
          <div>
            <div className="aura-badge">Aura: {userAura}</div>
            <p className="commentary-text">{isGenerating ? "Gemini analyzing..." : `"${commentary}"`}</p>
          </div>
        </div>
      </section>

      {lastResult && (
        <div className="toast" style={{ backgroundColor: lastResult.won ? 'var(--success)' : 'var(--danger)' }}>
          {lastResult.won ? `Spot on! +${lastResult.points} Coins` : `Wrong! It was ${lastResult.actual}. ${lastResult.points} Coins`}
        </div>
      )}
    </div>
  );
}
