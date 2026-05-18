import { Link, Outlet, useLocation } from 'react-router-dom';
import { Zap, Coins, Home, Store, TrendingUp, User, Settings, ShoppingCart } from 'lucide-react';
import { useStore } from '../store';
import '../App.css';

export default function Layout() {
  const coins = useStore(state => state.coins);
  const cart = useStore(state => state.cart);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Dashboard', icon: <Home size={20} /> },
    { path: '/fanse', label: 'FanSE', icon: <TrendingUp size={20} /> },
    { path: '/fan-wars', label: 'Fan Wars', icon: <User size={20} /> },
    { path: '/rentals', label: 'Rentals', icon: <User size={20} /> },
    { path: '/store', label: 'Swag Store', icon: <Store size={20} /> },
    { path: '/profile', label: 'Profile', icon: <User size={20} /> },
    { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="app-container">
      <header className="header glass-panel">
        <div className="logo">
          <Zap color="var(--accent)" fill="var(--accent)" size={28} />
          <h1>FanVerse</h1>
        </div>
        
        <nav className="desktop-nav">
          {navLinks.map(link => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="user-stats">
          <div className="coin-badge">
            <Coins size={18} />
            {coins.toLocaleString()} Coins
          </div>
          <Link to="/checkout" className="cart-badge">
            <ShoppingCart size={20} />
            {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
          </Link>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
