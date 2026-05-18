import { useState, useEffect } from 'react';
import { ShoppingBag, TrendingUp, LineChart } from 'lucide-react';
import { useStore } from '../store';

export default function FanSE() {
  const { coins, buyStock, sellStock, portfolio } = useStore();
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStocks = () => {
      fetch('http://localhost:3001/api/fanse/stocks')
        .then(res => res.json())
        .then(data => {
          if (data.success) setStocks(data.stocks);
        });
    };
    fetchStocks();
    const interval = setInterval(fetchStocks, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel" style={{ padding: '32px' }}>
      <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <TrendingUp color="var(--accent)" /> Fan Stock Exchange
      </h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Buy and sell player stocks using your IPL Coins. Prices update live based on match performance.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        <div>
          <h2 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><LineChart size={20} /> Live Market</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {stocks.map(stock => (
              <div key={stock.id} className="stock-item" style={{ padding: '16px' }}>
                <div className="stock-info">
                  <span className="stock-name" style={{ fontSize: '1.2rem' }}>{stock.name}</span>
                  <span className={`stock-price ${stock.isUp ? 'trend-up' : 'trend-down'}`}>
                    🪙 {stock.price} ({stock.trend})
                  </span>
                </div>
                <button className="primary-btn" style={{ width: 'auto', padding: '8px 24px' }} onClick={() => buyStock(stock)}>Buy</button>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '24px', borderRadius: '12px', border: '1px solid var(--panel-border)' }}>
          <h2 style={{ marginBottom: '16px' }}><ShoppingBag size={20} style={{ verticalAlign: 'middle', marginRight: '8px' }} /> Your Portfolio</h2>
          {portfolio.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>You don't own any stocks.</p> : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {portfolio.map((item, idx) => {
                const currentStock = stocks.find(s => s.id === item.id);
                const currentPrice = currentStock ? currentStock.price : item.buyPrice;
                const profit = currentPrice - item.buyPrice;
                return (
                  <div key={idx} className="stock-item">
                    <div className="stock-info">
                      <span className="stock-name">{item.name}</span>
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Bought at: 🪙 {item.buyPrice}</span>
                      <span className={profit >= 0 ? 'trend-up' : 'trend-down'}>Current: 🪙 {currentPrice} ({profit >= 0 ? '+' : ''}{profit.toFixed(2)})</span>
                    </div>
                    <button className="trade-btn" style={{ background: 'var(--danger)' }} onClick={() => sellStock(item.id, currentPrice)}>Sell</button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
