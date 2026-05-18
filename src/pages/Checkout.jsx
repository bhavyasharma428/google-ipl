import { ShoppingCart, CheckCircle } from 'lucide-react';
import { useStore } from '../store';
import { useState } from 'react';

export default function Checkout() {
  const { cart, getCartTotal, spendCoins, clearCart } = useStore();
  const [success, setSuccess] = useState(false);

  const handleCheckout = () => {
    const total = getCartTotal();
    if (total === 0) return alert('Cart is empty!');
    
    if (spendCoins(total)) {
      setSuccess(true);
      clearCart();
    } else {
      alert('Not enough IPL Coins!');
    }
  };

  if (success) {
    return (
      <div className="glass-panel" style={{ padding: '60px 32px', textAlign: 'center' }}>
        <CheckCircle color="var(--success)" size={64} style={{ margin: '0 auto 24px' }} />
        <h1>Order Successful!</h1>
        <p style={{ color: 'var(--text-muted)' }}>Your IPL Swag will be shipped shortly.</p>
        <button className="primary-btn" style={{ width: 'auto', marginTop: '24px' }} onClick={() => setSuccess(false)}>Back to Store</button>
      </div>
    );
  }

  return (
    <div className="glass-panel" style={{ padding: '32px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <ShoppingCart color="var(--accent)" /> Checkout
      </h1>

      {cart.length === 0 ? (
        <p style={{ color: 'var(--text-muted)' }}>Your cart is empty.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '2rem' }}>{item.image}</span>
                <div>
                  <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Qty: {item.qty}</div>
                </div>
              </div>
              <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>🪙 {(item.price * item.qty).toLocaleString()}</div>
            </div>
          ))}

          <div style={{ borderTop: '1px solid var(--panel-border)', marginTop: '16px', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>Total</h2>
            <h2 style={{ color: 'var(--warning)' }}>🪙 {getCartTotal().toLocaleString()} Coins</h2>
          </div>

          <button className="primary-btn" style={{ marginTop: '24px' }} onClick={handleCheckout}>Pay with IPL Coins</button>
        </div>
      )}
    </div>
  );
}
