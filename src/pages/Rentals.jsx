import { Users, Star, ArrowRight } from 'lucide-react';
import { useStore } from '../store';

export default function Rentals() {
  const { spendCoins } = useStore();

  const mentors = [
    { id: 1, name: 'CricketNerd99', aura: 'Safe Analyst', accuracy: '82%', cost: 500, followers: 1205 },
    { id: 2, name: 'MumbaiIndiansFan', aura: 'Aggressive Predictor', accuracy: '65%', cost: 300, followers: 850 },
    { id: 3, name: 'ChaosKing', aura: 'Chaos Lover', accuracy: '40%', cost: 100, followers: 3200 }, // High risk, high followers
  ];

  const handleRent = (cost) => {
    if (spendCoins(cost)) {
      alert("Mentor rented! Their live predictions will now be highlighted in your Dashboard.");
    } else {
      alert("Not enough IPL Coins!");
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '32px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <Users color="var(--accent)" /> Fan Skill Rentals
      </h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>Subscribe to elite predictors. By renting a mentor, you can see their live logic and mirror their predictions during high-tension moments.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {mentors.map(mentor => (
          <div key={mentor.id} style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid var(--panel-border)', borderRadius: '12px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{mentor.name}</h3>
                <div className="aura-badge" style={{ fontSize: '0.7rem' }}>{mentor.aura}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--warning)', fontWeight: 'bold' }}>
                <Star size={16} fill="var(--warning)" /> {mentor.accuracy}
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
              <span>{mentor.followers} Followers</span>
              <span>Cost: 🪙 {mentor.cost} / match</span>
            </div>
            
            <button className="primary-btn" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }} onClick={() => handleRent(mentor.cost)}>
              Rent Mentor <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
