import { Settings as SettingsIcon } from 'lucide-react';
import { useState } from 'react';

export default function Settings() {
  const [saved, setSaved] = useState(false);

  const saveSettings = () => {
    // In a real app, save to localStorage or backend
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="glass-panel" style={{ padding: '32px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
        <SettingsIcon color="var(--accent)" /> Settings
      </h1>

      <div style={{ marginBottom: '32px' }}>
        <label style={{ display: 'block', marginBottom: '16px', color: 'var(--text-muted)' }}>Notification Preferences</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <input type="checkbox" id="hype" defaultChecked />
          <label htmlFor="hype">Hype Mode Alerts</label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <input type="checkbox" id="market" defaultChecked />
          <label htmlFor="market">FanSE Market Volatility Alerts</label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <input type="checkbox" id="ai" defaultChecked />
          <label htmlFor="ai">AI Commentary Sound Effects</label>
        </div>
      </div>

      <button className="primary-btn" onClick={saveSettings}>Save Settings</button>
      
      {saved && <p style={{ color: 'var(--success)', marginTop: '16px', textAlign: 'center' }}>Settings saved successfully!</p>}
    </div>
  );
}
