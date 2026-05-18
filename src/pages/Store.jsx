import { useState, useEffect } from 'react';
import { Store as StoreIcon, ShoppingCart } from 'lucide-react';
import { useStore } from '../store';

export default function Store() {
  const { addToCart } = useStore();
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/store/items')
      .then(res => res.json())
      .then(data => {
        if (data.success) setItems(data.items);
      });
  }, []);

  return (
    <div className="glass-panel" style={{ padding: '32px' }}>
      <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <StoreIcon color="var(--accent)" /> IPL Swag Store
      </h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Spend your hard-earned IPL Coins on exclusive merchandise and digital power-ups!</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '24px' }}>
        {items.map(item => (
          <div key={item.id} style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid var(--panel-border)', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>{item.image}</div>
            <div style={{ color: 'var(--accent-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>{item.category}</div>
            <h3 style={{ marginBottom: '12px' }}>{item.name}</h3>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--warning)', marginBottom: '20px' }}>🪙 {item.price.toLocaleString()} Coins</div>
            <button className="primary-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} onClick={() => addToCart(item)}>
              <ShoppingCart size={18} /> Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
