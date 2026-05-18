import { User, Activity, Trophy } from 'lucide-react';
import { useStore } from '../store';

export default function Profile() {
  const { userAura, predictionHistory, portfolio } = useStore();
  const correctPredictions = predictionHistory.filter(p => p.won).length;
  const accuracy = predictionHistory.length > 0 ? ((correctPredictions / predictionHistory.length) * 100).toFixed(1) : 0;

  return (
    <div className="glass-panel" style={{ padding: '32px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid var(--panel-border)' }}>
        <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), var(--accent-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <User size={48} color="white" />
        </div>
        <div>
          <h1 style={{ marginBottom: '8px' }}>Fan Psyche Profile</h1>
          <div className="aura-badge" style={{ fontSize: '1rem', padding: '8px 16px' }}>Aura: {userAura}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '40px' }}>
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
          <Trophy size={32} color="var(--warning)" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>Prediction Accuracy</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{accuracy}%</div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '8px' }}>{correctPredictions} / {predictionHistory.length} correct</div>
        </div>

        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
          <Activity size={32} color="var(--accent-secondary)" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>FanSE Portfolio Size</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{portfolio.length}</div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '8px' }}>Active Player Stocks</div>
        </div>
      </div>

      <h2>Recent Predictions</h2>
      <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {predictionHistory.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>No predictions made yet.</p> : null}
        {predictionHistory.slice().reverse().map((pred, idx) => (
          <div key={idx} style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', borderLeft: `4px solid ${pred.won ? 'var(--success)' : 'var(--danger)'}` }}>
            <span style={{ fontWeight: 'bold' }}>Predicted: {pred.prediction}</span>
            <span style={{ color: 'var(--text-muted)', marginLeft: '12px' }}>Actual: {pred.actual}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
