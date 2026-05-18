import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import FanSE from './pages/FanSE';
import Store from './pages/Store';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Checkout from './pages/Checkout';
import FanWars from './pages/FanWars';
import Rentals from './pages/Rentals';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="fanse" element={<FanSE />} />
          <Route path="store" element={<Store />} />
          <Route path="fan-wars" element={<FanWars />} />
          <Route path="rentals" element={<Rentals />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
