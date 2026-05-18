export const generateCommentary = async (matchState, userAura, userPrediction) => {
  try {
    const res = await fetch('http://localhost:3001/api/ai/commentary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ matchState, userAura, userPrediction })
    });
    const data = await res.json();
    return data.text;
  } catch (error) {
    console.error("Gemini API Error (via backend):", error);
    return "The tension is too high! Keep predicting!";
  }
};

export const analyzeFanAura = async (predictionHistory) => {
  if (predictionHistory.length < 3) return "Rookie Watcher";
  try {
    const res = await fetch('http://localhost:3001/api/ai/aura', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ predictionHistory })
    });
    const data = await res.json();
    return data.aura;
  } catch (error) {
    console.error("Gemini API Error (via backend):", error);
    return "Mysterious Fan";
  }
};
