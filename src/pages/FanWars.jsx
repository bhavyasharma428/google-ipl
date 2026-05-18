import { Flag, Shield, Trophy } from 'lucide-react';
import { useStore } from '../store';

export default function FanWars() {
  const { coins } = useStore();

  return (
    <div className="glass-panel" style={{ padding: '32px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <Flag color="var(--accent)" /> Live Fan Wars
      </h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>Join a faction. Every correct prediction you make adds points to your team's global standing. Win the war to take over the app's theme and earn massive IPL Coin drops.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        <div style={{ background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(0, 0, 255, 0.1))', padding: '32px', borderRadius: '16px', border: '1px solid var(--warning)' }}>
          <Shield size={48} color="var(--warning)" style={{ marginBottom: '16px' }} />
          <h2>CSK Yellow Army</h2>
          <div style={{ fontSize: '2.5rem', fontWeight: '900', margin: '16px 0' }}>45.2M <span style={{fontSize: '1rem', color: 'var(--text-muted)'}}>Pts</span></div>
          <button className="primary-btn" style={{ background: 'var(--warning)', color: 'black' }}>Join Faction</button>
        </div>

        <div style={{ background: 'linear-gradient(135deg, rgba(0, 75, 141, 0.1), rgba(212, 175, 55, 0.1))', padding: '32px', borderRadius: '16px', border: '1px solid var(--accent-secondary)' }}>
          <Shield size={48} color="var(--accent-secondary)" style={{ marginBottom: '16px' }} />
          <h2>MI Paltan</h2>
          <div style={{ fontSize: '2.5rem', fontWeight: '900', margin: '16px 0' }}>44.8M <span style={{fontSize: '1rem', color: 'var(--text-muted)'}}>Pts</span></div>
          <button className="primary-btn" style={{ background: 'var(--accent-secondary)', color: 'black' }}>Join Faction</button>
        </div>
      </div>

      <div style={{ marginTop: '40px', padding: '24px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Trophy size={20} color="var(--warning)" /> Global Leaderboard
        </h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', borderBottom: '1px solid var(--panel-border)' }}>
          <span>1. RCB 12th Man Army</span>
          <span style={{ fontWeight: 'bold' }}>52.1M Pts</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', borderBottom: '1px solid var(--panel-border)' }}>
          <span>2. CSK Yellow Army</span>
          <span style={{ fontWeight: 'bold' }}>45.2M Pts</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px' }}>
          <span>3. MI Paltan</span>
          <span style={{ fontWeight: 'bold' }}>44.8M Pts</span>
        </div>
      </div>
    </div>
  );
}
